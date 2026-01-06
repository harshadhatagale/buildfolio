import Portfolio from "@/components/portfolio/Portfolio"

async function getProject(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) return null
  const data = await res.json()
  return data?.myproject || null
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.portfolio)

  if (!project) {
    return {
      title: "Portfolio Not Found | BuildFolio",
      description: "This portfolio does not exist.",
    }
  }

  const title = project.metaTitle ||`${project.name || "Developer"} Portfolio`

  const description =project.metaDescription ||`View ${project.name || "this developer"}'s professional portfolio built with BuildFolio.`

  const ogImage = project.ogImage? project.ogImage: `https://www.buildfolio.space/og?title=${encodeURIComponent(project.name || "Developer Portfolio")}&subtitle=${encodeURIComponent( project.role || "Built with BuildFolio")}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.buildfolio.space/${params.portfolio}`,
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
    alternates: {
      canonical: `https://www.buildfolio.space/${params.portfolio}`,
    },
  }
}

export default async function Page({ params }) {
  const project = await getProject(params.portfolio)

  if (!project) {
    return null // or <NotFound />
  }

  return <Portfolio project={project} />
}
