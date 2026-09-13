'use client';

export default function AdminResponsiveFix(){
  return <style jsx global>{`
    .admin-page,.admin-page *{box-sizing:border-box}
    .admin-main,.admin-main .panel,.admin-main .collapsible,.admin-main .collapsible-body{min-width:0}
    .admin-main input,.admin-main textarea,.admin-main select{width:100%;max-width:100%;min-width:0}
    .admin-main .grid2{min-width:0}
    .admin-main .grid2>*{min-width:0}
    .admin-main .section-title>div{min-width:0}
    .admin-main .collapsible-copy{min-width:0}
    .admin-main .collapsible-copy strong,.admin-main .collapsible-copy small{max-width:100%;overflow-wrap:anywhere}
    .admin-main .collapsible-body{overflow:visible}
    .admin-main .contact-field-top{flex-wrap:wrap}
    .admin-main .link-actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(112px,1fr));gap:8px}
    .admin-main .link-actions .btn{width:100%;min-width:0}

    /* Desktop/tablet: never let the full-height sidebar determine the grid row height. */
    @media(min-width:901px){
      .admin-wrap{grid-template-rows:auto auto auto!important;align-items:start!important}
      .admin-nav{min-height:0!important;height:auto!important;max-height:calc(100vh - 44px)!important;overflow:auto!important;align-self:start!important}
      .admin-main{align-self:start!important}
    }

    @media(max-width:900px){
      .admin-page{width:100%!important;max-width:100%!important;padding:12px 12px 112px!important;overflow-x:hidden!important}
      .admin-wrap{width:100%!important;max-width:100%!important;display:block!important}
      .admin-head,.admin-main{width:100%!important;max-width:100%!important;min-width:0!important}
      .admin-main .panel{width:100%!important;padding:20px!important}
      .admin-main .section-title{gap:16px!important}
      .admin-main .grid2{grid-template-columns:1fr!important}
      .admin-main .qr-panel{grid-template-columns:1fr!important;gap:18px!important}
      .admin-main .qrbox{width:min(240px,100%)!important}

      /* Bottom navigation: all items share one predictable row instead of squeezing by group. */
      .admin-nav{width:calc(100% - 20px)!important;max-width:680px!important;height:72px!important;min-height:0!important;padding:5px!important;display:flex!important;flex-direction:row!important;align-items:stretch!important;gap:0!important;overflow:hidden!important}
      .admin-nav:before{display:none!important}
      .admin-nav .nav-group{display:contents!important}
      .admin-nav .nav-group>span{display:none!important}
      .admin-nav .nav-group button{flex:1 1 0!important;width:auto!important;min-width:0!important;min-height:60px!important;height:60px!important;margin:0!important;padding:5px 2px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;border-radius:10px!important;font-size:10px!important;line-height:1.05!important;text-align:center!important;white-space:normal!important;overflow:hidden!important}
      .admin-nav .nav-group button:before{width:auto!important;height:20px!important;margin:0!important;display:grid!important;place-items:center!important;font-size:16px!important;line-height:1!important}
      .admin-nav .nav-group button.active{box-shadow:inset 0 3px 0 #d8b36a!important}
    }

    @media(max-width:640px){
      .admin-page{padding:8px 8px 112px!important}
      .admin-head{padding:2px 2px 14px!important}
      .admin-head h1{font-size:25px!important}
      .admin-head-actions{width:100%!important;display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important}
      .admin-head-actions .btn{width:100%!important;justify-content:center!important;min-width:0!important}
      .admin-main .panel{padding:14px!important;border-radius:13px!important}
      .admin-main .panel h2{font-size:19px!important}
      .admin-main .section-title{margin-bottom:14px!important;padding-bottom:14px!important}
      .admin-main .translation-status{padding:10px!important}
      .admin-main .collapsible{width:100%!important;border-radius:12px!important}
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

      .admin-nav{bottom:8px!important;width:calc(100% - 12px)!important;height:70px!important;border-radius:18px!important}
      .admin-nav .nav-group button{min-height:58px!important;height:58px!important;font-size:8.5px!important;padding:4px 1px!important}
      .admin-nav .nav-group button:before{font-size:15px!important;height:19px!important}
    }
  `}</style>;
}
