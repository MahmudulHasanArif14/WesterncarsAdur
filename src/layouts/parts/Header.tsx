import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Services', to: '/services' },
  { label: 'About Us', to: '/about-us' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Blog', to: '/blog' },
  { label: 'Grow With Us', to: '/business-partners' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar — phone number */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="tel:01273473737"
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Phone size={14} />
            Call Us 24/7 : 01273473737
          </a>
          <span className="hidden md:block text-xs text-primary-foreground/70" style={{ fontFamily: 'var(--font-sans)' }}>
            Shoreham | Lancing | Hove | Brighton | Worthing | Gatwick Transfers
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 min-w-0">
              <img
                src="/airo-assets/images/logo/horizontal.jpg"
                alt="Western Cars Adur"
                className="block h-auto max-h-10 md:max-h-14 w-auto max-w-[200px] object-contain self-center"
                width={180}
                height={56}
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-5 lg:gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`
                  }
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden bg-white border-t border-border px-4 pb-4"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 text-sm font-medium border-b border-border last:border-0 transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-foreground'
                  }`
                }
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
