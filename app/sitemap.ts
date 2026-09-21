import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://narrowgate-red.vercel.app';
  const locales = ['en', 'it'];
  const routes = [
    '',
    '/about',
    '/events',
    '/events/anniversary-2026',
    '/get-involved',
    '/contact',
    '/praise-worship',
    '/support-mission',
    '/support-mission/education-fund',
    '/support-mission/banco-alimentare',
    '/support-mission/shelter-widows',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : route === '/events' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/events' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            it: `${baseUrl}/it${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
