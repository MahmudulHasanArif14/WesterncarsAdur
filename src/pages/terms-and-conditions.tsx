import { terms } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';

const siteUrl = 'https://westerncarsadur.co.uk';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms &amp; Conditions | Western Cars Adur</title>
        <meta name="description" content="Terms and conditions for Western Cars Adur private hire taxi services." />
        <link rel="canonical" href={`${siteUrl}/terms-and-conditions`} />
        <meta name="robots" content="noindex" />
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
