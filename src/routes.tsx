import { RouteObject } from 'react-router';
import { lazy } from 'react';
import HomePage from './pages/index';
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

const AboutPage = lazy(() => import('./pages/about-us'));
const ServicesPage = lazy(() => import('./pages/services'));
const ContactPage = lazy(() => import('./pages/contact-us'));
const PrivacyPage = lazy(() => import('./pages/privacy-policy'));
const TermsPage = lazy(() => import('./pages/terms-and-conditions'));
const FaqPage = lazy(() => import('./pages/faq'));
const BlogPage = lazy(() => import('./pages/blog'));
const BusinessPartnersPage = lazy(() => import('./pages/business-partners'));

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/about-us', element: <AboutPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/contact-us', element: <ContactPage /> },
  { path: '/faq', element: <FaqPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/business-partners', element: <BusinessPartnersPage /> },
  { path: '/privacy-policy', element: <PrivacyPage /> },
  { path: '/terms-and-conditions', element: <TermsPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export type Path = '/' | '/about-us' | '/services' | '/contact-us' | '/faq' | '/blog' | '/business-partners' | '/privacy-policy' | '/terms-and-conditions';
export type Params = Record<string, string | undefined>;
