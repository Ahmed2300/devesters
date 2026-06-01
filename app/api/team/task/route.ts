import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { notifyTaskCompletion, notifyTaskAssignment } from '@/lib/notifications';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Get authenticated user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized: Session missing' }, { status: 401 });
    }

    // 2. Verify if the caller is the Team Lead (Ahmed Azam)
    const { data: callerProfile, error: profileError } = await supabase
      .from('members')
      .select('id, slug')
      .eq('auth_user_id', user.id)
      .single();

    if (profileError || !callerProfile || callerProfile.slug !== 'ahmed-azam') {
      return NextResponse.json(
        { error: 'Forbidden: Only the Team Lead is authorized to modify tasks' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (!action || !['complete', 'uncomplete', 'create', 'delete'].includes(action)) {
      return NextResponse.json({ error: 'Invalid or missing action parameter' }, { status: 400 });
    }

    // ============================================
    // ACTION: CREATE CUSTOM TASK
    // ============================================
    if (action === 'create') {
      const {
        titleEn,
        titleAr,
        descriptionEn,
        descriptionAr,
        category,
        xpValue,
        badgeRewardId,
        assignTo, // 'none' | 'all' | member_uuid
        howToAchieveEn,
        howToAchieveAr,
      } = body;

      if (!titleEn || !titleAr || !descriptionEn || !descriptionAr || !category || !xpValue || !assignTo) {
        return NextResponse.json({ error: 'Missing required fields for task creation' }, { status: 400 });
      }

      // Generate a unique custom task ID
      const taskId = `custom-${Math.random().toString(36).substring(2, 11)}`;

      // 1. Insert into public.tasks
      const { error: taskInsertError } = await supabase
        .from('tasks')
        .insert({
          id: taskId,
          title_en: titleEn,
          title_ar: titleAr,
          description_en: descriptionEn,
          description_ar: descriptionAr,
          category,
          xp_value: Number(xpValue),
          badge_reward_id: badgeRewardId || null,
          how_to_achieve_en: howToAchieveEn || null,
          how_to_achieve_ar: howToAchieveAr || null,
        });

      if (taskInsertError) {
        return NextResponse.json({ error: `Failed to create task in DB: ${taskInsertError.message}` }, { status: 500 });
      }

      // 2. Handle Assignments (custom tasks are assigned as PENDING, i.e. is_completed = false)
      if (assignTo === 'all') {
        const { data: allMembers } = await supabase.from('members').select('id');
        if (allMembers && allMembers.length > 0) {
          // Assign as pending to all members
          const memberTasksToInsert = allMembers.map(m => ({
            member_id: m.id,
            task_id: taskId,
            assigned_by: callerProfile.id,
            is_completed: false // Assigner sets it as assigned/pending!
          }));
          await supabase.from('member_tasks').insert(memberTasksToInsert);

          // Trigger assignment email notifications in the background
          for (const m of allMembers) {
            notifyTaskAssignment(supabase, m.id, taskId).catch(err =>
              console.error(`Failed to notify member ${m.id} of custom task assignment:`, err)
            );
          }
        }
      } else if (assignTo !== 'none') {
        // Assign as pending to a specific member
        await supabase.from('member_tasks').insert({
          member_id: assignTo,
          task_id: taskId,
          assigned_by: callerProfile.id,
          is_completed: false // Assigner sets it as assigned/pending!
        });

        // Trigger assignment notification
        notifyTaskAssignment(supabase, assignTo, taskId).catch(err =>
          console.error(`Failed to notify member ${assignTo} of custom task assignment:`, err)
        );
      }

      return NextResponse.json({ success: true, taskId });
    }

    // ============================================
    // ACTION: DELETE TASK
    // ============================================
    if (action === 'delete') {
      const { taskId } = body;
      if (!taskId) {
        return NextResponse.json({ error: 'Missing taskId' }, { status: 400 });
      }

      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (deleteError) {
        return NextResponse.json({ error: `Failed to delete task: ${deleteError.message}` }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    // ============================================
    // ACTIONS: COMPLETE / UNCOMPLETE TASKS
    // ============================================
    const { memberId, taskId } = body;
    if (!memberId || !taskId) {
      return NextResponse.json({ error: 'Missing memberId or taskId' }, { status: 400 });
    }

    // Fetch the task details to find if there is an associated badge
    const { data: taskData, error: taskFetchError } = await supabase
      .from('tasks')
      .select('badge_reward_id')
      .eq('id', taskId)
      .single();

    if (taskFetchError || !taskData) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (action === 'complete') {
      // Check if assignment record already exists
      const { data: existingRow } = await supabase
        .from('member_tasks')
        .select('task_id, is_completed')
        .eq('member_id', memberId)
        .eq('task_id', taskId)
        .maybeSingle();

      if (existingRow) {
        // If it exists (e.g. was assigned as pending), update it to true
        const { error: taskUpdateError } = await supabase
          .from('member_tasks')
          .update({ is_completed: true })
          .eq('member_id', memberId)
          .eq('task_id', taskId);

        if (taskUpdateError) {
          return NextResponse.json({ error: `Failed to complete task: ${taskUpdateError.message}` }, { status: 500 });
        }
      } else {
        // If it does not exist (e.g. a global standard task), insert it as completed
        const { error: taskInsertError } = await supabase
          .from('member_tasks')
          .insert({
            member_id: memberId,
            task_id: taskId,
            assigned_by: callerProfile.id,
            is_completed: true
          });

        if (taskInsertError && taskInsertError.code !== '23505') { // Ignore duplicate keys
          return NextResponse.json({ error: `Failed to complete task: ${taskInsertError.message}` }, { status: 500 });
        }
      }

      // If task has a badge reward, award it
      if (taskData.badge_reward_id) {
        const { error: badgeInsertError } = await supabase
          .from('member_badges')
          .insert({
            member_id: memberId,
            badge_id: taskData.badge_reward_id
          });
        
        if (badgeInsertError && badgeInsertError.code !== '23505') {
          console.warn('Failed to auto-award badge:', badgeInsertError.message);
        }
      }

      // Send automated email notification via Google Script
      await notifyTaskCompletion(supabase, memberId, taskId);
    } else {
      // Uncomplete/Remove the task
      if (taskId.startsWith('custom-')) {
        // For custom tasks, keep the row but set is_completed to false (revert to assigned/pending)
        const { error: taskUpdateError } = await supabase
          .from('member_tasks')
          .update({ is_completed: false })
          .eq('member_id', memberId)
          .eq('task_id', taskId);

        if (taskUpdateError) {
          return NextResponse.json({ error: `Failed to revert task to pending: ${taskUpdateError.message}` }, { status: 500 });
        }
      } else {
        // For standard tasks, delete the row entirely
        const { error: taskDeleteError } = await supabase
          .from('member_tasks')
          .delete()
          .eq('member_id', memberId)
          .eq('task_id', taskId);

        if (taskDeleteError) {
          return NextResponse.json({ error: `Failed to remove task: ${taskDeleteError.message}` }, { status: 500 });
        }
      }

      // If task had a badge reward, remove it
      if (taskData.badge_reward_id) {
        const { error: badgeDeleteError } = await supabase
          .from('member_badges')
          .delete()
          .eq('member_id', memberId)
          .eq('badge_id', taskData.badge_reward_id);
        
        if (badgeDeleteError) {
          console.warn('Failed to auto-revoke badge:', badgeDeleteError.message);
        }
      }
    }

    // Fetch the updated member XP & level (recalculated automatically by database triggers!)
    const { data: updatedMember, error: fetchMemberError } = await supabase
      .from('members')
      .select('xp, level')
      .eq('id', memberId)
      .single();

    if (fetchMemberError || !updatedMember) {
      return NextResponse.json({ error: 'Recalculation occurred but profile fetch failed' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      xp: updatedMember.xp,
      level: updatedMember.level
    });

  } catch (error: any) {
    console.error('Error in team task API:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
