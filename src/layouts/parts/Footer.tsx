import { Link } from 'react-router';
import { Facebook } from 'lucide-react';

const footerLinks = [
  { label: 'Book Now', to: '/' },
  { label: 'Our Services', to: '/services' },
  { label: 'Contact', to: '/contact-us' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wide mb-4 text-primary-foreground/80"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Links
            </h3>
            <nav aria-label="Footer links" className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wide mb-4 text-primary-foreground/80"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Contact
            </h3>
            <address
              className="not-italic flex flex-col gap-1 text-sm text-primary-foreground/80"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span>Basepoint - Shoreham</span>
              <span>Little High Street</span>
              <span>Shoreham-by-Sea BN43 5EG</span>
              <a href="tel:01273473737" className="hover:text-primary-foreground transition-colors mt-1">
                T: 01273473737
              </a>
            </address>
          </div>

          {/* Social */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wide mb-4 text-primary-foreground/80"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Follow
            </h3>
            <a
              href="https://www.facebook.com/westerncarsadur/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Western Cars Adur on Facebook"
              className="hover:opacity-75 transition-opacity inline-flex"
            >
              <Facebook size={22} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p
            className="text-xs text-primary-foreground/60"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            &copy; Copyright 2026 – Western Cars Adur. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
