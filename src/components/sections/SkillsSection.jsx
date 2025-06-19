// components/SkillsSection.tsx

import { Badge } from "@/components/ui/badge"

const skills = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Firebase",
  "MongoDB",
  "Python",
  "Git & GitHub"
]

export default function SkillsSection() {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          My Skills
        </h2>
        <p className="text-muted-foreground mb-8 text-base md:text-lg">
          These are the tools and technologies I work with and love to build awesome projects.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="text-base px-4 py-2 rounded-xl shadow-sm border-muted"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
