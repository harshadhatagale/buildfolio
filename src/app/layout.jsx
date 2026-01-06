import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Script from "next/script";
import { Outfit, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.buildfolio.space"),

  title: {
    default: "BuildFolio — Create Stunning Developer Portfolios",
    template: "%s | BuildFolio",
  },

  description:"BuildFolio helps developers create modern, customizable portfolios in minutes. No design skills needed. Perfect for jobs, freelancing, and personal branding.",

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
    description:"Create modern, customizable developer portfolios in minutes using BuildFolio.",
    url: "https://www.buildfolio.space",
    siteName: "BuildFolio",
    images: [
      {
        url: "/og", // 👈 place in /public
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

  alternates: {
    canonical: "https://www.buildfolio.space",
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en"
        suppressHydrationWarning
      >
        <head>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-L5CNEEQRSV"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L5CNEEQRSV');
          `}
          </Script>
        </head>
        <body
          className={`${outfit.className} min-h-screen bg-background`}
        >
          <ThemeProvider>
            <NextTopLoader
              color="#2b7fff"
              initialPosition={0.08}
              crawlSpeed={400}
              height={4}
              crawl={true}
              easing="ease"
              showSpinner={false}
              speed={100}
              zIndex={1600}
              showAtBottom={false}
            />
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
