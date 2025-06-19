// components/ProjectsSection.jsx
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Portfolio Builder SaaS",
    description: "A drag-and-drop portfolio builder using Next.js and Firebase. Allows users to customize layouts and export code.",
    tech: ["Next.js", "Tailwind CSS", "Firebase"],
    live: "#",
    github: "#"
  },
  {
    title: "Donation Platform",
    description: "A web portal where users can donate items and people in need can claim them. Built with MERN stack.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    live: "#",
    github: "#"
  },
  {
    title: "Messaging App",
    description: "Instagram-style private messaging system with real-time chat and user authentication.",
    tech: ["React", "Firebase", "Tailwind"],
    live: "#",
    github: "#"
  }
]

export default function ProjectsSection() {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Projects
        </h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-muted p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-background text-foreground px-2 py-1 rounded text-xs border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">Live</Button>
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline">Code</Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
