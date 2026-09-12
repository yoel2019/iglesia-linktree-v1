'use client';
import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabase';
import { t } from '@/lib/i18n';
import { useLanguage } from '@/components/LanguageProvider';
import type { Lang, Profile, LinkItem, Translations, Translation } from '@/lib/types';

const langs: { id: Lang; label: string; name: string }[] = [
  { id: 'es', label: 'ES', name: 'Español' },
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'pt', label: 'PT', name: 'Português' },
];
const emptyT = (): Translations => ({ es: {}, en: {}, pt: {} });

type UiKey = 'loading'|'admin'|'adminDesc'|'email'|'password'|'createAccount'|'alreadyHave'|'login'|'profileNotFound'|'profileNotFoundDesc'|'logout'|'profile'|'profileDesc'|'editingLanguage'|'baseName'|'slug'|'nameIn'|'handleIn'|'baseBio'|'bioIn'|'baseFooter'|'footerIn'|'accent'|'churchLogo'|'currentLogo'|'saveProfile'|'links'|'linksDesc'|'add'|'baseTitle'|'titleIn'|'baseSubtitle'|'subtitleIn'|'url'|'icon'|'saveLink'|'qrEyebrow'|'qrTitle'|'qrDesc'|'downloadPng'|'downloadSvg'|'saved'|'ready'|'uploading'|'editLanguage';
const ui: Record<UiKey, Record<Lang, string>> = {
  loading:{es:'Cargando…',en:'Loading…',pt:'Carregando…'}, admin:{es:'Administrador',en:'Administrator',pt:'Administrador'}, adminDesc:{es:'Gestiona tu página de enlaces.',en:'Manage your links page.',pt:'Gerencie sua página de links.'}, email:{es:'Email',en:'Email',pt:'E-mail'}, password:{es:'Contraseña',en:'Password',pt:'Senha'}, createAccount:{es:'Crear cuenta',en:'Create account',pt:'Criar conta'}, alreadyHave:{es:'Ya tengo cuenta',en:'I already have an account',pt:'Já tenho uma conta'}, login:{es:'Entrar',en:'Log in',pt:'Entrar'}, profileNotFound:{es:'Perfil no encontrado',en:'Profile not found',pt:'Perfil não encontrado'}, profileNotFoundDesc:{es:'Tu cuenta aún no tiene perfil. Se intentará crear automáticamente al registrarte.',en:'Your account does not have a profile yet. It will be created automatically when you register.',pt:'Sua conta ainda não tem um perfil. Ele será criado automaticamente ao se registrar.'}, logout:{es:'Salir',en:'Log out',pt:'Sair'}, profile:{es:'Perfil',en:'Profile',pt:'Perfil'}, profileDesc:{es:'Contenido base + traducciones. Si falta una traducción, la página pública usa inglés.',en:'Base content + translations. If a translation is missing, the public page uses English.',pt:'Conteúdo base + traduções. Se faltar uma tradução, a página pública usa inglês.'}, editingLanguage:{es:'Idioma de edición',en:'Editing language',pt:'Idioma de edição'}, baseName:{es:'Nombre base',en:'Base name',pt:'Nome base'}, slug:{es:'Slug',en:'Slug',pt:'Slug'}, nameIn:{es:'Nombre en',en:'Name in',pt:'Nome em'}, handleIn:{es:'Handle en',en:'Handle in',pt:'Handle em'}, baseBio:{es:'Bio base',en:'Base bio',pt:'Bio base'}, bioIn:{es:'Bio en',en:'Bio in',pt:'Bio em'}, baseFooter:{es:'Pie de página base',en:'Base footer',pt:'Rodapé base'}, footerIn:{es:'Pie de página en',en:'Footer in',pt:'Rodapé em'}, accent:{es:'Color de acento',en:'Accent color',pt:'Cor de destaque'}, churchLogo:{es:'Logo de la iglesia',en:'Church logo',pt:'Logo da igreja'}, currentLogo:{es:'Logo actual',en:'Current logo',pt:'Logo atual'}, saveProfile:{es:'Guardar perfil',en:'Save profile',pt:'Salvar perfil'}, links:{es:'Enlaces',en:'Links',pt:'Links'}, linksDesc:{es:'Cada enlace puede tener título y subtítulo por idioma.',en:'Each link can have a title and subtitle per language.',pt:'Cada link pode ter título e subtítulo por idioma.'}, add:{es:'+ Añadir',en:'+ Add',pt:'+ Adicionar'}, baseTitle:{es:'Título base',en:'Base title',pt:'Título base'}, titleIn:{es:'Título en',en:'Title in',pt:'Título em'}, baseSubtitle:{es:'Subtítulo base',en:'Base subtitle',pt:'Subtítulo base'}, subtitleIn:{es:'Subtítulo en',en:'Subtitle in',pt:'Subtítulo em'}, url:{es:'URL',en:'URL',pt:'URL'}, icon:{es:'Icono',en:'Icon',pt:'Ícone'}, saveLink:{es:'Guardar enlace',en:'Save link',pt:'Salvar link'}, qrEyebrow:{es:'QR PARA DISEÑOS',en:'QR FOR DESIGNS',pt:'QR PARA DESIGN'}, qrTitle:{es:'Generador de código QR',en:'QR code generator',pt:'Gerador de código QR'}, qrDesc:{es:'Este QR es únicamente para imprimir en flyers, afiches y otros diseños. No aparece en la página pública.',en:'This QR is only for printing on flyers, posters and other designs. It does not appear on the public page.',pt:'Este QR é apenas para impressão em flyers, cartazes e outros designs. Ele não aparece na página pública.'}, downloadPng:{es:'Descargar PNG',en:'Download PNG',pt:'Baixar PNG'}, downloadSvg:{es:'Descargar SVG',en:'Download SVG',pt:'Baixar SVG'}, saved:{es:'guardado.',en:'saved.',pt:'salvo.'}, ready:{es:'Listo.',en:'Done.',pt:'Pronto.'}, uploading:{es:'Subiendo logo…',en:'Uploading logo…',pt:'Enviando logo…'}, editLanguage:{es:'Editar en',en:'Edit in',pt:'Editar em'}
};
function text(key: UiKey, lang: Lang) { return ui[key]?.[lang] || ui[key]?.en || ui[key]?.es || key; }
function contentFallback<T extends keyof Translation>(base: string | null | undefined, translations: Translations | null | undefined, lang: Lang, key: T) {
  return t(base, translations, lang, key);
}

