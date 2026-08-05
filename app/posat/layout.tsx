import type { Metadata } from 'next';
import PosatNavbar from '@/components/posat/PosatNavbar';
import PosatFooter from '@/components/posat/PosatFooter';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Posat AI (بساط) | أداة تحويل الأفكار لمؤثرات بصرية - قائمة الانتظار',
  description: 'انضم لقائمة الانتظار لأداة بساط (Posat AI) من تطوير Devesters - أداة الذكاء الاصطناعي الأولى لتحويل النص إلى مؤثرات بصرية وتأثيرات سينمائية.',
  openGraph: {
    title: 'Posat AI (بساط) | VFX Generation by Devesters',
    description: 'أداة الذكاء الاصطناعي الأولى لتحويل الأفكار لمؤثرات بصرية وسينمائية بسيطة.',
    images: ['/posat-brand-icon.jpeg'],
  },
};

export default function PosatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#050509] text-white min-h-screen selection:bg-studio-red selection:text-white font-sans" dir="rtl">
      <Toaster position="top-center" richColors theme="dark" />
      <PosatNavbar />
      <main className="text-right">{children}</main>
      <PosatFooter />
    </div>
  );
}
