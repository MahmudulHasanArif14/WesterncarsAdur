import { faq } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const siteUrl = 'https://westerncarsadur.co.uk';
const pageUrl = `${siteUrl}/faq`;
const ogImage = `${siteUrl}/og-image.jpg`;

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#webpage`,
        name: faq.heading,
        url: pageUrl,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        mainEntity: faq.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Taxi FAQs | Western Cars Adur — Shoreham-by-Sea</title>
        <meta
          name="description"
          content="Answers to common questions about booking a taxi with Western Cars Adur. Airport transfers, pricing, 24/7 availability, areas covered, payment and more."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Taxi FAQs | Western Cars Adur — Shoreham-by-Sea" />
        <meta property="og:description" content="Everything you need to know about booking a taxi with Western Cars Adur — airport transfers, pricing, areas covered and 24/7 availability." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Taxi FAQs | Western Cars Adur — Shoreham-by-Sea" />
        <meta name="twitter:description" content="Everything you need to know about booking a taxi with Western Cars Adur — airport transfers, pricing, areas covered and 24/7 availability." />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main className="py-16">
        {/* ── Page header ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h1
            className="text-4xl font-bold text-primary mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {faq.heading}
          </h1>
          <p
            className="text-lg text-muted-foreground"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {faq.subheading}
          </p>
        </div>

        {/* ── Accordion ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col divide-y divide-border border border-border rounded-lg overflow-hidden">
            {faq.faqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-muted transition-colors"
                  >
                    <span
                      className="text-base font-semibold text-foreground"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      className="px-6 py-5 bg-muted border-t border-border"
                    >
                      <p
                        className="text-base text-foreground leading-relaxed"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 text-center">
          <div className="bg-primary rounded-lg px-8 py-10">
            <h2
              className="text-2xl font-bold text-primary-foreground mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {faq.ctaHeading}
            </h2>
            <p
              className="text-primary-foreground/85 mb-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {faq.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${faq.ctaPhone}`}
                className="inline-flex items-center justify-center px-8 py-3 rounded bg-white text-primary font-bold text-sm hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Call {faq.ctaPhone}
              </a>
              <a
                href="https://westerncars.webbooker.icabbi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Book Online
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
