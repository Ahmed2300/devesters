import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <section className="max-w-4xl mx-auto px-6 mb-20 md:mb-32 mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-studio-red"></span>
          <span className="text-[10px] font-bold tracking-widest text-[#a1a1aa] uppercase">Get In Touch</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Let&apos;s build something <span className="text-studio-red">extraordinary.</span>
        </h1>
        
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-12">
          Tell us about your project requirements and goals. Our engineering team will review it and get back to you within 24 hours.
        </p>

        <div className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
