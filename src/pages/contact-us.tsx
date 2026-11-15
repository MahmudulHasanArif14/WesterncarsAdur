import { contact_us } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Phone, MapPin, Clock, Star } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';

const siteUrl = 'https://westerncarsadur.co.uk';
const pageUrl = `${siteUrl}/contact-us`;
const ogImage = `${siteUrl}/og-image.jpg`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${pageUrl}#webpage`,
  name: 'Contact Western Cars Adur | Book a Taxi on 01273473737',
  url: pageUrl,
  description: 'Contact Western Cars Adur. Call 01273473737 to book a taxi or airport transfer in Shoreham, Lancing, Brighton and the Adur area. Available 24/7.',
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@id': `${siteUrl}/#organization` },
};

export default function ContactUsPage() {
  return (
    <>
      <Helmet>
        <title>Contact Western Cars Adur | Book a Taxi on 01273473737</title>
        <meta
          name="description"
          content="Contact Western Cars Adur to book a taxi or airport transfer. Call us 24/7 on 01273473737 or visit us at Basepoint, Shoreham-by-Sea BN43 5EG."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Contact Western Cars Adur | Book a Taxi on 01273473737" />
        <meta property="og:description" content="Call 01273473737 to book a taxi or airport transfer in Shoreham, Lancing, Brighton and the Adur area. Available 24/7." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Western Cars Adur | Book a Taxi on 01273473737" />
        <meta name="twitter:description" content="Call 01273473737 to book a taxi or airport transfer in Shoreham, Lancing, Brighton and the Adur area. Available 24/7." />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl font-medium text-primary mb-10"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {contact_us.heading}
          </h1>

          <div className="flex flex-col gap-5 items-center mb-10">
            <p className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              {contact_us.businessName}
            </p>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary" />
              <p className="text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                {contact_us.address}
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone size={18} className="flex-shrink-0 text-primary" />
              <a href={`tel:${contact_us.phone}`} className="text-sm hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
                <span>{contact_us.phone}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={18} className="flex-shrink-0 text-primary" />
              <p className="text-sm" style={{ fontFamily: 'var(--font-sans)' }}>{contact_us.hours}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={contact_us.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <MapPin size={16} />
              Get Directions
            </a>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJo9oc7CGZdUgRuwD85mIgaH8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <Star size={16} />
              Leave Us a Google Review
            </a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <h2 className="text-2xl font-bold text-primary text-center mb-3">Send us an enquiry</h2>
          <p className="text-muted-foreground text-center mb-6">Have a question about a journey or our services? We will get back to you.</p>
          <EnquiryForm />
        </div>

        {/* ── Google Map ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="w-full rounded overflow-hidden border border-border" style={{ height: '400px' }}>
            <iframe
              title="Western Cars Adur location map"
              src="https://maps.google.com/maps?q=Basepoint+Shoreham+Little+High+Street+Shoreham-by-Sea+BN43+5EG&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </main>
    </>
  );
}
