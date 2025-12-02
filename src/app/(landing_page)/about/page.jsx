'use client'

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";


const TeamMember = ({ name, role, bio, img, links = {} }) => (
  <Card className="flex flex-col sm:flex-row items-center gap-4 p-4">
    <Avatar className="w-20 h-20">
      {img ? <AvatarImage src={img} alt={name} /> : <AvatarFallback>{name.split(" ")[0][0]}</AvatarFallback>}
    </Avatar>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold truncate">{name}</h3>
        <Badge className="ml-2">{role}</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground truncate">{bio}</p>
    </div>

    <div className="flex items-center gap-2">
      {links.linkedin && (
        <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label={`${name} on LinkedIn`}>
          <Linkedin className="w-5 h-5" />
        </a>
      )}
      {links.github && (
        <a href={links.github} target="_blank" rel="noreferrer" aria-label={`${name} on GitHub`}>
          <Github className="w-5 h-5" />
        </a>
      )}
      {links.email && (
        <a href={`mailto:${links.email}`} aria-label={`Email ${name}`}>
          <Mail className="w-5 h-5" />
        </a>
      )}
    </div>
  </Card>
);

export default function AboutPage() {
  const router= useRouter()
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">About BuildFolio</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          BuildFolio helps creators & job-seekers ship beautiful, high-converting portfolios in minutes — using
automated templates, AI and share-first growth loops.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="secondary" onClick={()=> router.push("/sign-in")} className="px-6">Get Started</Button>
          <Button variant="ghost" onClick={()=> router.push("/login")} className="px-6">See Templates</Button>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Mission & Values */}
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

      <Separator className="my-8" />

      {/* Team */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold">Meet the Team</h2>
        <p className="mt-2 text-sm text-muted-foreground">Small team, big dreams. Built by engineers and designers who shipped products users love.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TeamMember
            name="Harshad Hatagale"
            role="Founder & Engineer"
            bio="Building BuildFolio and obsessed with product-market fit and growth loops."
            img={null}
            links={{ linkedin: "https://linkedin.com", github: "https://github.com" }}
          />

          {/* <TeamMember
            name="Design Lead"
            role="Product Designer"
            bio="Design systems, templates, and delightful UX."
            img={null}
            links={{ linkedin: "https://linkedin.com" }}
          />

          <TeamMember
            name="Growth Lead"
            role="Growth & Marketing"
            bio="Runs community growth and launches."
            img={null}
            links={{ linkedin: "https://linkedin.com" }}
          />

          <TeamMember
            name="Support"
            role="Customer Support"
            bio="Helps users ship their portfolios quickly."
            img={null}
            links={{ email: "support@buildfolio.app" }}
          /> */}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Milestones
      </h2>
        <p className="mt-2 text-sm text-muted-foreground">Early wins that show our momentum.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold">150+</div>
            <div className="text-sm text-muted-foreground">Early users testing BuildFolio</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-3xl font-bold">40+</div>
            <div className="text-sm text-muted-foreground">Portfolios created</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Templates shipped so far</div>
          </Card>
        </div>

        <div className="mt-8">
          <Button className="mx-auto">Join our early access</Button>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Footer / Contact */}
      <footer className="max-w-4xl mx-auto text-center text-sm text-muted-foreground py-8">
        <div>Questions? Email us at <a href="mailto:hello@buildfolio.app" className="underline">hello@buildfolio.app</a></div>
        <p className="mt-2">© {new Date().getFullYear()} BuildFolio — Built with ❤️</p>
      </footer>
    </div>
  );
}
