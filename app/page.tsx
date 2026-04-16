import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import Capabilities from '@/components/Capabilities';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <BentoGrid />
      <Capabilities />
      <Footer />
    </main>
  );
}
