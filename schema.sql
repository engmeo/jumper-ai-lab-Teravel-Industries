-- Jumper AI Lab: run this whole script in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  display_name text not null default 'Thành viên',
  role text not null default 'member' check (role in ('admin','member')),
  group_id text check (group_id in ('A','B','C','D','E')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  group_id text not null check (group_id in ('A','B','C','D','E')),
  assignee_id uuid references public.profiles(id) on delete set null,
  due_date date,
  priority text not null default 'Trung bình' check (priority in ('Cao','Trung bình','Thấp')),
  status text not null default 'Chưa bắt đầu' check (status in ('Chưa bắt đầu','Đang làm','Chờ review','Hoàn thành')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name, role, active)
  values (new.id, coalesce(new.email,''), coalesce(new.raw_user_meta_data->>'display_name','Thành viên'), 'member', true)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.active = true);
$$;

create or replace function public.my_group_id() returns text language sql stable security definer set search_path = public as $$
  select p.group_id from public.profiles p where p.id = auth.uid() and p.active = true limit 1;
$$;

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;

drop policy if exists "profile read self or admin" on public.profiles;
create policy "profile read self group or admin" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin() or (group_id is not null and group_id = public.my_group_id()));
drop policy if exists "profile admin update" on public.profiles;
create policy "profile admin update" on public.profiles for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "tasks read assigned scope" on public.tasks;
create policy "tasks read assigned scope" on public.tasks for select to authenticated using (
  public.is_admin() or exists(select 1 from public.profiles p where p.id = auth.uid() and p.active = true and (p.group_id = tasks.group_id or tasks.assignee_id = auth.uid()))
);
drop policy if exists "admin insert tasks" on public.tasks;
create policy "admin insert tasks" on public.tasks for insert to authenticated with check (public.is_admin() and created_by = auth.uid());
drop policy if exists "admin update tasks" on public.tasks;
create policy "admin update tasks" on public.tasks for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin delete tasks" on public.tasks;
create policy "admin delete tasks" on public.tasks for delete to authenticated using (public.is_admin());

-- Starter tasks for five teams
insert into public.tasks (title, description, group_id, priority, status)
select x.title, x.description, x.group_id, 'Trung bình', 'Chưa bắt đầu'
from (values
('Làm chủ Jumper và pipeline huấn luyện','Hướng dẫn cài đặt, task chạy mẫu, checkpoint','A'),
('Thu thập và xử lý video môi trường','Dataset có cấu trúc, công cụ trích xuất, báo cáo chất lượng','B'),
('Phát triển sandbox','Bộ sinh môi trường, bộ đánh giá tự động','C'),
('Phát triển và kiểm thử kỹ năng','Skill Library, kết quả benchmark, báo cáo lỗi','D'),
('Chuẩn bị triển khai','Định dạng đóng gói, kiểm tra tương thích, checklist an toàn','E')
) as x(title,description,group_id)
where not exists (select 1 from public.tasks);
