import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import BentoGrid from '@/components/BentoGrid';
import Capabilities from '@/components/Capabilities';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <BentoGrid />
      <Capabilities />
      <Testimonials />
    </main>
  );
}
