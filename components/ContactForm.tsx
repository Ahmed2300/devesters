'use client';

import { FormEvent } from 'react';

export default function ContactForm() {
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
      <div className="mb-8">
        <a 
          href="mailto:hello@devesters.com" 
          className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <span className="mr-2">Direct Email:</span> 
          <span className="font-medium underline decoration-white/20 underline-offset-4 pointer-events-auto">hello@devesters.com</span>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase mb-2">Your Name</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-studio-red transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-studio-red transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase mb-2">Project Type</label>
          <select 
            name="projectType"
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-studio-red transition-colors appearance-none"
          >
            <option value="SaaS Platform" className="bg-[#050509]">SaaS Platform</option>
            <option value="Mobile App" className="bg-[#050509]">Mobile App</option>
            <option value="AI Integration" className="bg-[#050509]">AI Integration</option>
            <option value="Other" className="bg-[#050509]">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase mb-2">Message</label>
          <textarea 
            name="message" 
            rows={5} 
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-studio-red transition-colors resize-none"
            placeholder="Tell us about your goals, timeline, and technical requirements..."
          />
        </div>

        <button 
          type="submit" 
          className="bg-studio-red hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center w-full sm:w-auto"
        >
          Open Email Client →
        </button>
      </form>
    </div>
  );
}
