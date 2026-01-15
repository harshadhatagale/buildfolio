import Portfolio from "@/components/portfolio/Portfolio"
import NotFound from "../not-found/page"

async function getProject(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/${slug}`)

  if (!res.ok) return null
  const data = await res.json()
  return data?.myproject || null
}
async function getThemeById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/themes/${id}`)

  if (!res.ok) return null
  const data = await res.json()
  return data?.theme.colors || null
}
export async function generateMetadata({ params }) {
  const { portfolio } = await params

  const project = await getProject(portfolio)

  if (!project) {
    return {
      title: "Portfolio Not Found | BuildFolio",
      description: "This portfolio does not exist.",
    }
  }

  const title =
    project.metaTitle || `${project.name || "Developer"} Portfolio`

  const description =
    project.metaDescription || `View ${project.name || "this developer"}'s professional portfolio built with BuildFolio.`

  const ogImage = project.ogImage
    ? project.ogImage
    : `https://www.buildfolio.space/og?title=${encodeURIComponent(
      project.name || "Developer Portfolio"
    )}&subtitle=${encodeURIComponent(
      project.role || "Built with BuildFolio"
    )}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.buildfolio.space/${portfolio}`,
      siteName: "BuildFolio",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Page({ params, searchParams }) {
  const mode= (await searchParams).mode
  const { portfolio } = await params
  const project = await getProject(portfolio)
  const themeColors = await getThemeById(project?.theme)
  if (!project) {
    return <NotFound />
  }

  return <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href={`https://fonts.googleapis.com/css2?family=${project?.font}:wght@100;200;300;400;500;600;700;800&display=swap`}
      rel="stylesheet"
    />
    <Portfolio themeColors={themeColors || null} mode={mode} project={project} />
  </>
}
