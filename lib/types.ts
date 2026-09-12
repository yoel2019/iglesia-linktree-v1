export type Profile = {
  id: string; slug: string; name: string; handle: string | null; bio: string | null; logo_url: string | null; accent_color: string; background_style: string; featured_title: string | null; featured_url: string | null; featured_image_url: string | null; footer_text: string | null; published: boolean;
};
export type LinkItem = { id: string; profile_id: string; title: string; subtitle: string | null; url: string; icon: string; sort_order: number; active: boolean; };
