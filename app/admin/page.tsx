'use client';
import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabase';
import type { Lang, Profile, LinkItem, Translations } from '@/lib/types';

const langs: { id: Lang; label: string; name: string }[] = [
  { id: 'es', label: 'ES', name: 'Español' },
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'pt', label: 'PT', name: 'Português' },
];
const emptyT = (): Translations => ({ es: {}, en: {}, pt: {} });

export default function Admin() {
  const sb = supabaseBrowser();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [lang, setLang] = useState<Lang>('es');

  async function load(u: any) {
    setUser(u);
    if (u) {
      const { data: p } = await sb.from('profiles').select('*').eq('id', u.id).maybeSingle();
      setProfile(p);
      if (p) {
        const { data: l } = await sb.from('links').select('*').eq('profile_id', p.id).order('sort_order');
        setLinks(l || []);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    sb.auth.getUser().then(({ data }) => load(data.user));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_e, s) => load(s?.user));
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <main className="login"><div className="login-card">Cargando…</div></main>;

  async function auth() {
    const r = signup ? await sb.auth.signUp({ email, password }) : await sb.auth.signInWithPassword({ email, password });
    setMsg(r.error?.message || 'Listo.');
  }

  if (!user) return <main className="login"><div className="login-card"><h1>Administrador</h1><p className="muted">Gestiona tu página de enlaces.</p><div className="field"><label>Email</label><input value={email} onChange={e => setEmail(e.target.value)} type="email" /></div><div className="field"><label>Contraseña</label><input value={password} onChange={e => setPassword(e.target.value)} type="password" /></div><button className="btn btn-primary" style={{ width: '100%' }} onClick={auth}>{signup ? 'Crear cuenta' : 'Entrar'}</button><button className="btn btn-secondary" style={{ width: '100%', marginTop: 9 }} onClick={() => setSignup(!signup)}>{signup ? 'Ya tengo cuenta' : 'Crear cuenta'}</button>{msg && <p>{msg}</p>}</div></main>;

  if (!profile) return <main className="login"><div className="login-card"><h1>Perfil no encontrado</h1><p className="muted">Tu cuenta aún no tiene perfil. Se intentará crear automáticamente al registrarte.</p></div></main>;

  const translations = profile.translations || emptyT();
  const currentLangName = langs.find(x => x.id === lang)?.name || 'Español';

  function updateProfileTranslation(field: 'name' | 'handle' | 'bio' | 'footer', value: string) {
    if (!profile) return;
    const next: Translations = { ...translations, [lang]: { ...(translations[lang] || {}), [field]: value } };
    setProfile({ ...profile, translations: next });
  }

  function updateLinkTranslation(i: number, field: 'title' | 'subtitle', value: string) {
    const l = links[i];
    if (!l) return;
    const t = l.translations || emptyT();
    const next: Translations = { ...t, [lang]: { ...(t[lang] || {}), [field]: value } };
    const n = [...links];
    n[i] = { ...l, translations: next };
    setLinks(n);
  }

  async function saveProfile() {
    if (!profile) return;
    const { error } = await sb.from('profiles').update({ name: profile.name, slug: profile.slug, handle: profile.handle, bio: profile.bio, logo_url: profile.logo_url, accent_color: profile.accent_color, background_style: profile.background_style, featured_title: profile.featured_title, featured_url: profile.featured_url, featured_image_url: profile.featured_image_url, footer_text: profile.footer_text, published: profile.published, translations: profile.translations || {} }).eq('id', profile.id);
    setMsg(error?.message || 'Perfil guardado.');
  }

  async function uploadLogo(file: File) {
    if (!profile) return;
    setUploading(true); setMsg('Subiendo logo…');
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const path = `${profile.id}/logo.${ext}`;
    const up = await sb.storage.from('assets').upload(path, file, { upsert: true, contentType: file.type, cacheControl: '3600' });
    if (up.error) { setMsg(up.error.message); setUploading(false); return; }
    const { data } = sb.storage.from('assets').getPublicUrl(path);
    setProfile(prev => prev ? { ...prev, logo_url: data.publicUrl } : prev);
    const { error } = await sb.from('profiles').update({ logo_url: data.publicUrl }).eq('id', profile.id);
    setMsg(error?.message || 'Logo actualizado.'); setUploading(false);
  }

  async function saveLink(l: LinkItem, i: number) {
    if (!profile) return;
    const payload = { title: l.title, subtitle: l.subtitle, url: l.url, icon: l.icon, sort_order: i, active: l.active, profile_id: profile.id, translations: l.translations || {} };
    const r = l.id ? await sb.from('links').update(payload).eq('id', l.id) : await sb.from('links').insert(payload).select().single();
    if (!r.error && r.data) { const n = [...links]; n[i] = r.data; setLinks(n); }
    setMsg(r.error?.message || 'Enlace guardado.');
  }

  function add() {
    if (!profile) return;
    setLinks([...links, { id: '', profile_id: profile.id, title: 'Nuevo enlace', subtitle: '', url: 'https://', icon: 'link', sort_order: links.length, active: true, translations: emptyT() }]);
  }

  function downloadSvg() {
    const svg = document.querySelector('#admin-qr svg') as SVGSVGElement | null;
    if (!svg) return;
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `qr-${profile.slug}.svg`; a.click(); URL.revokeObjectURL(a.href);
  }

  function downloadPng() {
    const svg = document.querySelector('#admin-qr svg') as SVGSVGElement | null;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => { const c = document.createElement('canvas'); c.width = 1024; c.height = 1024; const ctx = c.getContext('2d'); if (!ctx) return; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1024, 1024); ctx.drawImage(img, 0, 0, 1024, 1024); c.toBlob(b => { if (!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `qr-${profile.slug}.png`; a.click(); }, 'image/png');
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
  }

  const qrUrl = useMemo(() => `${typeof window !== 'undefined' ? window.location.origin : ''}/${profile.slug}`, [profile.slug]);
  const tr = translations[lang] || {};

  return <main className="admin-page"><div className="admin-wrap">
    <header className="admin-head"><div><span className="eyebrow">IGLESIA LINKTREE</span><h1>Administrador</h1></div><button className="btn btn-secondary" onClick={() => sb.auth.signOut()}>Salir</button></header>
    {msg && <div className="success">{msg}</div>}

    <section className="panel"><div className="section-title"><div><h2>Perfil</h2><p className="muted">Contenido base en español + traducciones.</p></div><div className="language-tabs" aria-label="Idioma de edición">{langs.map(x => <button type="button" key={x.id} className={`language-circle ${lang === x.id ? 'active' : ''}`} title={x.name} aria-label={`Editar en ${x.name}`} onClick={() => setLang(x.id)}>{x.label}</button>)}</div></div>
      <div className="grid2"><div className="field"><label>Nombre base</label><input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} /></div><div className="field"><label>Slug</label><input value={profile.slug} onChange={e => setProfile({ ...profile, slug: e.target.value })} /></div><div className="field"><label>Nombre en {currentLangName}</label><input value={tr.name || ''} placeholder={profile.name} onChange={e => updateProfileTranslation('name', e.target.value)} /></div><div className="field"><label>Handle en {currentLangName}</label><input value={tr.handle || ''} placeholder={profile.handle || ''} onChange={e => updateProfileTranslation('handle', e.target.value)} /></div></div>
      <div className="field"><label>Bio base</label><textarea value={profile.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })} /></div><div className="field"><label>Bio en {currentLangName}</label><textarea value={tr.bio || ''} placeholder={profile.bio || ''} onChange={e => updateProfileTranslation('bio', e.target.value)} /></div>
      <div className="grid2"><div className="field"><label>Color de acento</label><input value={profile.accent_color} onChange={e => setProfile({ ...profile, accent_color: e.target.value })} /></div><div className="field"><label>Logo de la iglesia</label><input type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading} onChange={e => { const f = e.target.files?.[0]; if (f) uploadLogo(f); }} />{profile.logo_url && <img src={profile.logo_url} alt="Logo actual" style={{ width: 110, height: 110, objectFit: 'contain', marginTop: 8, borderRadius: '50%', background: '#fff' }} />}</div></div>
      <button className="btn btn-primary" onClick={saveProfile}>Guardar perfil</button>
    </section>

    <section className="panel"><div className="section-title"><div><h2>Enlaces</h2><p className="muted">Cada enlace puede tener título y subtítulo por idioma.</p></div><button className="btn btn-primary" onClick={add}>+ Añadir</button></div>{links.map((l, i) => { const lt = l.translations?.[lang] || {}; return <div className="edit-card" key={i}><div className="field"><label>Título base</label><input value={l.title} onChange={e => { const n = [...links]; n[i] = { ...l, title: e.target.value }; setLinks(n); }} /></div><div className="field"><label>Título en {currentLangName}</label><input value={lt.title || ''} placeholder={l.title} onChange={e => updateLinkTranslation(i, 'title', e.target.value)} /></div><div className="field"><label>Subtítulo base</label><input value={l.subtitle || ''} onChange={e => { const n = [...links]; n[i] = { ...l, subtitle: e.target.value }; setLinks(n); }} /></div><div className="field"><label>Subtítulo en {currentLangName}</label><input value={lt.subtitle || ''} placeholder={l.subtitle || ''} onChange={e => updateLinkTranslation(i, 'subtitle', e.target.value)} /></div><div className="field"><label>URL</label><input value={l.url} onChange={e => { const n = [...links]; n[i] = { ...l, url: e.target.value }; setLinks(n); }} /></div><div className="field"><label>Icono</label><select value={l.icon} onChange={e => { const n = [...links]; n[i] = { ...l, icon: e.target.value }; setLinks(n); }}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="youtube">YouTube</option><option value="whatsapp">WhatsApp</option><option value="donation">Donaciones</option><option value="calendar">Eventos</option><option value="website">Web</option><option value="link">Enlace</option></select></div><button className="btn btn-primary" onClick={() => saveLink(l, i)}>Guardar enlace</button></div>; })}</section>

    <section className="panel qr-panel"><div><span className="eyebrow">QR PARA DISEÑOS</span><h2>Generador de código QR</h2><p className="muted">Este QR es únicamente para imprimir en flyers, afiches y otros diseños. <b>No aparece en la página pública.</b></p><code>{qrUrl}</code><div className="qr-actions"><button className="btn btn-primary" onClick={downloadPng}><Download size={17} /> Descargar PNG</button><button className="btn btn-secondary" onClick={downloadSvg}><Download size={17} /> Descargar SVG</button></div></div><div id="admin-qr" className="qrbox admin-qr"><QRCodeSVG value={qrUrl} size={220} includeMargin /></div></section>
  </div></main>;
}
