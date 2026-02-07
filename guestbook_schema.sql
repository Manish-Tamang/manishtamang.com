-- SAFE MIGRATION: Run this in your Supabase SQL Editor to add reply/like/react support
-- This will NOT delete any existing data.

-- 1. Add the missing columns
ALTER TABLE public.guestbook_entries 
ADD COLUMN IF NOT EXISTS parent_id text REFERENCES public.guestbook_entries(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS likes text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS reactions text[] DEFAULT '{}';

-- 2. Add an index for performance when fetching replies
CREATE INDEX IF NOT EXISTS guestbook_entries_parent_id_idx ON public.guestbook_entries (parent_id);

-- 3. Update existing rows to have empty arrays instead of nulls for likes/reactions
UPDATE public.guestbook_entries SET likes = '{}' WHERE likes IS NULL;
UPDATE public.guestbook_entries SET reactions = '{}' WHERE reactions IS NULL;

