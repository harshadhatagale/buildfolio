import { v4 as uuidv4 } from "uuid"

export const GetDefaultContent = (type) => {
  let content = {}

  switch (type) {
    case "nav":
      return {
        type: "nav",
        portfolioName: "Aarav Studio",
        links: [
          { id: `link-${uuidv4()}`, title: "Overview", link: "" },
          { id: `link-${uuidv4()}`, title: "Work", link: "" },
          { id: `link-${uuidv4()}`, title: "Process", link: "" },
          { id: `link-${uuidv4()}`, title: "Contact", link: "" },
        ],
      }

    case "hero":
      return {
        type: "hero",
        primaryHeading: "Designing products people actually enjoy using",
        secondaryHeading:
          "I’m Aarav Mehta — a product-focused engineer blending design thinking, frontend craftsmanship, and scalable systems to build meaningful digital experiences.",
        cta: {
          getInTouchLink: "mailto:hello@aaravstudio.dev",
          resumeLink: "https://example.com/aarav-resume.pdf",
        },
      }

    case "about":
      return {
        type: "about",
        avatar: "/images/profile-creative.jpg",
        heading: "A bit about my journey",
        about:
          "I started my career curious about how interfaces shape behavior. Over time, that curiosity evolved into a practice focused on building calm, intuitive, and scalable products.\n\nI’ve worked across startups and independent projects, wearing multiple hats — from wireframing ideas to shipping production-ready systems. Outside of work, I enjoy long walks, reading product essays, and simplifying complex things.",
      }

    case "projects":
      return {
        type: "projects",
        heading: "Selected Work",
        subHeading: "A few projects that represent how I think and build.",
        projects: [
          {
            title: "Flowdash",
            description:
              "A lightweight internal dashboard system designed for fast-moving teams to track metrics without noise.",
            image: "/images/code.png",
            github: "https://github.com/example/flowdash",
            live: "https://flowdash.app",
            tags: ["Next.js", "Design Systems", "PostgreSQL"],
          },
          {
            title: "Notely",
            description:
              "A distraction-free writing app focused on clarity, offline-first usage, and thoughtful UX.",
            image: "/images/code.png",
            github: "https://github.com/example/notely",
            live: "https://notely.so",
            tags: ["React", "IndexedDB", "Tailwind"],
          },
          {
            title: "Client Portal",
            description:
              "A secure portal for consultants to manage clients, documents, and conversations in one place.",
            image: "/images/code.png",
            github: "https://github.com/example/client-portal",
            live: "https://portal.example.com",
            tags: ["MERN", "Auth", "Cloud Storage"],
          },
        ],
      }

    case "skills":
      return {
        type: "skills",
        primaryHeading: "What I work with",
        secondaryHeading:
          "Tools and skills I use to turn ideas into reliable products.",
        skills: [
          "Product Design Thinking",
          "React & Next.js",
          "TypeScript",
          "Design Systems",
          "Tailwind CSS",
          "Node.js",
          "PostgreSQL",
          "UX Writing",
          "Git & Collaboration",
        ],
      }

    case "experience":
      return {
        type: "experience",
        primaryHeading: "Experience",
        experiences: [
          {
            jobTitle: "Product Engineer",
            companyName: "Nimbus Labs",
            startDate: "Feb 2024",
            endDate: "Present",
            responsibillities:
              "Leading frontend architecture for a multi-tenant SaaS platform. Collaborating closely with design and product to improve usability and performance.",
            technologies: "Next.js, TypeScript, Tailwind, PostgreSQL",
          },
          {
            jobTitle: "Frontend Consultant",
            companyName: "Independent",
            startDate: "2022",
            endDate: "2024",
            responsibillities:
              "Worked with early-stage startups to design, build, and ship MVPs with a strong focus on UX and maintainability.",
            technologies: "React, UX Research, APIs",
          },
          {
            jobTitle: "UI Engineer",
            companyName: "BrightPixel Studio",
            startDate: "2021",
            endDate: "2022",
            responsibillities:
              "Built reusable UI components and design systems used across multiple client projects.",
            technologies: "React, Storybook, CSS Architecture",
          },
        ],
      }

    case "testimonials":
      return {
        heading: "Words from collaborators",
        testimonials: [
          {
            name: "Neha Kapoor",
            role: "Product Manager",
            message:
              "Aarav brings rare clarity to both design and engineering conversations. Working with him raised our product quality significantly.",
            image: "https://randomuser.me/api/portraits/women/45.jpg",
          },
          {
            name: "Daniel Foster",
            role: "Startup Founder",
            message:
              "Thoughtful, reliable, and incredibly detail-oriented. Aarav feels like a true partner, not just a contractor.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
          },
        ],
      }

    case "education":
      return {
        heading: "Education",
        subHeading: "Foundations that shaped how I think.",
        items: [
          {
            degree: "B.Tech in Information Technology",
            institution: "National Institute of Technology",
            year: "2018 – 2022",
            description:
              "Focused on software engineering, human-computer interaction, and system design.",
            icon: "graduationCap",
          },
        ],
      }

    case "certifications":
      return {
        type: "certifications",
        heading: "Certifications",
        subHeading: "Formal learning & continuous improvement.",
        items: [
          {
            title: "Product Design Fundamentals",
            issuer: "IDEO U",
            year: "2023",
            description:
              "Hands-on training in human-centered design and problem framing.",
            link: "https://ideo.com",
            icon: "badgeCheck",
          },
          {
            title: "Advanced React Patterns",
            issuer: "Frontend Masters",
            year: "2022",
            description:
              "In-depth exploration of scalable React architecture.",
            link: "https://frontendmasters.com",
            icon: "code",
          },
        ],
      }

    case "faqs":
      return {
        type: "faqs",
        heading: "FAQs",
        subHeading: "Quick answers to common questions.",
        items: [
          {
            question: "Do you work with early-stage startups?",
            answer:
              "Yes. I enjoy working from idea to execution, especially in the early stages.",
          },
          {
            question: "What’s your primary focus?",
            answer:
              "Building usable, maintainable products that balance business goals and user needs.",
          },
        ],
      }

    case "footer":
      return {
        portfolioName: "Aarav Studio",
        description:
          "Thoughtful product engineering for modern teams.",
        links: [
          { title: "Overview", link: "/" },
          { title: "Work", link: "/work" },
          { title: "Contact", link: "/contact" },
        ],
        socials: [
          {
            platform: "GitHub",
            link: "https://github.com/example",
            icon: "github",
          },
          {
            platform: "LinkedIn",
            link: "https://linkedin.com/in/example",
            icon: "linkedin",
          },
        ],
        copyright:
          "© 2025 Aarav Studio. All rights reserved.",
      }
    case "achievements":
      return {
        type: "achievements",
        heading: "Achievements & Milestones",
        subHeading: "Highlights that reflect impact, not just participation.",
        items: [
          {
            title: "Shipped 10+ Production Products",
            issuer: "Independent & Client Work",
            year: "2022 – 2025",
            description:
              "Successfully designed and shipped over ten production-grade web products used by real users, including dashboards, internal tools, and SaaS platforms.",
            icon: "rocket",
          },
          {
            title: "Featured Product on Product Hunt",
            issuer: "Product Hunt",
            year: "2024",
            description:
              "One of my side projects was featured in the Top 5 products of the day, receiving strong community feedback and early traction.",
            icon: "star",
          },
          {
            title: "Led Frontend Architecture Revamp",
            issuer: "Nimbus Labs",
            year: "2023",
            description:
              "Redesigned the frontend architecture of a growing SaaS platform, improving performance, maintainability, and developer velocity.",
            icon: "layers",
          },
          {
            title: "Open Source Maintainer",
            issuer: "GitHub",
            year: "2022 – Present",
            description:
              "Maintainer of multiple open-source UI and productivity tools with hundreds of stars and active contributors.",
            icon: "gitBranch",
          },
          {
            title: "Invited Speaker on Product Engineering",
            issuer: "Community Meetups",
            year: "2023",
            description:
              "Spoke at multiple developer and product meetups about building scalable UI systems and design-driven engineering.",
            icon: "mic",
          },
        ],
      }
    case "services":
      return {
        type: "services",
        heading: "How I can help",
        subHeading:
          "End-to-end product support — from shaping ideas to shipping polished experiences.",
        services: [
          {
            title: "Product Design & UX",
            description:
              "Designing intuitive, calm, and user-centered interfaces with a strong focus on usability, clarity, and long-term scalability.",
            icon: "penTool",
            highlights: [
              "User flows & wireframes",
              "Design systems",
              "UX audits & improvements",
            ],
          },
          {
            title: "Frontend Engineering",
            description:
              "Building fast, accessible, and maintainable frontend applications using modern frameworks and best practices.",
            icon: "layout",
            highlights: [
              "React & Next.js",
              "TypeScript",
              "Performance optimization",
            ],
          },
          {
            title: "Design Systems",
            description:
              "Creating scalable design systems that ensure consistency across products while accelerating development speed.",
            icon: "layers",
            highlights: [
              "Reusable components",
              "Token-based theming",
              "Storybook setup",
            ],
          },
          {
            title: "MVP & Startup Support",
            description:
              "Helping early-stage teams go from idea to launch quickly with a strong product foundation.",
            icon: "rocket",
            highlights: [
              "Rapid prototyping",
              "MVP builds",
              "Product strategy",
            ],
          },
          {
            title: "Consulting & Code Reviews",
            description:
              "Providing actionable feedback on architecture, UX, and code quality to improve existing products.",
            icon: "search",
            highlights: [
              "Frontend architecture review",
              "UX & accessibility audits",
              "Team guidance",
            ],
          },
        ],
      }

    default:
      return { type: "section" }
  }
}
