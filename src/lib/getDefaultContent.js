import { v4 as uuidv4 } from "uuid"

export const GetDefaultContent = (type) => {
  let content = {}

  switch (type) {

    /* ---------------- NAV ---------------- */
    case "nav":
      return {
        type: "nav",
        portfolioName: "Creative Developer",
        links: [
          { id: `link-${uuidv4()}`, title: "Home", link: "" },
          { id: `link-${uuidv4()}`, title: "About", link: "" },
          { id: `link-${uuidv4()}`, title: "Projects", link: "" },
          { id: `link-${uuidv4()}`, title: "Contact", link: "" }
        ]
      }

    /* ---------------- HERO ---------------- */
    case "hero":
      return {
        type: "hero",
        primaryHeading: "Building Digital Experiences That Matter",
        secondaryHeading:
          "A modern full-stack developer crafting scalable web applications, intuitive interfaces, and high-performance digital products."
      }

    /* ---------------- ABOUT ---------------- */
    case "about":
      return {
        type: "about",
        avatar: "/images/code.png",
        heading: "About Me",
        about:
          "I’m a full-stack developer with a strong focus on clean architecture, performance, and user-centric design. I enjoy transforming complex problems into simple, elegant solutions using modern web technologies.\n\nBeyond coding, I actively explore emerging tools, experiment with product ideas, and contribute to developer communities."
      }

    /* ---------------- TESTIMONIALS ---------------- */
    case "testimonials":
      return {
        heading: "Client Testimonials",
        testimonials: [
          {
            name: "Ravi Kumar",
            role: "Founder, TechCorp",
            message:
              "Exceptional attention to detail and great communication throughout the project. Delivered exactly what we needed.",
            image: "https://source.unsplash.com/100x100/?person"
          },
          {
            name: "Anjali Sharma",
            role: "Product Manager, InnovateX",
            message:
              "Reliable, professional, and technically strong. A pleasure to work with.",
            image: "https://source.unsplash.com/100x100/?woman"
          },
          {
            name: "Rahul Verma",
            role: "Startup Founder",
            message:
              "Turned our idea into a polished product faster than expected. Highly recommended.",
            image: "https://source.unsplash.com/100x100/?man"
          }
        ]
      }

    /* ---------------- PROJECTS ---------------- */
    case "projects":
      return {
        type: "projects",
        heading: "Featured Projects",
        subHeading: "A selection of recent work showcasing design, performance, and scalability.",
        projects: [
          {
            title: "Portfolio Builder Platform",
            description:
              "A no-code platform enabling users to create, customize, and deploy professional portfolios with ease.",
            image: "https://source.unsplash.com/600x400/?website",
            github: "#",
            live: "#",
            tags: ["Next.js", "Tailwind", "MongoDB", "SaaS"]
          },
          {
            title: "E-commerce Web Application",
            description:
              "A full-stack commerce solution featuring authentication, payments, order management, and admin controls.",
            image: "https://source.unsplash.com/600x400/?ecommerce",
            github: "#",
            live: "#",
            tags: ["React", "Node.js", "Stripe", "MongoDB"]
          },
          {
            title: "Real-Time Chat System",
            description:
              "A secure, real-time messaging application with authentication and live updates.",
            image: "https://source.unsplash.com/600x400/?chat",
            github: "#",
            live: "#",
            tags: ["React", "Socket.io", "Node.js"]
          }
        ]
      }

    /* ---------------- SKILLS ---------------- */
    case "skills":
      return {
        type: "skills",
        primaryHeading: "Technical Skills",
        secondaryHeading:
          "Technologies and tools used to build fast, scalable, and maintainable applications.",
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "Node.js",
          "MongoDB",
          "Firebase",
          "REST APIs",
          "Git & GitHub"
        ]
      }

    /* ---------------- SERVICES ---------------- */
    case "services":
      return {
        type: "services",
        heading: "Services",
        subHeading: "Professional solutions tailored to your product needs.",
        services: [
          {
            title: "Web Application Development",
            description:
              "Custom, scalable, and high-performance web applications using modern frameworks.",
            icon: "code",
            link: "#"
          },
          {
            title: "UI/UX Engineering",
            description:
              "Clean, intuitive, and accessible interfaces focused on great user experience.",
            icon: "palette",
            link: "#"
          },
          {
            title: "Mobile App Development",
            description:
              "Cross-platform mobile apps built with performance and usability in mind.",
            icon: "smartphone",
            link: "#"
          }
        ]
      }

    /* ---------------- EXPERIENCE ---------------- */
    case "experience":
      return {
        type: "experience",
        primaryHeading: "Professional Experience",
        experiences: [
          {
            jobTitle: "Full-Stack Developer",
            companyName: "Freelance / Contract",
            startDate: "2023",
            endDate: "Present",
            responsibillities:
              "Designed and developed complete web solutions, collaborated with clients, and delivered production-ready applications.",
            technologies: "Next.js, React, Node.js, MongoDB"
          },
          {
            jobTitle: "Frontend Developer Intern",
            companyName: "Technology Startup",
            startDate: "2023",
            endDate: "2023",
            responsibillities:
              "Built reusable UI components and optimized application performance across devices.",
            technologies: "React, TypeScript, TailwindCSS"
          }
        ]
      }

    /* ---------------- EDUCATION ---------------- */
    case "education":
      return {
        heading: "Education",
        subHeading: "Academic background and foundational learning.",
        items: [
          {
            degree: "Bachelor of Technology in Computer Science",
            institution: "Engineering University",
            year: "2022 – 2026",
            description:
              "Core computer science concepts including data structures, algorithms, and software engineering.",
            icon: "graduationCap"
          }
        ]
      }

    /* ---------------- FAQ ---------------- */
    case "faqs":
      return {
        type: "faqs",
        heading: "Frequently Asked Questions",
        subHeading: "Quick answers to common questions.",
        items: [
          {
            question: "Can I customize my portfolio later?",
            answer:
              "Yes, all sections are fully editable even after publishing."
          },
          {
            question: "Is coding knowledge required?",
            answer:
              "No. The platform is designed to work without any coding."
          },
          {
            question: "Is the portfolio mobile-responsive?",
            answer:
              "Absolutely. All layouts are optimized for all screen sizes."
          }
        ]
      }

    /* ---------------- FOOTER ---------------- */
    case "footer":
      return {
        portfolioName: "Digital Portfolio",
        description:
          "Crafting clean, scalable, and impactful digital experiences.",
        links: [
          { title: "Home", link: "/" },
          { title: "Projects", link: "/projects" },
          { title: "Contact", link: "/contact" }
        ],
        socials: [
          { platform: "GitHub", link: "#", icon: "github" },
          { platform: "LinkedIn", link: "#", icon: "linkedin" },
          { platform: "Twitter", link: "#", icon: "twitter" }
        ],
        copyright:
          "© 2025 Digital Portfolio. All rights reserved."
      }

    default:
      return { type: "section" }
  }
}
