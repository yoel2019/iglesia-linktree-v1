'use client';
import AdminPanel from '@/components/AdminPanel';
import AdminPanelSkin from '@/components/AdminPanelSkin';
import AdminValuesVisibilityFix from '@/components/AdminValuesVisibilityFix';

export default function Admin(){
  return <><AdminPanelSkin/><AdminValuesVisibilityFix/><AdminPanel/></>;
}
