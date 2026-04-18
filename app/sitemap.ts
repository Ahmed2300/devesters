import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devesters.com'

  const staticRoutes = ['', '/about', '/services', '/process'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectSlugs = ['soubul', 'naptah', 'hirewire']

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
