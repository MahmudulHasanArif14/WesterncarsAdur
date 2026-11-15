import { blog } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

const siteUrl = 'https://westerncarsadur.co.uk';
const pageUrl = `${siteUrl}/blog`;
const ogImage = `${siteUrl}/og-image.jpg`;

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

type ExternalPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  published_at?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
};

export default function BlogPage() {
  const [externalPosts, setExternalPosts] = useState<ExternalPost[] | null>(null);

  useEffect(() => {
    const apiUrl = (import.meta.env.VITE_BLOG_API_URL || 'https://content.westerncars.com').replace(/\/$/, '');
    const location = import.meta.env.VITE_BLOG_LOCATION || 'adur';
    fetch(`${apiUrl}/api/posts?location=${encodeURIComponent(location)}&page=1&limit=12&content=full`)
      .then(async (response) => {
        if (!response.ok) return null;
        const payload = await response.json() as { data?: ExternalPost[] };
        return Array.isArray(payload.data) ? payload.data : null;
      })
      .then((posts) => {
        if (posts && posts.length > 0) setExternalPosts(posts);
      })
      .catch(() => {
        // The curated local content remains visible if the central API is unavailable.
      });
  }, []);

  const posts = externalPosts
    ? externalPosts.map((post, index) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.published_at || '',
      excerpt: post.excerpt,
      body: (post.content || '').split(/\n\s*\n/).filter(Boolean).map((text, index) => ({ id: `${post.id}-${index}`, text })),
      imageSlot: blog.posts[index % blog.posts.length].imageSlot,
      imageAlt: post.image_alt || post.title,
      imageUrl: post.image_url,
    }))
    : blog.posts.map((post) => ({ ...post, imageUrl: null }));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${pageUrl}#webpage`,
    name: blog.heading,
    url: pageUrl,
    description: blog.subheading,
    isPartOf: { '@id': `${siteUrl}/#website` },
    publisher: { '@id': `${siteUrl}/#organization` },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${pageUrl}/${post.slug}#article`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `${pageUrl}/${post.slug}`,
      author: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Taxi Tips & Airport Transfer Guides | Western Cars Adur Blog</title>
        <meta
          name="description"
          content="Airport transfer guides, taxi tips and local travel advice from Western Cars Adur. Covering Gatwick, Heathrow, Stansted and taxi services across Shoreham and West Sussex."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Taxi Tips & Airport Transfer Guides | Western Cars Adur Blog" />
        <meta property="og:description" content="Airport transfer guides, taxi tips and local travel advice from Western Cars Adur — your local taxi service in Shoreham-by-Sea and West Sussex." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Taxi Tips & Airport Transfer Guides | Western Cars Adur Blog" />
        <meta name="twitter:description" content="Airport transfer guides, taxi tips and local travel advice from Western Cars Adur." />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main className="py-16">
        {/* ── Page header ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h1
            className="text-4xl font-bold text-primary mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {blog.heading}
          </h1>
          <p
            className="text-lg text-muted-foreground"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {blog.subheading}
          </p>
        </div>

        {/* ── Post list ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-border rounded-lg overflow-hidden flex flex-col"
                aria-labelledby={`post-title-${post.id}`}
              >
                {/* Card image */}
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={post.imageUrl || `/airo-assets/images/${post.imageSlot}.jpg`}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={600}
                    height={338}
                  />
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                    <Calendar size={13} />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>

                  <h2
                    id={`post-title-${post.id}`}
                    className="text-xl font-bold text-primary mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {post.title}
                  </h2>

                  <p
                    className="text-sm text-foreground leading-relaxed mb-5 flex-1"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Full article inline */}
                  <details className="group">
                    <summary
                      className="cursor-pointer text-sm font-semibold text-primary hover:opacity-80 transition-opacity list-none flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <span className="group-open:hidden">Read full article ↓</span>
                      <span className="hidden group-open:inline">Close article ↑</span>
                    </summary>
                    <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                      {post.body.map((para) => (
                        <p
                          key={para.id}
                          className="text-sm text-foreground leading-relaxed"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {para.text}
                        </p>
                      ))}
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── CTA bar ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="bg-primary rounded-lg px-8 py-10 text-center">
            <h2
              className="text-2xl font-bold text-primary-foreground mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Need a Taxi or Airport Transfer?
            </h2>
            <p
              className="text-primary-foreground/85 mb-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Western Cars Adur is available 24/7. Call us or book online in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:01273473737"
                className="inline-flex items-center justify-center px-8 py-3 rounded bg-white text-primary font-bold text-sm hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Call 01273473737
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
