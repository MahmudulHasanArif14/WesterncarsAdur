import { services } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Car, Plane, UserCheck, CreditCard, Settings, Headphones } from 'lucide-react';

const siteUrl = 'https://westerncarsadur.co.uk';
const pageUrl = `${siteUrl}/services`;
const ogImage = `${siteUrl}/og-image.jpg`;

const servicesMeta = [
  { icon: Car },
  { icon: Plane },
  { icon: UserCheck },
  { icon: CreditCard },
  { icon: Settings },
  { icon: Headphones },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  name: 'Taxi & Airport Transfer Services in Adur | Western Cars Adur',
  url: pageUrl,
  description: 'Western Cars Adur offers local taxi rides, Gatwick and Heathrow airport transfers, executive vehicles, wheelchair-accessible cars and more across Shoreham, Lancing, Brighton and the Adur area.',
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@id': `${siteUrl}/#organization` },
};

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Taxi &amp; Airport Transfer Services in Adur | Western Cars Adur</title>
        <meta
          name="description"
          content="Western Cars Adur offers local taxis, Gatwick &amp; Heathrow airport transfers, executive cars and wheelchair-accessible vehicles across Shoreham, Lancing, Brighton and Adur. Available 24/7."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Taxi &amp; Airport Transfer Services in Adur | Western Cars Adur" />
        <meta property="og:description" content="Local taxis, Gatwick &amp; Heathrow airport transfers, executive cars and more across Shoreham, Lancing, Brighton and the Adur area. Available 24/7." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Taxi &amp; Airport Transfer Services in Adur | Western Cars Adur" />
        <meta name="twitter:description" content="Local taxis, Gatwick &amp; Heathrow airport transfers, executive cars and more across Shoreham, Lancing, Brighton and the Adur area. Available 24/7." />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-medium text-primary text-center mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Services
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.services.map((service, _airoIdx) => {
              const Icon = servicesMeta[_airoIdx].icon;

              return (
                <div key={service.title} className="flex flex-col gap-3 p-6 border border-border rounded">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h2
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {service.title}
                  </h2>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
