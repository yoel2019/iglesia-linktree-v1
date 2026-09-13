'use client';
import AdminPanel from '@/components/AdminPanel';
import AdminPanelSkin from '@/components/AdminPanelSkin';
import AdminValuesVisibilityFix from '@/components/AdminValuesVisibilityFix';
import AdminResponsiveFix from '@/components/AdminResponsiveFix';

export default function Admin(){
  return <main data-admin-layout="responsive"><AdminPanelSkin/><AdminValuesVisibilityFix/><AdminResponsiveFix/><AdminPanel/></main>;
}
