import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { notifyTaskCompletion } from '@/lib/notifications';

interface TrackerResult {
  member: string;
  github_username: string;
  tasks_awarded: string[];
  badges_awarded: string[];
  errors: string[];
}

export async function POST() {
  try {
    const supabase = await createClient();

    // 1. Verify the caller is already authenticated — use their EXISTING session.
    //    We MUST NOT call signInWithPassword here because the server client shares
    //    session cookies with the browser. Calling signIn would overwrite the user's
    //    session, and signOut would destroy it entirely — logging them out.
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be signed in to trigger GitHub sync.' },
        { status: 401 }
      );
    }

    // 2. Verify the caller is the Team Lead (only they have RLS write access to member_tasks/member_badges)
    const { data: callerProfile, error: profileError } = await supabase
      .from('members')
      .select('id, slug')
      .eq('auth_user_id', user.id)
      .single();

    if (profileError || !callerProfile || callerProfile.slug !== 'ahmed-azam') {
      return NextResponse.json(
        { error: 'Forbidden: Only the Team Lead can trigger GitHub event sync.' },
        { status: 403 }
      );
    }

    const teamLeadMemberId = callerProfile.id;

    // 3. Fetch all members with GitHub usernames configured
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('id, name, slug, github_username, xp, level');

    if (membersError || !members) {
      return NextResponse.json(
        { error: `Failed to fetch members: ${membersError?.message}` },
        { status: 500 }
      );
    }

    const results: TrackerResult[] = [];

    // 4. Track achievements for each member
    for (const member of members) {
      if (!member.github_username) {
        continue;
      }

      const trackerRes: TrackerResult = {
        member: member.name,
        github_username: member.github_username,
        tasks_awarded: [],
        badges_awarded: [],
        errors: [],
      };

      try {
        // Fetch public events from GitHub API
        const githubUrl = `https://api.github.com/users/${member.github_username}/events/public`;
        const ghResponse = await fetch(githubUrl, {
          headers: {
            'User-Agent': 'Devesters-Gamification-System-Agent/1.0',
            'Accept': 'application/vnd.github.v3+json',
          },
          next: { revalidate: 300 }, // Cache events for 5 minutes
        });

        if (!ghResponse.ok) {
          if (ghResponse.status === 403 || ghResponse.status === 429) {
            trackerRes.errors.push('GitHub API Rate Limit exceeded. Skipping automated checks.');
          } else {
            trackerRes.errors.push(`GitHub API returned status ${ghResponse.status}`);
          }
          results.push(trackerRes);
          continue;
        }

        const events = await ghResponse.json();
        if (!Array.isArray(events)) {
          trackerRes.errors.push('Invalid response from GitHub API events endpoint');
          results.push(trackerRes);
          continue;
        }

        // Fetch already completed tasks for this member to avoid duplicate insert errors
        const { data: completedTasks } = await supabase
          .from('member_tasks')
          .select('task_id')
          .eq('member_id', member.id);

        const completedTaskIds = new Set(completedTasks?.map(t => t.task_id) || []);

        // Define checks based on public events
        let hasMergedPR = false;
        let hasReviewedPR = false;
        const commitDates: string[] = [];

        for (const event of events) {
          // Check for PullRequestEvent (closed & merged)
          if (event.type === 'PullRequestEvent') {
            const pr = event.payload?.pull_request;
            if (pr && event.payload.action === 'closed' && pr.merged) {
              hasMergedPR = true;
            }
          }

          // Check for PullRequestReviewEvent (approved review)
          if (event.type === 'PullRequestReviewEvent') {
            if (event.payload?.review?.state === 'approved') {
              hasReviewedPR = true;
            }
          }

          // Gather PushEvent commit dates for streak analysis
          if (event.type === 'PushEvent' && event.created_at) {
            const dateStr = event.created_at.split('T')[0];
            if (!commitDates.includes(dateStr)) {
              commitDates.push(dateStr);
            }
          }
        }

        // Evaluate Task: Merged First Pull Request ('first-pull-request')
        if (hasMergedPR && !completedTaskIds.has('first-pull-request')) {
          const { error: taskErr } = await supabase
            .from('member_tasks')
            .insert({
              member_id: member.id,
              task_id: 'first-pull-request',
              assigned_by: teamLeadMemberId,
              is_completed: true
            });

          if (!taskErr) {
            trackerRes.tasks_awarded.push('first-pull-request');
            // Auto award badge: Git Guru
            const { error: badgeErr } = await supabase
              .from('member_badges')
              .insert({
                member_id: member.id,
                badge_id: 'git-guru',
              });
            if (!badgeErr) {
              trackerRes.badges_awarded.push('git-guru');
            }
            await notifyTaskCompletion(supabase, member.id, 'first-pull-request');
          } else {
            trackerRes.errors.push(`Failed to award first-pull-request: ${taskErr.message}`);
          }
        }

        // Evaluate Task: Review Teammate PR ('review-pr')
        if (hasReviewedPR && !completedTaskIds.has('review-pr')) {
          const { error: taskErr } = await supabase
            .from('member_tasks')
            .insert({
              member_id: member.id,
              task_id: 'review-pr',
              assigned_by: teamLeadMemberId,
              is_completed: true
            });

          if (!taskErr) {
            trackerRes.tasks_awarded.push('review-pr');
            await notifyTaskCompletion(supabase, member.id, 'review-pr');
          } else {
            trackerRes.errors.push(`Failed to award review-pr: ${taskErr.message}`);
          }
        }

        // Evaluate Task: Maintain Commit Streak ('commit-streak')
        // We look for at least 3 active days of commits in the public event logs (standard API proxy check)
        const activeCommitDaysCount = commitDates.length;
        if (activeCommitDaysCount >= 3 && !completedTaskIds.has('commit-streak')) {
          const { error: taskErr } = await supabase
            .from('member_tasks')
            .insert({
              member_id: member.id,
              task_id: 'commit-streak',
              assigned_by: teamLeadMemberId,
              is_completed: true
            });

          if (!taskErr) {
            trackerRes.tasks_awarded.push('commit-streak');
            // Auto award badge: Coding Machine
            const { error: badgeErr } = await supabase
              .from('member_badges')
              .insert({
                member_id: member.id,
                badge_id: 'coding-machine',
              });
            if (!badgeErr) {
              trackerRes.badges_awarded.push('coding-machine');
            }
            await notifyTaskCompletion(supabase, member.id, 'commit-streak');
          } else {
            trackerRes.errors.push(`Failed to award commit-streak: ${taskErr.message}`);
          }
        }

      } catch (err: any) {
        trackerRes.errors.push(err.message || 'Unknown error occurred checking GitHub events');
      }

      results.push(trackerRes);
    }

    // No signOut! We preserve the caller's existing session.
    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('Error in github auto-tracker route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

