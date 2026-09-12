'use client';
import { Instagram, Facebook, Youtube, MessageCircle, Heart, CalendarDays, Globe, ArrowUpRight, MoreHorizontal, Link as LinkIcon, BookOpen, Users, Play, Share2, Flag, LogIn, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { LinkItem, Profile, Lang } from '@/lib/types';

type Translation = { name?: string; handle?: string; bio?: string; title?: string; subtitle?: string; footer?: string };
const icons: Record<string, React.ReactNode> = { instagram:<Instagram size={22}/>, facebook:<Facebook size={22}/>, youtube:<Youtube size={22}/>, whatsapp:<MessageCircle size={22}/>, donation:<Heart size={22}/>, calendar:<CalendarDays size={22}/>, website:<Globe size={22}/>, link:<LinkIcon size={22}/>, bible:<BookOpen size={22}/>, community:<Users size={22}/>, play:<Play size={22}/> };
function iconFor(v:string){return icons[v?.toLowerCase()] ?? <LinkIcon size={22}/>;}
function pick<T>(base:T,translations:unknown,lang:Lang,key:keyof Translation):T{
 const all=translations as Record<string,Translation>|null|undefined;
 const selected=all?.[lang]?.[key];
 if(selected) return selected as T;
 const english=all?.en?.[key];
 if(english) return english as T;
 return base;
}

export default function PublicPage({profile,links,origin}:{profile:Profile;links:LinkItem[];origin:string}){
 const [lang,setLang]=useState<Lang>('es');
 const [menuOpen,setMenuOpen]=useState(false);
 const [reportOpen,setReportOpen]=useState(false);
 const [reportText,setReportText]=useState('');
 useEffect(()=>{const saved=window.localStorage.getItem('site-language') as Lang|null;if(saved&&['es','en','pt'].includes(saved))setLang(saved);},[]);
 function changeLang(value:Lang){setLang(value);window.localStorage.setItem('site-language',value);}
 function cycleLang(){changeLang(lang==='es'?'en':lang==='en'?'pt':'es');}
 async function sharePage(){
   const url=window.location.href;
   const title=pick(profile.name,profile.translations,lang,'name');
   try{if(navigator.share) await navigator.share({title,url});else if(navigator.clipboard) await navigator.clipboard.writeText(url);else window.prompt('Copy link',url);}catch{}
   setMenuOpen(false);
 }
 function openReport(){setReportOpen(true);setMenuOpen(false);}
 function submitReport(){
   const subject=encodeURIComponent(`Report a problem - ${profile.name}`);
   const body=encodeURIComponent(reportText||'I want to report a problem on this page.');
   window.location.href=`mailto:?subject=${subject}&body=${body}`;
   setReportOpen(false);setReportText('');
 }
 const accent=profile.accent_color||'#d8b36a';
 const activeLinks=links.filter(x=>x.active).sort((a,b)=>a.sort_order-b.sort_order);
 const socials=activeLinks.filter(x=>['instagram','facebook','youtube','whatsapp'].includes(x.icon?.toLowerCase())).slice(0,5);
 const ui=useMemo(()=>({
   kicker:{es:'UN LUGAR PARA TODOS',en:'A PLACE FOR EVERYONE',pt:'UM LUGAR PARA TODOS'}[lang],
   values:{es:['Amar','Servir','Transformar'],en:['Love','Serve','Transform'],pt:['Amar','Servir','Transformar']}[lang],
   follow:{es:'SÍGUENOS EN REDES SOCIALES',en:'FOLLOW US ON SOCIAL MEDIA',pt:'SIGA-NOS NAS REDES SOCIAIS'}[lang],
   featured:{es:'DESTACADO',en:'FEATURED',pt:'DESTAQUE'}[lang],
   now:{es:'Ver ahora',en:'View now',pt:'Ver agora'}[lang],
   quote:{es:'“Todo es posible para el que cree.”',en:'“Everything is possible for the one who believes.”',pt:'“Tudo é possível para aquele que crê.”'}[lang],
   verse:{es:'Marcos 9:23',en:'Mark 9:23',pt:'Marcos 9:23'}[lang],
   changeLanguage:{es:'Cambiar idioma',en:'Change language',pt:'Mudar idioma'}[lang],
   currentLanguage:{es:'Idioma actual',en:'Current language',pt:'Idioma atual'}[lang],
   moreOptions:{es:'Más opciones',en:'More options',pt:'Mais opções'}[lang],
   share:{es:'Compartir',en:'Share',pt:'Compartilhar'}[lang],
   report:{es:'Reportar un problema',en:'Report a problem',pt:'Relatar um problema'}[lang],
   login:{es:'Login',en:'Login',pt:'Entrar'}[lang],
   reportTitle:{es:'Reportar un problema',en:'Report a problem',pt:'Relatar um problema'}[lang],
   reportPlaceholder:{es:'Cuéntanos qué está pasando...',en:'Tell us what is wrong...',pt:'Conte-nos o que está acontecendo...'}[lang],
   cancel:{es:'Cancelar',en:'Cancel',pt:'Cancelar'}[lang],
   send:{es:'Enviar reporte',en:'Send report',pt:'Enviar relatório'}[lang],
   verified:{es:'Cuenta verificada',en:'Verified account',pt:'Conta verificada'}[lang],
   mainLinks:{es:'Enlaces principales',en:'Main links',pt:'Links principais'}[lang],
   logoAlt:{es:'Logo de',en:'Logo of',pt:'Logo de'}[lang],
   footerFallback:{es:'Más que una iglesia, una familia.',en:'More than a church, a family.',pt:'Mais que uma igreja, uma família.'}[lang]
 }),[lang]);
 return <main className="page-bg" style={{'--accent':accent} as React.CSSProperties}><div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="public-container">
  <div className="topbar"><button type="button" className="language-circle public-language" onClick={cycleLang} title={ui.changeLanguage} aria-label={`${ui.changeLanguage}. ${ui.currentLanguage}: ${lang.toUpperCase()}`}>{lang.toUpperCase()}</button><div className="more-wrap"><button type="button" className="more" onClick={()=>setMenuOpen(v=>!v)} aria-label={ui.moreOptions} aria-expanded={menuOpen}><MoreHorizontal size={20}/></button>{menuOpen&&<><button className="menu-backdrop" aria-label={ui.cancel} onClick={()=>setMenuOpen(false)}/><div className="more-menu"><button type="button" onClick={sharePage}><Share2 size={17}/><span>{ui.share}</span></button><button type="button" onClick={openReport}><Flag size={17}/><span>{ui.report}</span></button><a href="/admin" onClick={()=>setMenuOpen(false)}><LogIn size={17}/><span>{ui.login}</span></a></div></>}</div></div>
  <section className="profile"><div className="profile-mark"><div className="logo">{profile.logo_url?<img src={profile.logo_url} alt={`${ui.logoAlt} ${pick(profile.name,profile.translations,lang,'name')}`}/>:<span>{profile.name.slice(0,2).toUpperCase()}</span>}</div><span className="verified" aria-label={ui.verified}>✓</span></div><div className="brand-kicker">{ui.kicker}</div><h1>{pick(profile.name,profile.translations,lang,'name')}</h1>{pick(profile.handle,profile.translations,lang,'handle')&&<div className="handle">{pick(profile.handle,profile.translations,lang,'handle')}</div>}{pick(profile.bio,profile.translations,lang,'bio')&&<p className="bio">{pick(profile.bio,profile.translations,lang,'bio')}</p>}<div className="mini-values"><span>{ui.values[0]}</span><i>•</i><span>{ui.values[1]}</span><i>•</i><span>{ui.values[2]}</span></div></section>
  <section className="links" aria-label={ui.mainLinks}>{activeLinks.map((link,index)=><a className={`link ${index===0?'link-primary':''}`} href={link.url} target="_blank" rel="noreferrer" key={link.id}><span className="icon">{iconFor(link.icon)}</span><span className="link-content"><span className="link-title">{pick(link.title,link.translations,lang,'title')}</span>{pick(link.subtitle,link.translations,lang,'subtitle')&&<span className="link-sub">{pick(link.subtitle,link.translations,lang,'subtitle')}</span>}</span><span className="arrow"><ArrowUpRight size={20}/></span></a>)}</section>
  {profile.featured_url&&profile.featured_title&&<a className="featured" href={profile.featured_url} target="_blank" rel="noreferrer">{profile.featured_image_url?<img src={profile.featured_image_url} alt=""/>:<div className="featured-art"><span>✦</span></div>}<div><small>{ui.featured}</small><h2>{pick(profile.featured_title,profile.translations,lang,'title')}</h2><span className="featured-cta">{ui.now} <ArrowUpRight size={15}/></span></div></a>}
  {socials.length>0&&<div className="social-block"><div className="section-label"><span/>{ui.follow}<span/></div><div className="socials">{socials.map(link=><a className="social" href={link.url} target="_blank" rel="noreferrer" key={link.id} aria-label={link.title}>{iconFor(link.icon)}</a>)}</div></div>}
  <section className="quote"><div className="quote-line"/><p>{ui.quote}</p><small>{ui.verse}</small></section><div className="footer">{pick(profile.footer_text,profile.translations,lang,'footer')||ui.footerFallback}</div>
  {reportOpen&&<div className="report-overlay" role="dialog" aria-modal="true" aria-labelledby="report-title"><div className="report-card"><div className="report-head"><h2 id="report-title">{ui.reportTitle}</h2><button type="button" className="report-close" onClick={()=>setReportOpen(false)} aria-label={ui.cancel}><X size={19}/></button></div><textarea value={reportText} onChange={e=>setReportText(e.target.value)} placeholder={ui.reportPlaceholder} rows={5}/><div className="report-actions"><button type="button" className="btn btn-secondary" onClick={()=>setReportOpen(false)}>{ui.cancel}</button><button type="button" className="btn btn-primary" onClick={submitReport}>{ui.send}</button></div></div></div>}
 </div></main>;
}
