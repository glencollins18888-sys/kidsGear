import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { SPORTS_CATEGORIES, CATEGORY_DISPLAY_NAMES, CATEGORY_ICONS } from '@/lib/categories';
import SearchBar from '@/components/SearchBar';
import DarkModeToggle from '@/components/DarkModeToggle';
import NewsletterSignup from '@/components/NewsletterSignup';
import './globals.css';

const SITE_URL = process.env.SITE_URL || 'https://kids-gear.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'KidGear Reviews - Best Sports Training Equipment for Kids',
    template: '%s | KidGear Reviews',
  },
  description:
    'Expert reviews of the best sports training equipment for children. Find the perfect gear to help your young athlete improve their skills.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'KidGear Reviews',
    title: 'KidGear Reviews - Best Sports Training Equipment for Kids',
    description:
      'Expert reviews of the best sports training equipment for children. Find the perfect gear to help your young athlete improve their skills.',
  },
  twitter: {
    card: 'summary',
    title: 'KidGear Reviews - Best Sports Training Equipment for Kids',
    description:
      'Expert reviews of the best sports training equipment for children.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||((!t)&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light')}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <header className="site-header">
          <div className="container">
            <div className="header-top">
              <Link href="/" className="site-logo">
                <span className="logo-icon" aria-hidden="true">&#127941;</span> KidGear Reviews
              </Link>
              <div className="header-actions">
                <SearchBar />
                <DarkModeToggle />
              </div>
            </div>
            <nav className="site-nav">
              {SPORTS_CATEGORIES.map((cat) => (
                <Link key={cat} href={`/category/${cat}`}>
                  <span aria-hidden="true">{CATEGORY_ICONS[cat]}</span> {CATEGORY_DISPLAY_NAMES[cat]}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <div className="container">
          <NewsletterSignup />
        </div>
        <footer className="site-footer">
          <div className="container">
            <nav className="footer-nav">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </nav>
            <p className="affiliate-disclosure">
              <strong>Affiliate Disclosure:</strong> As an Amazon Associate, I
              earn from qualifying purchases. Product prices and availability
              are accurate as of the date/time indicated and are subject to
              change. Any price and availability information displayed on
              Amazon at the time of purchase will apply.
            </p>
            <p>&copy; {new Date().getFullYear()} KidGear Reviews</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
