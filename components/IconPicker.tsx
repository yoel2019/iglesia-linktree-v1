'use client';

import { CalendarDays, Facebook, Globe, Heart, Instagram, Link as LinkIcon, Mail, MessageCircle, Phone, Play, Users, Youtube, BookOpen, Video } from 'lucide-react';

const labels:Record<string,string>={link:'Enlace',zoom:'Zoom',youtube:'YouTube',instagram:'Instagram',facebook:'Facebook',tiktok:'TikTok',spotify:'Spotify',whatsapp:'WhatsApp',mail:'Correo',phone:'Teléfono',website:'Sitio web',calendar:'Calendario',donation:'Donación',bible:'Biblia',community:'Comunidad',play:'Reproducir'};

function IconGlyph({value}:{value:string}){
 const size=24;
 switch(value){
  case 'instagram':return <Instagram size={size}/>;case 'facebook':return <Facebook size={size}/>;case 'youtube':return <Youtube size={size}/>;case 'whatsapp':return <MessageCircle size={size}/>;case 'mail':return <Mail size={size}/>;case 'phone':return <Phone size={size}/>;case 'website':return <Globe size={size}/>;case 'calendar':return <CalendarDays size={size}/>;case 'donation':return <Heart size={size}/>;case 'bible':return <BookOpen size={size}/>;case 'community':return <Users size={size}/>;case 'play':return <Play size={size}/>;case 'zoom':return <Video size={size}/>;case 'tiktok':return <span className="brand-mark">♪</span>;case 'spotify':return <span className="brand-mark">●</span>;default:return <LinkIcon size={size}/>;
 }
}

export default function IconPicker({value,onChange,ariaLabel='Seleccionar icono'}:{value:string;onChange:(value:string)=>void;ariaLabel?:string}){
 return <div className="icon-picker" role="radiogroup" aria-label={ariaLabel}>
  {Object.keys(labels).map(option=><button key={option} type="button" role="radio" aria-checked={value===option} className={`icon-picker-option ${value===option?'selected':''}`} onClick={()=>onChange(option)} title={labels[option]} aria-label={labels[option]}><span className="icon-picker-glyph"><IconGlyph value={option}/></span><span className="icon-picker-label">{labels[option]}</span></button>)}
  <style jsx>{` .icon-picker{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;width:100%}.icon-picker-option{appearance:none;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.025);color:inherit;border-radius:14px;min-width:0;min-height:72px;padding:9px 5px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:.16s ease}.icon-picker-option:hover{border-color:rgba(255,255,255,.25);transform:translateY(-1px)}.icon-picker-option.selected{border-color:var(--accent,#d8b36a);background:color-mix(in srgb,var(--accent,#d8b36a) 14%,transparent);box-shadow:0 0 0 1px color-mix(in srgb,var(--accent,#d8b36a) 35%,transparent)}.icon-picker-glyph{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:rgba(255,255,255,.06);color:var(--accent,#d8b36a)}.icon-picker-label{font-size:9px;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.brand-mark{font-size:22px;font-weight:800;line-height:1}@media(max-width:760px){.icon-picker{grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}.icon-picker-option{min-height:68px}}@media(max-width:390px){.icon-picker{grid-template-columns:repeat(3,minmax(0,1fr))}.icon-picker-option{min-height:64px}.icon-picker-label{font-size:8px}} `}</style>
 </div>;
}
