import { privacy_policy } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';

const siteUrl = 'https://westerncarsadur.co.uk';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Western Cars Adur</title>
        <meta name="description" content="Privacy policy for Western Cars Adur." />
        <link rel="canonical" href={`${siteUrl}/privacy-policy`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-medium text-primary mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {privacy_policy.heading}
          </h1>
          <p
            className="text-base text-foreground leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {privacy_policy.intro}
          </p>
          {privacy_policy.sections.map((section) => (
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
