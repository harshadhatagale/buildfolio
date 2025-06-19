// components/AboutSection.tsx
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="bg-muted py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/code.png" // Add your image in public folder
            alt="Harshad"
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            About Me
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            I'm Harshad, a full-stack developer with a passion for building sleek, functional UIs and solving real-world problems with code. I love working with modern tech like React, Next.js, Tailwind, and Firebase.
          </p>
          <p className="text-muted-foreground text-base md:text-lg">
            When I’m not coding, you’ll find me exploring game development, reading tech blogs, or helping others learn web dev through my YouTube channel.
          </p>
        </div>
      </div>
    </section>
  )
}