export default function Admin() {
  const sb = supabaseBrowser();
  const { lang, setLang } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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

  if (loading) return <main className="login"><div className="login-card">{text('loading', lang)}</div></main>;

  async function auth() {
    const r = signup ? await sb.auth.signUp({ email, password }) : await sb.auth.signInWithPassword({ email, password });
    setMsg(r.error?.message || text('ready', lang));
  }

  if (!user) return <main className="login"><div className="login-card"><h1>{text('admin', lang)}</h1><p className="muted">{text('adminDesc', lang)}</p><div className="field"><label>{text('email', lang)}</label><input value={email} onChange={e => setEmail(e.target.value)} type="email" /></div><div className="field"><label>{text('password', lang)}</label><input value={password} onChange={e => setPassword(e.target.value)} type="password" /></div><button className="btn btn-primary" style={{ width:'100%' }} onClick={auth}>{signup ? text('createAccount', lang) : text('login', lang)}</button><button className="btn btn-secondary" style={{ width:'100%', marginTop:9 }} onClick={() => setSignup(!signup)}>{signup ? text('alreadyHave', lang) : text('createAccount', lang)}</button>{msg && <p>{msg}</p>}<div className="language-tabs" style={{ marginTop:16, justifyContent:'center' }}>{langs.map(x => <button type="button" key={x.id} className={`language-circle ${lang===x.id?'active':''}`} title={x.name} aria-label={`${text('editLanguage',lang)} ${x.name}`} onClick={() => setLang(x.id)}>{x.label}</button>)}</div></div></main>;

  if (!profile) return <main className="login"><div className="login-card"><h1>{text('profileNotFound', lang)}</h1><p className="muted">{text('profileNotFoundDesc', lang)}</p></div></main>;

  const translations = profile.translations || emptyT();
  const currentLangName = langs.find(x => x.id === lang)?.name || 'English';
  const tr = translations[lang] || {};

  function updateProfileTranslation(field: 'name'|'handle'|'bio'|'footer', value: string) {
    if (!profile) return;
    const next: Translations = { ...translations, [lang]: { ...(translations[lang] || {}), [field]: value } };
    setProfile({ ...profile, translations: next });
  }
  function updateLinkTranslation(i: number, field: 'title'|'subtitle', value: string) {
    const l = links[i]; if (!l) return;
    const trn = l.translations || emptyT();
    const next: Translations = { ...trn, [lang]: { ...(trn[lang] || {}), [field]: value } };
    const n = [...links]; n[i] = { ...l, translations: next }; setLinks(n);
  }
  async function saveProfile() {
    if (!profile) return;
    const { error } = await sb.from('profiles').update({ name:profile.name, slug:profile.slug, handle:profile.handle, bio:profile.bio, logo_url:profile.logo_url, accent_color:profile.accent_color, background_style:profile.background_style, featured_title:profile.featured_title, featured_url:profile.featured_url, featured_image_url:profile.featured_image_url, footer_text:profile.footer_text, published:profile.published, translations:profile.translations || {} }).eq('id', profile.id);
    setMsg(error?.message || `${text('profile',lang)} ${text('saved',lang)}`);
  }
  async function uploadLogo(file: File) {
    if (!profile) return;
    setUploading(true); setMsg(text('uploading',lang));
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const path = `${profile.id}/logo.${ext}`;
    const up = await sb.storage.from('assets').upload(path,file,{upsert:true,contentType:file.type,cacheControl:'3600'});
    if (up.error) { setMsg(up.error.message); setUploading(false); return; }
    const { data } = sb.storage.from('assets').getPublicUrl(path);
    setProfile(prev => prev ? {...prev,logo_url:data.publicUrl}:prev);
    const { error } = await sb.from('profiles').update({logo_url:data.publicUrl}).eq('id',profile.id);
    setMsg(error?.message || text('saved',lang)); setUploading(false);
  }
  async function saveLink(l: LinkItem, i: number) {
    if (!profile) return;
    const payload={title:l.title,subtitle:l.subtitle,url:l.url,icon:l.icon,sort_order:i,active:l.active,profile_id:profile.id,translations:l.translations||{}};
    const r=l.id ? await sb.from('links').update(payload).eq('id',l.id) : await sb.from('links').insert(payload).select().single();
    if (!r.error && r.data) { const n=[...links]; n[i]=r.data; setLinks(n); }
    setMsg(r.error?.message || `${text('links',lang)} ${text('saved',lang)}`);
  }
  function add() {
    if (!profile) return;
    setLinks([...links,{id:'',profile_id:profile.id,title:'New link',subtitle:'',url:'https://',icon:'link',sort_order:links.length,active:true,translations:emptyT()}]);
  }
  function downloadSvg() {
    const svg=document.querySelector('#admin-qr svg') as SVGSVGElement|null; if(!svg)return;
    const blob=new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`qr-${profile?.slug||'iglesia'}.svg`; a.click(); URL.revokeObjectURL(a.href);
  }
  function downloadPng() {
    const svg=document.querySelector('#admin-qr svg') as SVGSVGElement|null; if(!svg)return;
    const xml=new XMLSerializer().serializeToString(svg); const img=new Image();
    img.onload=()=>{const c=document.createElement('canvas');c.width=1024;c.height=1024;const ctx=c.getContext('2d');if(!ctx)return;ctx.fillStyle='#fff';ctx.fillRect(0,0,1024,1024);ctx.drawImage(img,0,0,1024,1024);c.toBlob(b=>{if(!b)return;const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`qr-${profile?.slug||'iglesia'}.png`;a.click();},'image/png');};
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(xml);
  }
  const qrUrl=useMemo(()=>`${typeof window!=='undefined'?window.location.origin:''}/${profile.slug}`,[profile.slug]);

  return <main className="admin-page"><div className="admin-wrap">
    <header className="admin-head"><div><span className="eyebrow">IGLESIA LINKTREE</span><h1>{text('admin',lang)}</h1></div><button className="btn btn-secondary" onClick={()=>sb.auth.signOut()}>{text('logout',lang)}</button></header>
    {msg&&<div className="success">{msg}</div>}
    <section className="panel"><div className="section-title"><div><h2>{text('profile',lang)}</h2><p className="muted">{text('profileDesc',lang)}</p></div><div className="language-tabs" aria-label={text('editingLanguage',lang)}>{langs.map(x=><button type="button" key={x.id} className={`language-circle ${lang===x.id?'active':''}`} title={x.name} aria-label={`${text('editLanguage',lang)} ${x.name}`} onClick={()=>setLang(x.id)}>{x.label}</button>)}</div></div>
      <div className="grid2"><div className="field"><label>{text('baseName',lang)}</label><input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})}/></div><div className="field"><label>{text('slug',lang)}</label><input value={profile.slug} onChange={e=>setProfile({...profile,slug:e.target.value})}/></div><div className="field"><label>{text('nameIn',lang)} {currentLangName}</label><input value={tr.name||''} placeholder={contentFallback(profile.name,translations,'en','name')} onChange={e=>updateProfileTranslation('name',e.target.value)}/></div><div className="field"><label>{text('handleIn',lang)} {currentLangName}</label><input value={tr.handle||''} placeholder={contentFallback(profile.handle,translations,'en','handle')} onChange={e=>updateProfileTranslation('handle',e.target.value)}/></div></div>
      <div className="field"><label>{text('baseBio',lang)}</label><textarea value={profile.bio||''} onChange={e=>setProfile({...profile,bio:e.target.value})}/></div><div className="field"><label>{text('bioIn',lang)} {currentLangName}</label><textarea value={tr.bio||''} placeholder={contentFallback(profile.bio,translations,'en','bio')} onChange={e=>updateProfileTranslation('bio',e.target.value)}/></div>
      <div className="grid2"><div className="field"><label>{text('baseFooter',lang)}</label><input value={profile.footer_text||''} onChange={e=>setProfile({...profile,footer_text:e.target.value})}/></div><div className="field"><label>{text('footerIn',lang)} {currentLangName}</label><input value={tr.footer||''} placeholder={contentFallback(profile.footer_text,translations,'en','footer')} onChange={e=>updateProfileTranslation('footer',e.target.value)}/></div></div>
      <div className="grid2"><div className="field"><label>{text('accent',lang)}</label><input value={profile.accent_color} onChange={e=>setProfile({...profile,accent_color:e.target.value})}/></div><div className="field"><label>{text('churchLogo',lang)}</label><input type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading} onChange={e=>{const f=e.target.files?.[0];if(f)uploadLogo(f)}}/>{profile.logo_url&&<img src={profile.logo_url} alt={text('currentLogo',lang)} style={{width:110,height:110,objectFit:'contain',marginTop:8,borderRadius:'50%',background:'#fff'}}/>}</div></div>
      <button className="btn btn-primary" onClick={saveProfile}>{text('saveProfile',lang)}</button>
    </section>
    <section className="panel"><div className="section-title"><div><h2>{text('links',lang)}</h2><p className="muted">{text('linksDesc',lang)}</p></div><button className="btn btn-primary" onClick={add}>{text('add',lang)}</button></div>{links.map((l,i)=>{const lt=l.translations?.[lang]||{};const english=l.translations?.en||{};return <div className="edit-card" key={i}><div className="field"><label>{text('baseTitle',lang)}</label><input value={l.title} onChange={e=>{const n=[...links];n[i]={...l,title:e.target.value};setLinks(n)}}/></div><div className="field"><label>{text('titleIn',lang)} {currentLangName}</label><input value={lt.title||''} placeholder={english.title||l.title} onChange={e=>updateLinkTranslation(i,'title',e.target.value)}/></div><div className="field"><label>{text('baseSubtitle',lang)}</label><input value={l.subtitle||''} onChange={e=>{const n=[...links];n[i]={...l,subtitle:e.target.value};setLinks(n)}}/></div><div className="field"><label>{text('subtitleIn',lang)} {currentLangName}</label><input value={lt.subtitle||''} placeholder={english.subtitle||l.subtitle||''} onChange={e=>updateLinkTranslation(i,'subtitle',e.target.value)}/></div><div className="field"><label>{text('url',lang)}</label><input value={l.url} onChange={e=>{const n=[...links];n[i]={...l,url:e.target.value};setLinks(n)}}/></div><div className="field"><label>{text('icon',lang)}</label><select value={l.icon} onChange={e=>{const n=[...links];n[i]={...l,icon:e.target.value};setLinks(n)}}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="youtube">YouTube</option><option value="whatsapp">WhatsApp</option><option value="donation">Donaciones</option><option value="calendar">Eventos</option><option value="website">Web</option><option value="link">Enlace</option></select></div><button className="btn btn-primary" onClick={()=>saveLink(l,i)}>{text('saveLink',lang)}</button></div>})}</section>
    <section className="panel qr-panel"><div><span className="eyebrow">{text('qrEyebrow',lang)}</span><h2>{text('qrTitle',lang)}</h2><p className="muted">{text('qrDesc',lang)}</p><code>{qrUrl}</code><div className="qr-actions"><button className="btn btn-primary" onClick={downloadPng}><Download size={17}/> {text('downloadPng',lang)}</button><button className="btn btn-secondary" onClick={downloadSvg}><Download size={17}/> {text('downloadSvg',lang)}</button></div></div><div id="admin-qr" className="qrbox admin-qr"><QRCodeSVG value={qrUrl} size={220} includeMargin/></div></section>
  </div></main>;
}
