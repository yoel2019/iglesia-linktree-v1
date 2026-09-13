'use client';

export default function AdminResponsiveFix(){
  return <style jsx global>{`
    .admin-page,.admin-page *{box-sizing:border-box}
    .admin-main,.admin-main .panel,.admin-main .collapsible,.admin-main .collapsible-body{min-width:0}
    .admin-main input,.admin-main textarea,.admin-main select{width:100%;max-width:100%;min-width:0}
    .admin-main .grid2,.admin-main .grid2>*{min-width:0}
    .admin-main .section-title>div,.admin-main .collapsible-copy{min-width:0}
    .admin-main .collapsible-copy strong,.admin-main .collapsible-copy small{max-width:100%;overflow-wrap:anywhere}
    .admin-main .collapsible-body{overflow:visible}
    .admin-main .link-editor .collapsible-copy small{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}
    .admin-main .link-detected{display:flex;align-items:center;gap:7px;margin:-2px 0 12px;padding:8px 10px;border:1px solid rgba(255,255,255,.08);border-radius:10px;color:var(--muted,#b8c1d0);font-size:12px}
    .admin-main .link-detected small{margin-left:auto;opacity:.72;font-size:11px}
    .admin-main .link-icon-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:end}
    .admin-main .link-visibility{display:flex;align-items:center;justify-content:flex-end;gap:9px;min-height:42px;white-space:nowrap;font-size:13px}
    .admin-main .link-visibility .switch-field{width:auto!important}
    .admin-main .link-visibility .switch-field>span:empty{display:none}
    .admin-main .link-actions{display:flex;align-items:center;gap:8px;width:100%;margin-top:12px}
    .admin-main .link-actions .link-action-icon{width:40px!important;min-width:40px!important;height:40px!important;padding:0!important;display:inline-flex!important;align-items:center;justify-content:center}
    .admin-main .link-actions .link-save{margin-left:auto;min-width:112px}
    .admin-main .link-actions .link-delete{margin-left:0}
    .admin-main .link-disabled .collapsible-head{opacity:.72}
    .admin-main .link-editor .switch{width:38px!important;height:22px!important;min-width:38px!important}
    .admin-main .link-editor .switch-thumb{width:16px!important;height:16px!important}

    @media(max-width:1100px){
      .admin-page{width:100%!important;max-width:100%!important;padding:16px 18px 104px!important;overflow-x:hidden!important}
      .admin-wrap{width:100%!important;max-width:100%!important;display:block!important;margin:0!important}
      .admin-nav{position:fixed!important;z-index:100!important;left:50%!important;right:auto!important;bottom:10px!important;top:auto!important;transform:translateX(-50%)!important;width:calc(100% - 28px)!important;max-width:760px!important;height:70px!important;min-height:0!important;margin:0!important;padding:5px!important;border-radius:18px!important;overflow:hidden!important;display:flex!important;flex-direction:row!important;align-items:stretch!important;gap:0!important}
      .admin-nav:before{display:none!important}
      .admin-nav .nav-group{display:contents!important}
      .admin-nav .nav-group>span{display:none!important}
      .admin-nav .nav-group button{flex:1 1 0!important;width:auto!important;min-width:0!important;height:58px!important;min-height:58px!important;margin:0!important;padding:4px 2px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;border-radius:11px!important;font-size:10px!important;line-height:1.05!important;text-align:center!important;white-space:normal!important;overflow:hidden!important}
      .admin-nav .nav-group button:before{width:auto!important;height:20px!important;margin:0!important;display:grid!important;place-items:center!important;font-size:16px!important;line-height:1!important}
      .admin-nav .nav-group button.active{box-shadow:inset 0 3px 0 #d8b36a!important}
      .admin-head,.admin-main{width:100%!important;max-width:100%!important;min-width:0!important}
      .admin-main{margin:0!important}
      .admin-main .panel{width:100%!important;max-width:100%!important}
    }

    @media(min-width:641px) and (max-width:1100px){
      .admin-head{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:24px!important;padding:4px 4px 18px!important}
      .admin-head-actions{flex:0 0 auto!important}
      .admin-main .panel{padding:22px!important}
      .admin-main .grid2{grid-template-columns:1fr 1fr!important;gap:14px!important}
      .admin-main .form-savebar{display:flex!important;justify-content:flex-end!important;align-items:center!important;width:100%!important;margin-top:14px!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important}
      .admin-main .form-savebar .btn{display:inline-flex!important;flex:0 0 auto!important;width:auto!important;min-width:170px!important;height:42px!important;padding:0 18px!important;border-radius:10px!important}
    }

    @media(max-width:640px){
      .admin-page{padding:10px 10px 94px!important}
      .admin-wrap{display:block!important}
      .admin-head{display:block!important;padding:2px 2px 14px!important}
      .admin-head h1{font-size:25px!important}
      .admin-head-actions{width:100%!important;display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;margin-top:12px!important}
      .admin-head-actions .btn{width:100%!important;justify-content:center!important;min-width:0!important}
      .admin-main .panel{padding:14px!important;border-radius:14px!important}
      .admin-main .panel h2{font-size:20px!important;line-height:1.15!important}
      .admin-main .section-title{display:block!important;margin-bottom:14px!important;padding-bottom:14px!important}
      .admin-main .translation-status{padding:10px!important}
      .admin-main .grid2{grid-template-columns:1fr!important;gap:0!important}
      .admin-main .collapsible{width:100%!important;border-radius:12px!important}
      .admin-main .collapsible-head{min-height:52px!important;padding:9px 10px!important;gap:8px!important}
      .admin-main .collapsible-body{padding:12px!important}
      .admin-main .collapsible-badge{display:none!important}
      .admin-main .contact-field-top{align-items:flex-start!important;gap:10px!important}
      .admin-main .switch-field{width:auto!important;justify-content:flex-end!important}
      .admin-main .language-tabs{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important;width:max-content!important;max-width:100%!important}
      .admin-main .language-tabs .language-circle{flex:0 0 42px!important;width:42px!important;height:42px!important;min-width:42px!important;max-width:42px!important;min-height:42px!important;max-height:42px!important;padding:0!important;margin:0!important;aspect-ratio:1 / 1!important;border-radius:50%!important;display:grid!important;place-items:center!important}
      .admin-main .form-savebar{display:flex!important;justify-content:flex-start!important;align-items:center!important;width:100%!important;margin-top:14px!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;min-height:0!important}
      .admin-main .form-savebar .btn{display:inline-flex!important;flex:0 0 auto!important;width:auto!important;min-width:0!important;max-width:max-content!important;height:42px!important;min-height:42px!important;padding:0 18px!important;border-radius:10px!important}
      .admin-main .link-icon-row{grid-template-columns:1fr!important;gap:8px!important}
      .admin-main .link-visibility{justify-content:space-between!important;min-height:38px!important;padding:4px 0}
      .admin-main .link-actions{display:flex!important;gap:7px!important;align-items:center!important}
      .admin-main .link-actions .link-action-icon{flex:0 0 38px!important;width:38px!important;min-width:38px!important;height:38px!important}
      .admin-main .link-actions .link-save{min-width:0!important;padding:0 12px!important;height:38px!important}
      .admin-main textarea{min-height:112px!important}
      .admin-nav{width:calc(100% - 16px)!important;height:68px!important;bottom:8px!important;border-radius:18px!important}
      .admin-nav .nav-group button{height:56px!important;min-height:56px!important;font-size:8.5px!important;padding:4px 1px!important}
      .admin-nav .nav-group button:before{font-size:15px!important;height:18px!important}
    }
  `}</style>;
}
