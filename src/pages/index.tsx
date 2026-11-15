import { home } from 'virtual:content';
import { useRef, useEffect, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { CarFront, Clock3, MapPin, Phone, ShieldCheck } from 'lucide-react';

const siteUrl = 'https://westerncarsadur.co.uk';

const heroImages = [
'/airo-assets/images/hero/video-poster.jpg',
'/airo-assets/images/fleet/slide-2.jpg',
'/airo-assets/images/hero/slide-5.jpg'];


export default function HomePage() {
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    carouselApi.on('select', onSelect);
    return () => {carouselApi.off('select', onSelect);};
  }, [carouselApi]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#organization`,
      name: 'Western Cars Adur',
      description: 'Western Cars Adur provides 24/7 taxi services and fixed-fare airport transfers across Shoreham-by-Sea, Lancing, Hove, Brighton, Worthing, Southwick, Portslade, Steyning, Henfield, Burgess Hill and the wider Adur district. We cover all major UK airports including Gatwick, Heathrow, Stansted, Luton and London City.',
      url: siteUrl,
      telephone: '01273473737',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Basepoint - Shoreham, Little High Street',
        addressLocality: 'Shoreham-by-Sea',
        postalCode: 'BN43 5EG',
        addressCountry: 'GB'
      },
      areaServed: [
        'Shoreham-by-Sea', 'Lancing', 'Southwick', 'Portslade', 'Hove',
        'Brighton', 'Worthing', 'Goring-by-Sea', 'Littlehampton', 'Angmering',
        'Arundel', 'Steyning', 'Henfield', 'Burgess Hill', 'West Sussex', 'East Sussex'
      ],
      openingHours: 'Mo-Su 00:00-24:00',
      sameAs: ['https://www.facebook.com/westerncarsadur/']
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Western Cars Adur',
      publisher: { '@id': `${siteUrl}/#organization` }
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: 'Taxi Shoreham-by-Sea | Airport Transfers | Western Cars Adur',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      datePublished: '2026-01-01',
      dateModified: '2026-09-26'
    }]

  };

  return (
    <>
      <Helmet>
        <title>Taxi Shoreham-by-Sea | Airport Transfers | Western Cars Adur</title>
        <meta
          name="description"
          content="Western Cars Adur — 24/7 taxi service in Shoreham-by-Sea, Lancing, Hove, Brighton, Worthing & West Sussex. Fixed-fare airport transfers to Gatwick, Heathrow & Stansted. Call 01273473737." />
        
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content="Taxi Shoreham-by-Sea | Airport Transfers | Western Cars Adur" />
        <meta property="og:description" content="24/7 taxi service in Shoreham, Lancing, Hove, Brighton & Worthing. Fixed-fare airport transfers to Gatwick, Heathrow & Stansted. Call 01273473737." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Taxi Shoreham-by-Sea | Airport Transfers | Western Cars Adur" />
        <meta name="twitter:description" content="24/7 taxi service in Shoreham, Lancing, Hove, Brighton & Worthing. Fixed-fare airport transfers to Gatwick, Heathrow & Stansted. Call 01273473737." />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* ── Hero Carousel ── */}
        <section aria-label="Hero">
          <div role="region" aria-roledescription="carousel" aria-label="Hero slides" className="relative w-full">
            <Carousel opts={{ loop: true }} plugins={[autoplay.current]} setApi={setCarouselApi}>
              <CarouselContent>
                {home.hero.slides.map((slide, i) =>
                <CarouselItem key={slide.id}>
                    <div className="relative w-full" style={{ minHeight: '520px' }}>
                      <img
                      src={heroImages[i] ?? '/airo-assets/images/hero/video-poster.jpg'}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : 'auto'} />
                    
                      <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'hsl(var(--overlay-dark) / 0.55)' }} />
                    
                      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 pointer-events-none">
                        <div className="max-w-2xl pointer-events-auto">
                          <p
                          className="text-white/80 text-base font-medium mb-2 uppercase tracking-wide"
                          style={{ fontFamily: 'var(--font-heading)' }}>
                          
                            {slide.subheading}
                          </p>
                          <h1
                          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
                          style={{ fontFamily: 'var(--font-heading)' }}>
                          
                            {slide.heading}
                          </h1>
                          <p
                          className="text-base md:text-lg text-white/85 mb-8 leading-relaxed"
                          style={{ fontFamily: 'var(--font-sans)' }}>
                          
                            {slide.body}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 mb-6"><a href="https://westerncars.webbooker.icabbi.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-7 py-3 rounded bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity" style={{ fontFamily: 'var(--font-heading)' }}>Book Your Taxi</a><a href="https://icab.bi/Western" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-7 py-3 rounded border border-white text-white font-semibold text-sm hover:bg-white/10 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>Download Our App</a>


















                        </div>
                          <a
                          href={`tel:${slide.phone}`}
                          className="inline-flex items-center gap-2 text-white font-bold text-lg hover:opacity-80 transition-opacity"
                          style={{ fontFamily: 'var(--font-heading)' }}>
                          
                            <Phone size={18} />
                            <span>CALL US 24/7 : </span>
                            <span>{slide.phone}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-auto">
                {home.hero.slides.map((slide, idx) =>
                <button
                  key={slide.id}
                  onClick={() => carouselApi?.scrollTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-3 h-3 rounded-full border-2 border-white transition-colors ${
                  currentSlide === idx ? 'bg-white' : 'bg-transparent'}`
                  } />

                )}
              </div>
            </Carousel>
          </div>
        </section>

        {/* ── Book / Download CTA bar ── */}
        <section className="bg-primary py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://westerncars.webbooker.icabbi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm bg-white text-primary hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Book Now
            </a>
            <a
              href="https://icab.bi/Western"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm border-2 border-white text-white hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Download
            </a>
          </div>
        </section>

        {/* ── Welcome / Main copy ── */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
              {home.welcome.heading}
            </h2>
            <p
              className="text-lg font-semibold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
              {home.welcome.subheading}
            </p>
            <a
              href="https://westerncars.webbooker.icabbi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded font-bold text-sm mb-8 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
              BOOK ONLINE NOW
            </a>
            <div className="flex flex-col gap-4">
              {home.welcome.body.map((para) =>
              <p
                key={para.id}
                className="text-base text-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}>
                
                  {para.text}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Local service highlight ── */}
        <section aria-labelledby="local-service-heading" className="relative overflow-hidden bg-slate-950 py-16 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(var(--primary)/0.28),_transparent_44%)]" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/65" style={{ fontFamily: 'var(--font-heading)' }}>
                  Your local ride, made simple
                </p>
                <h2 id="local-service-heading" className="max-w-xl text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  Comfortable journeys across Adur and beyond
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg" style={{ fontFamily: 'var(--font-sans)' }}>
                  From a quick local trip to a carefully timed airport transfer, our professional drivers are ready around the clock.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://westerncars.webbooker.icabbi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-white/90"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Book your journey
                  </a>
                  <a
                    href="tel:01273473737"
                    className="inline-flex items-center justify-center gap-2 rounded border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <Phone size={16} />
                    01273 473737
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <div className="group relative col-span-2 overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/adurtaxi.jpeg"
                    alt="Western Cars Adur taxi ready for a local journey"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    loading="lazy"
                    width={900}
                    height={520}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    Ready when you are
                  </p>
                </div>
                <div className="group overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/airo-assets/images/hero/slide-4.png"
                    alt="Western Cars vehicle for airport and long-distance travel"
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48"
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                </div>
                <div className="flex min-h-40 flex-col justify-center rounded-2xl bg-white/10 p-5 backdrop-blur-sm sm:min-h-48">
                  <CarFront className="mb-4 text-white" size={27} />
                  <p className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Local expertise</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65" style={{ fontFamily: 'var(--font-sans)' }}>Shoreham, Lancing, Brighton, Worthing and every journey in between.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Clock3, title: '24/7 availability', text: 'Day or night, including bank holidays.' },
                { icon: ShieldCheck, title: 'Trusted drivers', text: 'Professional, vetted and customer-focused.' },
                { icon: MapPin, title: 'Airport transfers', text: 'Reliable travel to all major UK airports.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                  <Icon className="mt-0.5 shrink-0 text-white" size={21} />
                  <div>
                    <h3 className="font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
                    <p className="mt-1 text-sm text-white/60" style={{ fontFamily: 'var(--font-sans)' }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Download App ── */}
        <section id="download-app" className="py-14 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl font-bold text-primary mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
              {home.app.heading}
            </h2>
            <p
              className="text-base text-foreground leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-sans)' }}>
              
              {home.app.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://apps.apple.com/gb/app/western-cars-ltd/id1460799311"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'var(--font-heading)' }}>
                
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.28.07 2.17.74 2.9.8 1.1-.21 2.16-.91 3.38-.84 1.44.1 2.52.68 3.22 1.73-2.96 1.77-2.47 5.67.5 6.76-.57 1.5-1.32 2.99-2 4.41zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.icabbi.westerncars"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'var(--font-heading)' }}>
                
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M3.18 23.76c.3.17.64.24.99.2l12.12-12.12L13.17 8.7 3.18 23.76zm17.64-10.7-2.94-1.7-3.35 3.35 3.35 3.35 2.97-1.72c.85-.49.85-1.79-.03-2.28zM2.01 1.05C1.7 1.37 1.5 1.86 1.5 2.5v19c0 .64.2 1.13.51 1.45l.08.07 10.64-10.64v-.25L2.09.98l-.08.07zm11.16 10.2 3.35-3.35-2.94-1.7L2.01 1.05l11.16 10.2z" /></svg>
                Google Play
              </a>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl font-bold text-primary mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
              {home.whyChooseUs.heading}
            </h2>
            <p
              className="text-base text-foreground leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-sans)' }}>
              
              {home.whyChooseUs.body}
            </p>
            <ul className="flex flex-col gap-3">
              {home.whyChooseUs.points.map((point) =>
              <li
                key={point.id}
                className="flex items-start gap-2 text-base text-foreground"
                style={{ fontFamily: 'var(--font-sans)' }}>
                
                  <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-primary" />
                  <span>{point.text}</span>
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* ── Areas We Cover ── */}
        <section className="py-14 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl font-bold text-primary mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
              {home.areas.heading}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {home.areas.list.map((area) =>
              <span
                key={area.id}
                className="text-sm text-foreground py-1"
                style={{ fontFamily: 'var(--font-sans)' }}>
                
                  {area.name}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl font-bold text-primary mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
              {home.about.heading}
            </h2>
            <p
              className="text-base text-foreground leading-relaxed"
              style={{ fontFamily: 'var(--font-sans)' }}>
              
              {home.about.body}
            </p>
          </div>
        </section>
      </main>
    </>);

}