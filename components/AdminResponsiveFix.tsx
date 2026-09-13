'use client';

export default function AdminResponsiveFix(){
  return <style jsx global>{`
    .admin-page,.admin-page *{box-sizing:border-box}
    .admin-main,.admin-main .panel,.admin-main .collapsible,.admin-main .collapsible-body{min-width:0}
    .admin-main input,.admin-main textarea,.admin-main select{width:100%;max-width:100%}
    .admin-main .grid2{min-width:0}
    .admin-main .grid2>*{min-width:0}
    .admin-main .section-title>div{min-width:0}
    .admin-main .collapsible-copy{min-width:0}
    .admin-main .collapsible-copy strong,.admin-main .collapsible-copy small{max-width:100%;overflow-wrap:anywhere}
    .admin-main .collapsible-body{overflow:hidden}
    .admin-main .contact-field-top{flex-wrap:wrap}
    .admin-main .link-actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(112px,1fr));gap:8px}
    .admin-main .link-actions .btn{width:100%;min-width:0}

    @media(max-width:900px){
      .admin-page{padding:12px 12px 98px!important}
      .admin-wrap{width:100%!important}
      .admin-main .panel{padding:20px!important}
      .admin-main .section-title{gap:16px!important}
      .admin-main .grid2{grid-template-columns:1fr!important}
      .admin-main .qr-panel{grid-template-columns:1fr!important;gap:18px!important}
      .admin-main .qrbox{width:min(240px,100%)!important}
    }

    @media(max-width:640px){
      .admin-page{padding:8px 8px 98px!important}
      .admin-head{padding:2px 2px 14px!important}
      .admin-head h1{font-size:25px!important}
      .admin-head-actions{width:100%!important;display:grid!important;grid-template-columns:1fr 1fr!important}
      .admin-head-actions .btn{width:100%!important;justify-content:center!important}
      .admin-main .panel{padding:14px!important;border-radius:13px!important}
      .admin-main .panel h2{font-size:19px!important}
      .admin-main .section-title{margin-bottom:14px!important;padding-bottom:14px!important}
      .admin-main .translation-status{padding:10px!important}
      .admin-main .collapsible{border-radius:12px!important}
      .admin-main .collapsible-head{min-height:54px!important;padding:9px 10px!important;gap:8px!important}
      .admin-main .collapsible-body{padding:12px!important}
      .admin-main .collapsible-badge{display:none!important}
      .admin-main .contact-field-top{align-items:flex-start!important;gap:10px!important}
      .admin-main .switch-field{width:100%!important;justify-content:space-between!important}
      .admin-main .form-savebar{justify-content:stretch!important}
      .admin-main .form-savebar .btn{width:100%!important;min-width:0!important}
      .admin-main .link-actions{grid-template-columns:1fr 1fr!important}
      .admin-main .language-tabs{width:100%!important}
      .admin-main .language-tabs .language-circle{flex:1 1 0!important}
      .admin-main textarea{min-height:112px!important}
    }
  `}</style>;
}
