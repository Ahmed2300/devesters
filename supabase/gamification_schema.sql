-- 1. Create Tables

-- Team Members table
CREATE TABLE IF NOT EXISTS public.members (
    id uuid primary key default gen_random_uuid(),
    auth_user_id uuid unique references auth.users(id) on delete set null,
    slug text not null unique,
    name text not null,
    role_en text not null,
    role_ar text not null,
    bio_en text,
    bio_ar text,
    skills jsonb default '[]'::jsonb not null,
    photo_url text,
    github_username text,
    linkedin_url text,
    github_url text,
    instagram_url text,
    email text,
    portfolio_url text,
    xp int default 0 not null,
    level int default 1 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Badges definition table
CREATE TABLE IF NOT EXISTS public.badges (
    id text primary key,
    name_en text not null,
    name_ar text not null,
    description_en text not null,
    description_ar text not null,
    icon_url text not null,
    xp_reward int default 0 not null,
    trigger_type text not null, -- 'task', 'admin_verify', 'github_api'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Member Badges junction table
CREATE TABLE IF NOT EXISTS public.member_badges (
    member_id uuid references public.members(id) on delete cascade not null,
    badge_id text references public.badges(id) on delete cascade not null,
    earned_at timestamp with time zone default timezone('utc'::text, now()) not null,
    PRIMARY KEY (member_id, badge_id)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id text primary key,
    title_en text not null,
    title_ar text not null,
    description_en text not null,
    description_ar text not null,
    category text not null, -- 'profile_completeness', 'project_portfolio', 'team_contributions'
    xp_value int not null,
    badge_reward_id text references public.badges(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Member Tasks completion table
CREATE TABLE IF NOT EXISTS public.member_tasks (
    member_id uuid references public.members(id) on delete cascade not null,
    task_id text references public.tasks(id) on delete cascade not null,
    assigned_by uuid references public.members(id) on delete set null,
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    PRIMARY KEY (member_id, task_id)
);

-- 2. Row Level Security Configuration

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_tasks ENABLE ROW LEVEL SECURITY;

-- 3. Security RLS Policies

-- Drop existing policies first to support idempotent re-runs
DROP POLICY IF EXISTS "Allow public read on members" ON public.members;
DROP POLICY IF EXISTS "Allow public read on badges" ON public.badges;
DROP POLICY IF EXISTS "Allow public read on member_badges" ON public.member_badges;
DROP POLICY IF EXISTS "Allow public read on tasks" ON public.tasks;
DROP POLICY IF EXISTS "Allow public read on member_tasks" ON public.member_tasks;
DROP POLICY IF EXISTS "Allow members update self" ON public.members;
DROP POLICY IF EXISTS "Allow team lead to assign/update tasks" ON public.member_tasks;
DROP POLICY IF EXISTS "Allow team lead to award badges manually" ON public.member_badges;
DROP POLICY IF EXISTS "Admin full access on members" ON public.members;
DROP POLICY IF EXISTS "Admin full access on badges" ON public.badges;
DROP POLICY IF EXISTS "Admin full access on tasks" ON public.tasks;

-- SELECT (Read) is allowed for everyone on all gamification tables
CREATE POLICY "Allow public read on members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow public read on badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Allow public read on member_badges" ON public.member_badges FOR SELECT USING (true);
CREATE POLICY "Allow public read on tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Allow public read on member_tasks" ON public.member_tasks FOR SELECT USING (true);

-- UPDATE on members table is allowed for users modifying their own profile metadata
CREATE POLICY "Allow members update self" ON public.members FOR UPDATE 
USING (auth.uid() = auth_user_id) 
WITH CHECK (auth.uid() = auth_user_id);

-- Restrict task assignments (writing to member_tasks / member_badges) only to the Team Lead (Ahmed Azam)
-- We check if the authenticated user's ID maps to the slug 'ahmed-azam' in public.members
CREATE OR REPLACE FUNCTION public.is_team_lead()
RETURNS boolean SECURITY DEFINER AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.members 
        WHERE auth_user_id = auth.uid() AND slug = 'ahmed-azam'
    );
END;
$$ LANGUAGE plpgsql;

CREATE POLICY "Allow team lead to assign/update tasks" ON public.member_tasks FOR ALL
USING (public.is_team_lead())
WITH CHECK (public.is_team_lead());

CREATE POLICY "Allow team lead to award badges manually" ON public.member_badges FOR ALL
USING (public.is_team_lead())
WITH CHECK (public.is_team_lead());

-- Admin full access rules
CREATE POLICY "Admin full access on members" ON public.members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on badges" ON public.badges FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on tasks" ON public.tasks FOR ALL USING (auth.role() = 'authenticated');

-- 3.5 Automated Recalculation Triggers for XP and Level
CREATE OR REPLACE FUNCTION public.fn_recalculate_member_xp_and_level()
RETURNS trigger SECURITY DEFINER AS $$
DECLARE
    target_member_id uuid;
    total_xp int := 0;
    tasks_xp int := 0;
    badges_xp int := 0;
    new_level int := 1;
BEGIN
    -- Determine which member's XP we are recalculating
    IF TG_OP = 'DELETE' THEN
        target_member_id := OLD.member_id;
    ELSE
        target_member_id := NEW.member_id;
    END IF;

    IF target_member_id IS NULL THEN
        RETURN NEW;
    END IF;

    -- Recalculate tasks XP
    SELECT COALESCE(SUM(t.xp_value), 0)
    INTO tasks_xp
    FROM public.member_tasks mt
    JOIN public.tasks t ON mt.task_id = t.id
    WHERE mt.member_id = target_member_id;

    -- Recalculate badges XP
    SELECT COALESCE(SUM(b.xp_reward), 0)
    INTO badges_xp
    FROM public.member_badges mb
    JOIN public.badges b ON mb.badge_id = b.id
    WHERE mb.member_id = target_member_id;

    total_xp := tasks_xp + badges_xp;

    -- Determine level based on XP
    IF total_xp >= 2000 THEN
        new_level := 5;
    ELSIF total_xp >= 1000 THEN
        new_level := 4;
    ELSIF total_xp >= 500 THEN
        new_level := 3;
    ELSIF total_xp >= 200 THEN
        new_level := 2;
    ELSE
        new_level := 1;
    END IF;

    -- Update member profile
    UPDATE public.members
    SET xp = total_xp, level = new_level
    WHERE id = target_member_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Bind triggers to member_tasks and member_badges
DROP TRIGGER IF EXISTS trgr_recalculate_xp_on_task ON public.member_tasks;
CREATE TRIGGER trgr_recalculate_xp_on_task
AFTER INSERT OR UPDATE OR DELETE ON public.member_tasks
FOR EACH ROW EXECUTE FUNCTION public.fn_recalculate_member_xp_and_level();

DROP TRIGGER IF EXISTS trgr_recalculate_xp_on_badge ON public.member_badges;
CREATE TRIGGER trgr_recalculate_xp_on_badge
AFTER INSERT OR UPDATE OR DELETE ON public.member_badges
FOR EACH ROW EXECUTE FUNCTION public.fn_recalculate_member_xp_and_level();

-- Query Performance Indexes
CREATE INDEX IF NOT EXISTS idx_members_auth_user_id ON public.members(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_member_tasks_member_id ON public.member_tasks(member_id);
CREATE INDEX IF NOT EXISTS idx_member_badges_member_id ON public.member_badges(member_id);

-- 4. Seeding Auth Users (Supabase Auth Schema)
-- We check if users exist first to avoid duplicate errors

DO $$
DECLARE
    team_lead_id uuid := 'a0000000-0000-0000-0000-000000000001';
    manar_id uuid := 'b0000000-0000-0000-0000-000000000002';
    mohamed_id uuid := 'c0000000-0000-0000-0000-000000000003';
    farghly_id uuid := 'd0000000-0000-0000-0000-000000000004';
    essam_id uuid := 'e0000000-0000-0000-0000-000000000005';
BEGIN
    -- Ahmed Azam (Team Lead)
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = team_lead_id) THEN
        INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, reauthentication_token, email_change, phone_change, phone_change_token, email_change_token_current)
        VALUES (team_lead_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'ahmed.azam@devesters.com', extensions.crypt('DevestersLead2026!', extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now(), '', '', '', '', '', '', '', '');
        INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
        VALUES (gen_random_uuid(), team_lead_id, json_build_object('sub', team_lead_id, 'email', 'ahmed.azam@devesters.com', 'email_verified', true, 'phone_verified', false)::jsonb, 'email', team_lead_id::text, now(), now(), now());
    END IF;

    -- Manar Elnahty
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = manar_id) THEN
        INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, reauthentication_token, email_change, phone_change, phone_change_token, email_change_token_current)
        VALUES (manar_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'manar.elnahty@devesters.com', extensions.crypt('ManarDev2026!', extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now(), '', '', '', '', '', '', '', '');
        INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
        VALUES (gen_random_uuid(), manar_id, json_build_object('sub', manar_id, 'email', 'manar.elnahty@devesters.com', 'email_verified', true, 'phone_verified', false)::jsonb, 'email', manar_id::text, now(), now(), now());
    END IF;

    -- Mohamed Badr
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = mohamed_id) THEN
        INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, reauthentication_token, email_change, phone_change, phone_change_token, email_change_token_current)
        VALUES (mohamed_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'mohamed.badr@devesters.com', extensions.crypt('MohamedDev2026!', extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now(), '', '', '', '', '', '', '', '');
        INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
        VALUES (gen_random_uuid(), mohamed_id, json_build_object('sub', mohamed_id, 'email', 'mohamed.badr@devesters.com', 'email_verified', true, 'phone_verified', false)::jsonb, 'email', mohamed_id::text, now(), now(), now());
    END IF;

    -- Ahmed Farghly
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = farghly_id) THEN
        INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, reauthentication_token, email_change, phone_change, phone_change_token, email_change_token_current)
        VALUES (farghly_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'ahmed.farghly@devesters.com', extensions.crypt('FarghlyDev2026!', extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now(), '', '', '', '', '', '', '', '');
        INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
        VALUES (gen_random_uuid(), farghly_id, json_build_object('sub', farghly_id, 'email', 'ahmed.farghly@devesters.com', 'email_verified', true, 'phone_verified', false)::jsonb, 'email', farghly_id::text, now(), now(), now());
    END IF;

    -- Ahmed Essam
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = essam_id) THEN
        INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, reauthentication_token, email_change, phone_change, phone_change_token, email_change_token_current)
        VALUES (essam_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'ahmed.essam@devesters.com', extensions.crypt('EssamDev2026!', extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now(), '', '', '', '', '', '', '', '');
        INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
        VALUES (gen_random_uuid(), essam_id, json_build_object('sub', essam_id, 'email', 'ahmed.essam@devesters.com', 'email_verified', true, 'phone_verified', false)::jsonb, 'email', essam_id::text, now(), now(), now());
    END IF;
END $$;

-- 5. Seeding Member Profiles
-- Truncating ensures no UUID constraint mismatch due to conflicting slugs
TRUNCATE public.members CASCADE;

INSERT INTO public.members (id, auth_user_id, slug, name, role_en, role_ar, bio_en, bio_ar, skills, photo_url, github_username, linkedin_url, github_url, instagram_url, email, portfolio_url, xp, level)
VALUES 
('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'ahmed-azam', 'Ahmed Azam', 'Team Lead | Lead Mobile & Web Engineer', 'قائد الفريق | مهندس جوال وويب أول', 'Ahmed is the mastermind behind the architectural vision at Devesters. As the Team Lead and a senior Frontend/Mobile engineer, he seamlessly blends technical strategy with flawless execution.', 'أحمد هو العقل المدبر وراء الرؤية المعمارية في Devesters. بصفته قائد الفريق ومهندس واجهات جوال وويب أول، فإنه يدمج الاستراتيجية التقنية مع التنفيذ الخالي من العيوب.', '["Flutter", "Dart", "React", "Next.js", "TypeScript", "Tailwind", "AI Tools"]', 'https://i.ibb.co/bMpK8X8Y/Ahmed.png', 'Ahmed2300', 'https://www.linkedin.com/in/ahmed-azam-320a98200', 'https://github.com/Ahmed2300', 'https://www.instagram.com/ahmed_a_azam/', 'ahmed750@std.mans.edu.eg', 'https://ahmedazamportfolio.netlify.app/', 0, 1),

('b0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'manar-elnahty', 'Manar Elnahty', 'Frontend & Mobile Engineer', 'مهندسة واجهات أمامية وجوال', 'Manar is a passionate and creative software engineer dedicated to crafting seamless digital experiences across multiple platforms.', 'منار مهندسة برمجيات شغوفة ومبدعة مكرسة لإنشاء تجارب رقمية سلسة عبر منصات متعددة.', '["Flutter", "Dart", "React", "Next.js", "TypeScript", "Tailwind", "AI Tools"]', 'https://i.ibb.co/spP6fmwN/manar.jpg', 'manarelnahty', 'https://www.linkedin.com/in/manar-e-6b21bb230', 'https://github.com/manarelnahty', 'https://www.instagram.com/manar_elnahty?igsh=M2VxdXRnaDRtMTRm&utm_source=qr', 'manarelnahty@gmail.com', NULL, 0, 1),

('c0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'mohamed-badr', 'Mohamed Badr', 'Mobile Engineer & UI/UX Specialist', 'مهندس تطبيقات جوال وأخصائي UI/UX', 'Mohamed is the code artist of the team, intensely focused on mobile application architecture and user experience.', 'محمد هو فنان الكود في الفريق، يركز بشكل مكثف على معمارية تطبيقات الجوال وتجربة المستخدم.', '["Flutter", "Dart", "React", "JavaScript", "TypeScript", "UI/UX", "AI Tools"]', 'https://iili.io/KWL2vG1.jpg', 'mohmdadl', 'https://www.linkedin.com/in/mhmdbadr4flutter/', 'https://github.com/mohmdadl', 'https://www.instagram.com/mohmd_adl/', 'mohamedbadr4iti@gmail.com', NULL, 0, 1),

('d0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000004', 'ahmed-farghly', 'Ahmed Farghly', 'Backend Architect & Systems Engineer', 'مهندس أنظمة وخبير هيكلية باك إند', 'Ahmed Farghly is the driving force behind Devesters'' robust infrastructure, specializing in Django, Laravel, and server admin.', 'أحمد فرغلي هو القوة الدافعة وراء البنية التحتية القوية لـ Devesters، وهو متخصص في Django و Laravel وإدارة الخوادم.', '["Laravel", "Django", "Backend", "API", "Golang", "Server Administrator", "DevOps", "AI Tools"]', 'https://avatars.githubusercontent.com/u/95584009?v=4', 'Ahmedfargh', 'https://www.linkedin.com/in/ahmed-farghly-879b09257', 'https://github.com/Ahmedfargh', NULL, 'ahmedgits2001@gmail.com', NULL, 0, 1),

('e0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000005', 'ahmed-essam', 'Ahmed Essam', 'Backend & Database Engineer', 'مهندس باك إند وقواعد بيانات', 'Ahmed Essam is the engineer of logic, security, and performance behind the scenes, specializing in database architecture and Laravel.', 'أحمد عصام هو مهندس المنطق والأمان والأداء وراء الكواليس، وهو متخصص في معمارية قواعد البيانات و Laravel.', '["PHP", "Laravel", "Backend Development", "ASP.NET", "AI Tools"]', 'https://i.ibb.co/Hf5bYZns/subol-red.png', 'AhmedEssam88', 'https://www.linkedin.com/in/ahmed-essam-465208232', 'https://github.com/AhmedEssam88', NULL, 'ahmedessam1.8.14@gmail.com', NULL, 0, 1)
ON CONFLICT (slug) DO UPDATE SET
id = EXCLUDED.id,
auth_user_id = EXCLUDED.auth_user_id,
name = EXCLUDED.name,
role_en = EXCLUDED.role_en,
role_ar = EXCLUDED.role_ar,
bio_en = EXCLUDED.bio_en,
bio_ar = EXCLUDED.bio_ar,
skills = EXCLUDED.skills,
photo_url = EXCLUDED.photo_url,
github_username = EXCLUDED.github_username,
linkedin_url = EXCLUDED.linkedin_url,
github_url = EXCLUDED.github_url,
instagram_url = EXCLUDED.instagram_url,
email = EXCLUDED.email,
portfolio_url = EXCLUDED.portfolio_url;

-- 6. Seeding Badges

INSERT INTO public.badges (id, name_en, name_ar, description_en, description_ar, icon_url, xp_reward, trigger_type)
VALUES
('first-impression', 'First Impression', 'الانطباع الأول', 'Uploaded a profile photo', 'قام برفع صورة الملف الشخصي', 'FiUser', 50, 'task'),
('profile-champion', 'Profile Champion', 'بطل الملف الشخصي', 'Completed all optional fields in profile', 'أكمل جميع الحقول الاختيارية في الملف الشخصي', 'FiCheckCircle', 100, 'task'),
('shipper', 'Shipper', 'مطور منجز', 'Featured as an engineer on a published project', 'تم إدراجه كمهندس في مشروع منشور', 'FiPackage', 100, 'task'),
('veteran-shipper', 'Veteran Shipper', 'خبير الإنجاز', 'Featured as an engineer on 3+ projects', 'تم إدراجه كمهندس في 3 مشاريع أو أكثر', 'FiAward', 200, 'task'),
('git-guru', 'Git Guru', 'عبقري جيت', 'Merged first Pull Request to main repository', 'دمج أول طلب سحب (PR) إلى المستودع الرئيسي', 'FiGitBranch', 100, 'github_api'),
('coding-machine', 'Coding Machine', 'آلة البرمجة', 'Completed 7-day commit streak on GitHub', 'أكمل سلسلة التزام (Commit) لمدة 7 أيام متتالية على GitHub', 'FiActivity', 250, 'github_api'),
('linter-ninja', 'Linter Ninja', 'نينجا التنسيق', 'Merged a PR with zero lint warnings', 'دمج طلب سحب (PR) بدون أي تحذيرات برمجية', 'FiCpu', 150, 'github_api'),
('client-favorite', 'Client Favorite', 'مفضل العملاء', 'Referenced positively by a client testimonial', 'تمت الإشارة إليه بشكل إيجابي في توصية عميل', 'FiHeart', 150, 'admin_verify'),
('launch-pad', 'Launch Pad', 'منصة الإطلاق', 'Successfully deployed a project to production server', 'قام بنشر مشروع بنجاح على خادم الإنتاج', 'FiTrendingUp', 150, 'admin_verify'),
('pr-inspector', 'PR Inspector', 'مفتش طلبات السحب', 'Reviewed and approved 5+ pull requests', 'راجع واعتمد 5 طلبات سحب أو أكثر', 'FiEye', 150, 'github_api'),
('ai-pioneer', 'AI Pioneer', 'رائد الذكاء الاصطناعي', 'Integrated an AI feature into a production product', 'دمج ميزة ذكاء اصطناعي في منتج فعلي', 'FiCpu', 200, 'task'),
('db-architect', 'DB Architect', 'مهندس قواعد البيانات', 'Designed database schemas and executed migrations', 'صمم هياكل قواعد البيانات ونفذ عمليات النقل', 'FiDatabase', 200, 'task'),
('devesters-elite', 'Devesters Elite', 'نخبة Devesters', 'Achieved developer Level 5 status', 'حصل على مستوى المطور 5', 'FiStar', 300, 'task')
ON CONFLICT (id) DO UPDATE SET
name_en = EXCLUDED.name_en,
name_ar = EXCLUDED.name_ar,
description_en = EXCLUDED.description_en,
description_ar = EXCLUDED.description_ar,
icon_url = EXCLUDED.icon_url,
xp_reward = EXCLUDED.xp_reward,
trigger_type = EXCLUDED.trigger_type;

-- 7. Seeding Tasks

INSERT INTO public.tasks (id, title_en, title_ar, description_en, description_ar, category, xp_value, badge_reward_id)
VALUES
('complete-avatar', 'Upload Profile Picture', 'رفع صورة الملف الشخصي', 'Upload a professional profile photo for the about page.', 'قم برفع صورة ملف شخصي احترافية لصفحة التعريف.', 'profile_completeness', 50, 'first-impression'),
('complete-bio', 'Write Arabic & English Bios', 'كتابة السيرة باللغتين', 'Provide full biographies in both English and Arabic translations.', 'اكتب السيرة الذاتية كاملة بالترجمة الإنجليزية والعربية.', 'profile_completeness', 50, NULL),
('complete-skills', 'List Core Skills', 'تحديد المهارات الأساسية', 'Add at least 5 technical tags to your developer skills inventory.', 'أضف ما لا يقل عن 5 علامات تقنية إلى قائمة مهارات المطور الخاصة بك.', 'profile_completeness', 50, NULL),
('link-linkedin', 'Link LinkedIn Account', 'ربط حساب لينكد إن', 'Connect your LinkedIn professional profile url.', 'اربط عنوان URL لملفك الشخصي المهني على LinkedIn.', 'profile_completeness', 30, NULL),
('link-github', 'Link GitHub Account', 'ربط حساب جيت هاب', 'Connect your active GitHub profile username.', 'اربط اسم المستخدم النشط لملفك الشخصي على GitHub.', 'profile_completeness', 30, NULL),
('add-project', 'Deliver Featured Project', 'تسليم مشروع مميز', 'Be listed as a project engineer on a featured portfolio project.', 'تم إدراجك كمهندس مشروع في مشروع مميز.', 'project_portfolio', 100, 'shipper'),
('add-multiple-projects', 'Deliver 3+ Projects', 'تسليم ٣ مشاريع أو أكثر', 'Be listed as a project engineer on at least 3 portfolio projects.', 'تم إدراجك كمهندس مشروع في 3 مشاريع على الأقل.', 'project_portfolio', 200, 'veteran-shipper'),
('add-custom-icon', 'Configure Project customIcon', 'تخصيص أيقونة المشروع', 'Setup and link a custom brand icon for a portfolio project.', 'إعداد وربط أيقونة مخصصة لمشروع.', 'project_portfolio', 70, NULL),
('add-testimonial-reference', 'Earn Client Commendation', 'الحصول على ثناء العميل', 'Be explicitly referenced in a client testimonial description.', 'تمت الإشارة إليك صراحة في توصية العميل.', 'project_portfolio', 150, 'client-favorite'),
('write-case-study', 'Write Project Case Study', 'كتابة دراسة حالة', 'Write a detailed engineering case study for a delivered project.', 'اكتب دراسة حالة هندسية مفصلة لمشروع تم تسليمه.', 'project_portfolio', 100, NULL),
('first-pull-request', 'Merge First Pull Request', 'دمج أول طلب سحب', 'Create and merge your first pull request into the main codebase.', 'قم بإنشاء ودمج أول طلب سحب لك في الكود الأساسي.', 'team_contributions', 100, 'git-guru'),
('commit-streak', 'Maintain 7-Day Commit Streak', 'الالتزام البرمجي لأسبوع', 'Commit code to repositories daily for a continuous 7 days.', 'الالتزام البرمجي في المستودعات يومياً لمدة 7 أيام متتالية.', 'team_contributions', 250, 'coding-machine'),
('review-pr', 'Review Teammate PR', 'مراجعة طلبات سحب الزملاء', 'Perform code review and approve a teammates pull request.', 'قم بمراجعة الكود والموافقة على طلب السحب الخاص بزملائك.', 'team_contributions', 80, 'pr-inspector'),
('deploy-app', 'Deploy Project to Production', 'نشر المشروع على خوادم الإنتاج', 'Deploy a web or mobile application stack to live servers.', 'انشر تطبيق ويب أو جوال على خوادم التشغيل الفعلي.', 'team_contributions', 150, 'launch-pad')
ON CONFLICT (id) DO UPDATE SET
title_en = EXCLUDED.title_en,
title_ar = EXCLUDED.title_ar,
description_en = EXCLUDED.description_en,
description_ar = EXCLUDED.description_ar,
category = EXCLUDED.category,
xp_value = EXCLUDED.xp_value,
badge_reward_id = EXCLUDED.badge_reward_id;

-- 8. Seeding Initial Member Completed Tasks is skipped per request (making all members start with 0 XP)
-- member_tasks and member_badges seeding calls are omitted.

