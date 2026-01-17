async function getPublicPortfolios() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`)
  const data = await res.json()
  const portfolios = await data.projects
  return portfolios
}
export default async function sitemap() {
  const baseUrl = 'https://www.buildfolio.space'
  const staticPages = [
    '/home',
    '/about'
  ]

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }))

  const portfolios = await getPublicPortfolios()

  const dynamicRoutes = portfolios.map((p) => ({
    url: `${baseUrl}/${p.urlSlug}`,
    lastModified: new Date(),
  }))


  return [...staticRoutes, ...dynamicRoutes]
}