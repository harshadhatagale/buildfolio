import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Script from "next/script";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
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
  );
}
