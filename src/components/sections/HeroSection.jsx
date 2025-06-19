// components/HeroSection.tsx
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-background px-6 py-12">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Hi, I'm Harshad 👋
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          I'm a full-stack developer passionate about building interactive websites and mobile apps. I specialize in React, Next.js, and Tailwind CSS.
        </p>
        <div className="flex justify-center gap-4">
          <Button>Contact Me</Button>
          <Button variant="outline">View Projects</Button>
        </div>
      </div>
    </section>
  )
}
