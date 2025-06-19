// components/ExperienceSection.jsx

const experiences = [
  {
    company: "Freelance Projects",
    role: "Full Stack Developer",
    duration: "Jan 2023 – Present",
    description:
      "Built responsive web apps using Next.js, Firebase, and Tailwind. Delivered real client projects like dashboards and landing pages."
  },
  {
    company: "GameDev Studio (YouTube)",
    role: "Content Creator & Developer",
    duration: "2022 – Present",
    description:
      "Created dev content for 900+ subscribers. Built and shared mobile games using Unity and Java."
  },
  {
    company: "College Projects",
    role: "Developer",
    duration: "2021 – 2024",
    description:
      "Made SaaS projects like a portfolio builder, donation platform, and messaging system using MERN stack and Firebase."
  }
]

export default function ExperienceSection() {
  return (
    <section className="bg-muted py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-background rounded-xl shadow-sm p-6 border border-border"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {exp.role} @ {exp.company}
              </h3>
              <span className="text-sm text-muted-foreground">{exp.duration}</span>
              <p className="mt-3 text-muted-foreground">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
