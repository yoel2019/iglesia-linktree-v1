import PublicPage from '@/components/PublicPage';
import type { LinkItem, Profile } from '@/lib/types';

const demoProfile: Profile = {
  id: 'demo',
  slug: 'iglesia',
  name: 'Nuestra Iglesia',
  handle: '@nuestraiglesia',
  bio: 'Un lugar para conectar con Dios, crecer en comunidad y compartir el mensaje de esperanza.',
  logo_url: null,
  accent_color: '#d8b36a',
  background_style: 'dark',
  featured_title: 'Próximo servicio y eventos',
  featured_url: 'https://example.com',
  featured_image_url: null,
  footer_text: 'Gracias por visitarnos • Nuestra Iglesia',
  published: true,
};

const demoLinks: LinkItem[] = [
  { id: '1', profile_id: 'demo', title: 'Visítanos en nuestro sitio web', subtitle: 'Conoce más sobre nuestra iglesia', url: 'https://example.com', icon: 'website', sort_order: 0, active: true },
  { id: '2', profile_id: 'demo', title: 'Síguenos en Instagram', subtitle: 'Fotos, noticias y contenido', url: 'https://instagram.com', icon: 'instagram', sort_order: 1, active: true },
  { id: '3', profile_id: 'demo', title: 'Mira nuestros servicios', subtitle: 'Predicaciones y transmisiones', url: 'https://youtube.com', icon: 'youtube', sort_order: 2, active: true },
  { id: '4', profile_id: 'demo', title: 'Contáctanos por WhatsApp', subtitle: 'Estamos aquí para ayudarte', url: 'https://wa.me/', icon: 'whatsapp', sort_order: 3, active: true },
  { id: '5', profile_id: 'demo', title: 'Próximos eventos', subtitle: 'Consulta el calendario de la iglesia', url: 'https://example.com/eventos', icon: 'calendar', sort_order: 4, active: true },
  { id: '6', profile_id: 'demo', title: 'Apoya nuestra misión', subtitle: 'Haz una donación', url: 'https://example.com/donar', icon: 'donation', sort_order: 5, active: true },
];

export default function Home() {
  return <PublicPage profile={demoProfile} links={demoLinks} origin="https://iglesia-linktree-v1-yoel-laya-projects.vercel.app" />;
}
