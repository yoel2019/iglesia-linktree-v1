import { notFound } from 'next/navigation';
import PublicPage from '@/components/PublicPage';
import { supabaseBrowser } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = supabaseBrowser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('published', true)
    .limit(1)
    .maybeSingle();

  if (!profile) notFound();

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('active', true)
    .order('sort_order');

  return (
    <PublicPage
      profile={profile}
      links={links ?? []}
      origin="https://iglesia-linktree-v1.vercel.app"
    />
  );
}
