'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n/dictionaries';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocaleState(newLocale);
    // Set cookie valid for 1 year
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    // Update HTML attributes immediately in the client DOM to prevent layout lag
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    // Refresh Next.js server routing to reload all server components
    router.refresh();
  };

  const toggleLocale = () => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  };

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // Keep state synchronized with cookies if changed in another session/tab
  useEffect(() => {
    const handleCookieChange = () => {
      const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
      const cookieLocale = (match ? match[1] : 'ar') as Locale;
      if (cookieLocale && cookieLocale !== locale) {
        setLocaleState(cookieLocale);
      }
    };
    handleCookieChange();
    // Check every second or on window focus
    window.addEventListener('focus', handleCookieChange);
    return () => window.removeEventListener('focus', handleCookieChange);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
