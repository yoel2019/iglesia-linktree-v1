'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Instagram, Facebook, Youtube, MessageCircle, Heart, CalendarDays, Globe, ArrowUpRight, MoreHorizontal, Link as LinkIcon, BookOpen, Users, Play } from 'lucide-react';
import type { LinkItem, Profile } from '@/lib/types';

const icons: Record<string, React.ReactNode> = {
  instagram: <Instagram size={22} />, facebook: <Facebook size={22} />, youtube: <Youtube size={22} />,
  whatsapp: <MessageCircle size={22} />, donation: <Heart size={22} />, calendar: <CalendarDays size={22} />,
  website: <Globe size={22} />, link: <LinkIcon size={22} />, bible: <BookOpen size={22} />, community: <Users size={22} />, play: <Play size={22} />,
};
function iconFor(v: string) { return icons[v?.toLowerCase()] ?? <LinkIcon size={22} />; }

export default function PublicPage({ profile, links, origin }: { profile: Profile; links: LinkItem[]; origin: string }) {
  const publicUrl = `${origin}/${profile.slug}`;
  const accent = profile.accent_color || '#d8b36a';
  const activeLinks = links.filter(x => x.active).sort((a, b) => a.sort_order - b.sort_order);
  const socials = activeLinks.filter(x => ['instagram', 'facebook', 'youtube', 'whatsapp'].includes(x.icon?.toLowerCase())).slice(0, 5);

  return (
    <main className="page-bg" style={{ '--accent': accent } as React.CSSProperties}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="public-container">
        <div className="topbar">
          <span className="language-pill">ES <span>⌄</span></span>
          <button className="more" aria-label="Más opciones"><MoreHorizontal size={20} /></button>
        </div>

        <section className="profile">
          <div className="profile-mark">
            <div className="logo">{profile.logo_url ? <img src={profile.logo_url} alt={`Logo de ${profile.name}`} /> : <span>{profile.name.slice(0, 2).toUpperCase()}</span>}</div>
            <span className="verified" aria-label="Cuenta verificada">✓</span>
          </div>
          <div className="brand-kicker">UN LUGAR PARA TODOS</div>
          <h1>{profile.name}</h1>
          {profile.handle && <div className="handle">{profile.handle}</div>}
          {profile.bio && <p className="bio">{profile.bio}</p>}
          <div className="mini-values"><span>Amar</span><i>•</i><span>Servir</span><i>•</i><span>Transformar</span></div>
        </section>

        <section className="links" aria-label="Enlaces principales">
          {activeLinks.map((link, index) => (
            <a className={`link ${index === 0 ? 'link-primary' : ''}`} href={link.url} target="_blank" rel="noreferrer" key={link.id}>
              <span className="icon">{iconFor(link.icon)}</span>
              <span className="link-content"><span className="link-title">{link.title}</span>{link.subtitle && <span className="link-sub">{link.subtitle}</span>}</span>
              <span className="arrow"><ArrowUpRight size={20} /></span>
            </a>
          ))}
        </section>

        {profile.featured_url && profile.featured_title && (
          <a className="featured" href={profile.featured_url} target="_blank" rel="noreferrer">
            {profile.featured_image_url ? <img src={profile.featured_image_url} alt="" /> : <div className="featured-art"><span>✦</span></div>}
            <div><small>DESTACADO</small><h2>{profile.featured_title}</h2><span className="featured-cta">Ver ahora <ArrowUpRight size={15} /></span></div>
          </a>
        )}

        {socials.length > 0 && <div className="social-block"><div className="section-label"><span />SÍGUENOS EN REDES SOCIALES<span /></div><div className="socials">{socials.map(link => <a className="social" href={link.url} target="_blank" rel="noreferrer" key={link.id} aria-label={link.title}>{iconFor(link.icon)}</a>)}</div></div>}

        <section className="quote"><div className="quote-line" /><p>“Todo es posible para el que cree.”</p><small>Marcos 9:23</small></section>

        <section className="qr">
          <div><span className="eyebrow">COMPARTE</span><h3>Conecta con nuestra comunidad</h3><p>Escanea el código QR y lleva todos nuestros enlaces contigo.</p></div>
          <div className="qrbox"><QRCodeSVG value={publicUrl} includeMargin={false} size={132} /></div>
        </section>

        <div className="footer">{profile.footer_text || 'Más que una iglesia, una familia.'}</div>
      </div>
    </main>
  );
}
