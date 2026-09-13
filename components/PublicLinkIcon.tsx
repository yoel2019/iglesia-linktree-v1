'use client';

import { CalendarDays, Facebook, Globe, Heart, Instagram, Link as LinkIcon, Mail, MessageCircle, Phone, Play, Users, Youtube, BookOpen, Video } from 'lucide-react';

export default function PublicLinkIcon({value,size=22}:{value:string;size?:number}){
 const v=value?.toLowerCase();
 switch(v){
  case 'instagram':return <Instagram size={size}/>;case 'facebook':return <Facebook size={size}/>;case 'youtube':return <Youtube size={size}/>;case 'whatsapp':return <MessageCircle size={size}/>;case 'mail':return <Mail size={size}/>;case 'phone':return <Phone size={size}/>;case 'website':return <Globe size={size}/>;case 'calendar':return <CalendarDays size={size}/>;case 'donation':return <Heart size={size}/>;case 'bible':return <BookOpen size={size}/>;case 'community':return <Users size={size}/>;case 'play':return <Play size={size}/>;case 'zoom':return <Video size={size}/>;case 'tiktok':return <span style={{fontSize:size*.95,fontWeight:800,lineHeight:1}}>♪</span>;case 'spotify':return <span style={{fontSize:size*.82,fontWeight:900,lineHeight:1}}>●</span>;default:return <LinkIcon size={size}/>;
 }
}
