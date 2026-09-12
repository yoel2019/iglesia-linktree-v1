'use client';
import { Instagram, Facebook, Youtube, MessageCircle, Heart, CalendarDays, Globe, ArrowUpRight, MoreHorizontal, Link as LinkIcon, BookOpen, Users, Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { LinkItem, Profile, Lang } from '@/lib/types';

type Translation = { name?: string; handle?: string; bio?: string; title?: string; subtitle?: string; footer?: string };
const icons: Record<string, React.ReactNode> = { instagram:<Instagram size={22}/>, facebook:<Facebook size={22}/>, youtube:<Youtube size={22}/>, whatsapp:<MessageCircle size={22}/>, donation:<Heart size={22}/>, calendar:<CalendarDays size={22}/>, website:<Globe size={22}/>, link:<LinkIcon size={22}/>, bible:<BookOpen size={22}/>, community:<Users size={22}/>, play:<Play size={22}/> };
function iconFor(v:string){return icons[v?.toLowerCase()] ?? <LinkIcon size={22}/>;}
function pick<T>(base:T,translations:unknown,lang:Lang,key:keyof Translation):T{const t=(translations as Record<string,Translation>|null|undefined)?.[lang]?.[key];return (t as T)||base;}

export default function PublicPage({profile,links,origin}:{profile:Profile;links:LinkItem[];origin:string}){
 const [lang,setLang]=useState<Lang>('es');
 useEffect(()=>{const saved=window.localStorage.getItem('site-language') as Lang|null;if(saved&&['es','en','pt'].includes(saved))setLang(saved);},[]);
 function changeLang(value:Lang){setLang(value);window.localStorage.setItem('site-language',value);}
 function cycleLang(){changeLang(lang==='es'?'en':lang==='en'?'pt':'es');}
 const publicUrl=`${origin}/${profile.slug}`; void publicUrl;
 const accent=profile.accent_color||'#d8b36a';
 const activeLinks=links.filter(x=>x.active).sort((a,b)=>a.sort_order-b.sort_order);
 const socials=activeLinks.filter(x=>['instagram','facebook','youtube','whatsapp'].includes(x.icon?.toLowerCase())).slice(0,5);
 const ui=useMemo(()=>({kicker:lang==='en'?'A PLACE FOR EVERYONE':lang==='pt'?'UM LUGAR PARA TODOS':'UN LUGAR PARA TODOS',values:lang==='en'?['Love','Serve','Transform']:['Amar','Servir','Transformar'],follow:lang==='en'?'FOLLOW US ON SOCIAL MEDIA':lang==='pt'?'SIGA-NOS NAS REDES SOCIAIS':'SÍGUENOS EN REDES SOCIALES',featured:lang==='en'?'FEATURED':lang==='pt'?'DESTAQUE':'DESTACADO',now:lang==='en'?'View now':'Ver ahora',quote:lang==='en'?'“Everything is possible for the one who believes.”':lang==='pt'?'“Tudo é possível para aquele que crê.”':'“Todo es posible para el que cree.”',verse:lang==='en'?'Mark 9:23':lang==='pt'?'Marcos 9:23':'Marcos 9:23'}),[lang]);
 return <main className="page-bg" style={{'--accent':accent} as React.CSSProperties}><div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="public-container">
  <div className="topbar"><button type="button" className="language-circle public-language" onClick={cycleLang} title="Cambiar idioma" aria-label={`Cambiar idioma. Idioma actual: ${lang.toUpperCase()}`}>{lang.toUpperCase()}</button><button className="more" aria-label="Más opciones"><MoreHorizontal size={20}/></button></div>
  <section className="profile"><div className="profile-mark"><div className="logo">{profile.logo_url?<img src={profile.logo_url} alt={`Logo de ${pick(profile.name,profile.translations,lang,'name')}`}/>:<span>{profile.name.slice(0,2).toUpperCase()}</span>}</div><span className="verified" aria-label="Cuenta verificada">✓</span></div><div className="brand-kicker">{ui.kicker}</div><h1>{pick(profile.name,profile.translations,lang,'name')}</h1>{pick(profile.handle,profile.translations,lang,'handle')&&<div className="handle">{pick(profile.handle,profile.translations,lang,'handle')}</div>}{pick(profile.bio,profile.translations,lang,'bio')&&<p className="bio">{pick(profile.bio,profile.translations,lang,'bio')}</p>}<div className="mini-values"><span>{ui.values[0]}</span><i>•</i><span>{ui.values[1]}</span><i>•</i><span>{ui.values[2]}</span></div></section>
  <section className="links" aria-label="Enlaces principales">{activeLinks.map((link,index)=><a className={`link ${index===0?'link-primary':''}`} href={link.url} target="_blank" rel="noreferrer" key={link.id}><span className="icon">{iconFor(link.icon)}</span><span className="link-content"><span className="link-title">{pick(link.title,link.translations,lang,'title')}</span>{pick(link.subtitle,link.translations,lang,'subtitle')&&<span className="link-sub">{pick(link.subtitle,link.translations,lang,'subtitle')}</span>}</span><span className="arrow"><ArrowUpRight size={20}/></span></a>)}</section>
  {profile.featured_url&&profile.featured_title&&<a className="featured" href={profile.featured_url} target="_blank" rel="noreferrer">{profile.featured_image_url?<img src={profile.featured_image_url} alt=""/>:<div className="featured-art"><span>✦</span></div>}<div><small>{ui.featured}</small><h2>{pick(profile.featured_title,profile.translations,lang,'title')}</h2><span className="featured-cta">{ui.now} <ArrowUpRight size={15}/></span></div></a>}
  {socials.length>0&&<div className="social-block"><div className="section-label"><span/>{ui.follow}<span/></div><div className="socials">{socials.map(link=><a className="social" href={link.url} target="_blank" rel="noreferrer" key={link.id} aria-label={link.title}>{iconFor(link.icon)}</a>)}</div></div>}
  <section className="quote"><div className="quote-line"/><p>{ui.quote}</p><small>{ui.verse}</small></section><div className="footer">{pick(profile.footer_text,profile.translations,lang,'footer')||'Más que una iglesia, una familia.'}</div>
 </div></main>;
}
