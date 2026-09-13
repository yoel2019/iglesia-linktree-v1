'use client';

import { useEffect } from 'react';

export default function AdminValuesVisibilityFix(){
  useEffect(()=>{
    const apply=()=>{
      const lang=(typeof window!=='undefined'?localStorage.getItem('site-language-admin'):'es')||'es';
      document.querySelectorAll<HTMLElement>('.admin-main .collapsible.is-open .collapsible-body > .field').forEach(field=>{
        field.style.setProperty('display','grid','important');
        field.style.setProperty('visibility','visible','important');
        field.style.setProperty('opacity','1','important');
        field.style.setProperty('height','auto','important');
        field.style.setProperty('max-height','none','important');
        field.style.setProperty('overflow','visible','important');
        const label=field.querySelector('label')?.textContent?.trim();
        if(label==='Valores'||label==='Values'){
          const textarea=field.querySelector<HTMLTextAreaElement>('textarea');
          if(textarea) textarea.placeholder=lang==='pt'?'Amar\nServir\nTransformar':lang==='en'?'Love\nServe\nTransform':'Amar\nServir\nTransformar';
        }
      });
    };
    apply();
    const observer=new MutationObserver(apply);
    observer.observe(document.body,{subtree:true,childList:true,attributes:true});
    window.addEventListener('storage',apply);
    return()=>{observer.disconnect();window.removeEventListener('storage',apply)};
  },[]);

  return <style jsx global>{`
    .admin-main .collapsible.is-open .collapsible-body > .field{
      display:grid!important;
      visibility:visible!important;
      opacity:1!important;
      height:auto!important;
      max-height:none!important;
      overflow:visible!important;
    }
    .admin-main .collapsible.is-open .collapsible-body > .field textarea{
      display:block!important;
      visibility:visible!important;
      opacity:1!important;
    }
  `}</style>;
}
