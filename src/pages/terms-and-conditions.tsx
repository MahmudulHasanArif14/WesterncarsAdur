import { terms } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';

const siteUrl = 'https://westerncarsadur.co.uk';
const pageUrl = `${siteUrl}/terms-and-conditions`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  name: 'Terms and Conditions | Western Cars Adur',
  url: pageUrl,
  description: 'Clear booking, fare, cancellation and passenger terms for Western Cars Adur taxi and airport transfer services across Shoreham-by-Sea, Adur and West Sussex.',
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@id': `${siteUrl}/#organization` },
  inLanguage: 'en-GB'
};

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Taxi Terms &amp; Conditions in Adur | Western Cars Adur</title>
        <meta
          name="description"
          content="Read Western Cars Adur taxi terms: bookings, fares, waiting time, airport transfers, cancellations, luggage and service areas across Shoreham-by-Sea and Adur."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Taxi Terms &amp; Conditions in Adur | Western Cars Adur" />
        <meta property="og:description" content="Booking, fare, cancellation and passenger terms for Western Cars Adur taxi and airport transfer services across Shoreham-by-Sea, Adur and West Sussex." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Taxi Terms &amp; Conditions in Adur | Western Cars Adur" />
        <meta name="twitter:description" content="Booking, fare, cancellation and passenger terms for Western Cars Adur taxi and airport transfer services." />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold text-primary mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {terms.heading}
          </h1>
          <p
            className="text-base text-foreground leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {terms.intro}
          </p>
          {terms.sections.map((section) => (
            <div key={section.id}>
              <h2
                className="text-xl font-semibold text-foreground mt-8 mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {section.title}
              </h2>
              <p
                className="text-base text-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
