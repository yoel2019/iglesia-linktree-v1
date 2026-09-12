import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/LanguageProvider';

export const metadata: Metadata = {
  title: 'Iglesia | Links',
  description: 'Página de enlaces de la iglesia'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body><LanguageProvider>{children}</LanguageProvider></body></html>;
}
