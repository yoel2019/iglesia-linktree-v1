import { notFound } from 'next/navigation';
import PublicPage from '@/components/PublicPage';
import { supabaseBrowser } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function SlugPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const supabase = supabaseBrowser();
  const { data: profile } = await supabase.from('profiles').select('*').eq('slug', slug).eq('published', true).maybeSingle();
  if (!profile) notFound();
  const { data: links } = await supabase.from('links').select('*').eq('profile_id', profile.id).eq('active', true).order('sort_order');
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return <PublicPage profile={profile} links={links ?? []} origin={origin} />;
}
