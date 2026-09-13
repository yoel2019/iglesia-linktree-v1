'use client';

export default function AdminValuesVisibilityFix(){
  return <style jsx global>{`
    /* Keep the editorial Values field visible in the Content section. */
    .admin-main > .panel .collapsible-body > .field:nth-child(3):has(textarea){
      display:grid!important;
    }
  `}</style>;
}
