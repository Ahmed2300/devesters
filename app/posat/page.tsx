import PosatHero from '@/components/posat/PosatHero';
import PosatBeforeAfter from '@/components/posat/PosatBeforeAfter';
import PosatFeatures from '@/components/posat/PosatFeatures';
import AgencyBanner from '@/components/posat/AgencyBanner';

export default function PosatPage() {
  return (
    <div className="relative overflow-hidden bg-[#050509]">
      {/* Background Radial Glow matching Devesters main site */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-studio-red/15 via-transparent to-transparent pointer-events-none -z-10" />

      <PosatHero />
      <PosatBeforeAfter />
      <PosatFeatures />
      <AgencyBanner />
    </div>
  );
}
