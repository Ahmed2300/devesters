import type {Metadata} from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono, Cairo } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css'; // Global styles
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScrolling from '@/components/SmoothScrolling';
import ParticleBackgroundClient from '@/components/ParticleBackgroundClient';
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devesters.com'),
  title: {
    default: 'Devesters | Premium Engineering Studio',
    template: '%s | Devesters',
  },
  description: 'We transform ideas into scalable digital ecosystems. Expert Next.js, Flutter, and AI engineering for enterprise SaaS and cross-platform apps.',
  keywords: ['Devesters', 'Devsters', 'Devstrs', 'Devesetrs', 'Software Studio', 'Next.js Agency', 'Flutter Development', 'AI Integration', 'SaaS Architecture', 'Egypt', 'MENA Tech'],
  authors: [{ name: 'Ahmed Azam' }, { name: 'Devesters Team' }],
  creator: 'Devesters',
  icons: {
    icon: [
      { url: '/devesters_icon.png', type: 'image/png' }
    ],
    shortcut: ['/devesters_icon.png'],
    apple: [
      { url: '/devesters_icon.png', type: 'image/png' }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devesters.com',
    title: 'Devesters | Premium Engineering Studio',
    description: 'We engineer complete, modern products—from full-stack web platforms to cross-platform mobile apps.',
    siteName: 'Devesters',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Devesters Engineering Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devesters | Premium Engineering Studio',
    description: 'Architecting scalable platforms and AI integrations.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Devesters",
  "alternateName": ["Devsters", "Devstrs", "Devesetrs"],
  "image": "https://devesters.com/devesters_icon.png",
  "url": "https://devesters.com",
  "description": "Premium software engineering collective specializing in SaaS platforms, Flutter mobile apps, and AI integrations.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cairo",
    "addressCountry": "EG"
  },
  "sameAs": [
    "https://www.linkedin.com/company/113089086/",
    "https://github.com/devesters",
    "https://www.facebook.com/profile.php?id=61568971049547"
  ],
  "founder": {
    "@type": "Person",
    "name": "Ahmed Azam"
  }
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} ${cairo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LanguageProvider initialLocale={locale}>
          <ParticleBackgroundClient />
          <SmoothScrolling>
            <Navbar />
            {children}
            <Footer />
          </SmoothScrolling>
        </LanguageProvider>
      </body>
    </html>
  );
}
