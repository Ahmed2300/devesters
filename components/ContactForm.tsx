'use client';

import { FormEvent } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default function ContactForm() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Capture the form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const clientEmail = formData.get('email') as string;
    const projectType = formData.get('projectType') as string;
    const message = formData.get('message') as string;

    // 2. Format the email Subject and Body
    const targetEmail = 'hello@devesters.com';
    const emailSubject = `Project Inquiry: ${projectType} - ${name}`;
    
    const emailBody = `
Hello Devesters Team,

Name: ${name}
Email: ${clientEmail}
Project Type: ${projectType}

Project Details:
${message}
    `.trim();

    // 3. Encode for URL safety
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);

    // 4. Trigger the native email client
    window.location.href = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col md:flex-row gap-6">
        <a 
          href="mailto:hello@devesters.com" 
          className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <span className={locale === 'ar' ? 'ml-2' : 'mr-2'}>{dict.contactPage.directEmail}</span> 
          <span className="font-medium underline decoration-white/20 underline-offset-4 pointer-events-auto">hello@devesters.com</span>
        </a>
        <a 
          href="tel:+201036178703" 
          className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <span className={locale === 'ar' ? 'ml-2' : 'mr-2'}>{dict.contactPage.mobile}</span> 
          <span className="font-medium underline decoration-white/20 underline-offset-4 pointer-events-auto">+20 103 617 8703</span>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase mb-2">{dict.contactPage.formName}</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-studio-red transition-colors"
              placeholder={dict.contactPage.placeholderName}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase mb-2">{dict.contactPage.formEmail}</label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-studio-red transition-colors"
              placeholder={dict.contactPage.placeholderEmail}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase mb-2">{dict.contactPage.formProjectType}</label>
          <select 
            name="projectType"
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-studio-red transition-colors appearance-none"
          >
            <option value="SaaS Platform" className="bg-[#050509]">{dict.contactPage.projectTypes.saas}</option>
            <option value="Mobile App" className="bg-[#050509]">{dict.contactPage.projectTypes.mobile}</option>
            <option value="AI Integration" className="bg-[#050509]">{dict.contactPage.projectTypes.ai}</option>
            <option value="Other" className="bg-[#050509]">{dict.contactPage.projectTypes.other}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase mb-2">{dict.contactPage.formMessage}</label>
          <textarea 
            name="message" 
            rows={5} 
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-studio-red transition-colors resize-none"
            placeholder={dict.contactPage.placeholderMessage}
          />
        </div>

        <button 
          type="submit" 
          className="bg-studio-red hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center w-full sm:w-auto cursor-pointer"
        >
          {dict.contactPage.submitBtn} {locale === 'ar' ? '←' : '→'}
        </button>
      </form>
    </div>
  );
}
