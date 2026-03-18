import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { SPORTS_CATEGORIES, CATEGORY_DISPLAY_NAMES, CATEGORY_ICONS } from '@/lib/categories';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'KidGear Reviews - Best Sports Training Equipment for Kids',
    template: '%s | KidGear Reviews',
  },
  description:
    'Expert reviews of the best sports training equipment for children. Find the perfect gear to help your young athlete improve their skills.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="site-logo">
              <span className="logo-icon" aria-hidden="true">&#127941;</span> KidGear Reviews
            </Link>
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
        <footer className="site-footer">
          <div className="container">
            <nav className="footer-nav">
              <Link href="/about">&#9881;&#65039; About</Link>
              <Link href="/contact">&#9993;&#65039; Contact</Link>
              <Link href="/privacy-policy">&#128274; Privacy Policy</Link>
              <Link href="/disclaimer">&#9888;&#65039; Disclaimer</Link>
            </nav>
            <p className="affiliate-disclosure">
              <strong>Affiliate Disclosure:</strong> As an Amazon Associate, I
              earn from qualifying purchases. Product prices and availability
              are accurate as of the date/time indicated and are subject to
              change. Any price and availability information displayed on
              Amazon at the time of purchase will apply.
            </p>
            <p>&copy; {new Date().getFullYear()} &#127941; KidGear Reviews</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
