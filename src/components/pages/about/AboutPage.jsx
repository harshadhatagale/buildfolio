import { Separator } from "@/components/ui/separator"
import CTAButtons from "./CTAButtons"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
export default function AboutPage() {
  return (
    <div className="max-w-6xl mt-16 mx-auto px-4 py-8">

      <section className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col md:flex-row items-center gap-6">

          <Image
            src="/Logo.png"
            alt="BuildFolio Logo"
            width={192}
            height={192}
            priority
          />

          <div>
            <h1 className="text-4xl font-extrabold">About BuildFolio</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              BuildFolio helps creators & job-seekers ship beautiful,
              high-converting portfolios in minutes.
            </p>

            <CTAButtons />
          </div>
        </div>
        <Separator className="my-8" />
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Our Mission</CardTitle>
              <CardDescription>Create opportunities for builders everywhere by making portfolio creation effortless.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">We believe great work should be seen. BuildFolio helps you showcase it quickly with beautiful templates, AI assistance, and built-in sharing tools.</p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Our Values</CardTitle>
              <CardDescription>Practical, honest and community-driven.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Design-first, but developer-friendly</li>
                <li>Privacy-first: user data is yours</li>
                <li>Community-led growth and open templates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Why BuildFolio</CardTitle>
              <CardDescription>Speed, shareability, and conversions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">From one-click LinkedIn import to viral share badges — every feature is designed to get your work in front of people who matter.</p>
            </CardContent>
          </Card>
        </section>
      </section>
    </div>
  )
}
