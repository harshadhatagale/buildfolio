import Navbar from "@/components/landing/Navbar";
import HomePage from "@/components/pages/home/HomePage";


export const metadata = {
  metadataBase: new URL("https://www.buildfolio.space"),
  title: 'BuildFolio – Create Stunning Developer Portfolios Effortlessly',
  description:
    'BuildFolio helps developers, students, and professionals create fast, SEO-friendly, and customizable portfolio websites in minutes. Showcase your projects, skills, and experience with ease.',
  alternates: {
    canonical: 'https://www.buildfolio.space/',
  },
  keywords: [
    "portfolio builder",
    "developer portfolio",
    "resume to portfolio",
    "portfolio website",
    "BuildFolio",
    "student portfolio",
    "software developer portfolio",
  ],

  authors: [{ name: "BuildFolio Team" }],
  creator: "BuildFolio",
  openGraph: {
    title: "BuildFolio — Create Stunning Developer Portfolios",
    description: "Create modern, customizable developer portfolios in minutes using BuildFolio.",
    url: "https://www.buildfolio.space",
    siteName: "BuildFolio",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "BuildFolio Portfolio Builder",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BuildFolio — Create Stunning Developer Portfolios",
    description:
      "Build your professional developer portfolio in minutes with BuildFolio.",
    images: ["/og"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}
export default function Page() {
  return (
    <>
      <Navbar />
      <main className='min-h-screen w-full mt-16'>
        <HomePage />
      </main>
    </>
  )
}
