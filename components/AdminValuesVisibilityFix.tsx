'use client';

import { useEffect } from 'react';

export default function AdminValuesVisibilityFix(){
  useEffect(()=>{
    let frame=0;
    const apply=()=>{
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const lang=(typeof window!=='undefined'?localStorage.getItem('site-language-admin'):'es')||'es';
        document.querySelectorAll<HTMLElement>('.admin-main .collapsible.is-open .collapsible-body > .field').forEach(field=>{
          const label=field.querySelector('label')?.textContent?.trim();
          if(label==='Valores'||label==='Values'){
            const textarea=field.querySelector<HTMLTextAreaElement>('textarea');
            if(textarea){
              const placeholder=lang==='pt'?'Amar\nServir\nTransformar':lang==='en'?'Love\nServe\nTransform':'Amar\nServir\nTransformar';
              if(textarea.placeholder!==placeholder) textarea.placeholder=placeholder;
            }
          }
        });
      });
    };
    apply();
    const observer=new MutationObserver(apply);
    observer.observe(document.body,{subtree:true,childList:true});
    window.addEventListener('storage',apply);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('storage',apply)};
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
