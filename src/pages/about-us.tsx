import { about_us } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Phone, MapPin } from 'lucide-react';

const siteUrl = 'https://westerncarsadur.co.uk';
const pageUrl = `${siteUrl}/about-us`;
const ogImage = `${siteUrl}/og-image.jpg`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${pageUrl}#webpage`,
  name: 'About Us | Western Cars Adur',
  url: pageUrl,
  description: 'Learn about Western Cars Adur — your trusted local taxi and airport transfer service in Shoreham, Lancing, Brighton and the wider Adur area.',
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@id': `${siteUrl}/#organization` },
};

export default function AboutUsPage() {
  return (
    <>
      <Helmet>
        <title>About Western Cars Adur | Trusted Taxi Service in Shoreham &amp; Adur</title>
        <meta
          name="description"
          content="Learn about Western Cars Adur — your trusted local taxi and airport transfer service in Shoreham, Lancing, Brighton and the wider Adur area. Fully vetted drivers, 24/7."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="About Western Cars Adur | Trusted Taxi Service in Shoreham &amp; Adur" />
        <meta property="og:description" content="Your trusted local taxi and airport transfer service in the Adur area. Fully vetted drivers, 24/7 availability, fixed airport rates." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Western Cars Adur | Trusted Taxi Service in Shoreham &amp; Adur" />
        <meta name="twitter:description" content="Your trusted local taxi and airport transfer service in the Adur area. Fully vetted drivers, 24/7 availability." />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-medium text-primary mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {about_us.heading}
          </h1>
          <p
            className="text-base text-foreground leading-relaxed mb-6"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {about_us.intro}
          </p>
          <p
            className="text-base text-foreground leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {about_us.body}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone size={16} className="text-primary flex-shrink-0" />
              <a href={`tel:${about_us.phone}`} className="text-sm hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
                <span>{about_us.phone}</span>
              </a>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                {about_us.address}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
