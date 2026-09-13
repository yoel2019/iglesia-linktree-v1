'use client';

export default function AdminValuesVisibilityFix(){
  return <style jsx global>{`
    /* Keep every editorial field in the open Content group visible. */
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
