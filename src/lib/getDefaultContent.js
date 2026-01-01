import { v4 as uuidv4 } from "uuid"

export const GetDefaultContent = (type) => {
  switch (type) {

    case "nav":
      return {
        type: "nav",
        portfolioName: "Your Portfolio",
        links: [
          { id: `link-${uuidv4()}`, title: "Home", link: "" },
          { id: `link-${uuidv4()}`, title: "About", link: "" },
          { id: `link-${uuidv4()}`, title: "Projects", link: "" },
          { id: `link-${uuidv4()}`, title: "Contact", link: "" },
        ],
      }

    case "hero":
      return {
        type: "hero",
        primaryHeading: "Hi, I'm a Full-Stack Developer 👋",
        secondaryHeading:
          "I design and build modern, scalable web applications with a focus on performance, usability, and clean architecture.",
      }

    case "about":
      return {
        type: "about",
        avatar: "/images/avatar-placeholder.png",
        heading: "About Me",
        about:
          "I’m a software developer passionate about building high-quality digital products. I enjoy working with modern technologies, solving real-world problems, and continuously learning to improve my craft.",
      }

    case "projects":
      return {
        type: "projects",
        heading: "Projects",
        subHeading: "A selection of projects showcasing my work and experience.",
        projects: [
          {
            title: "Portfolio Builder Platform",
            description:
              "A web platform that helps users create and publish professional portfolios with customizable layouts.",
            image: "https://source.unsplash.com/600x400/?technology",
            github: "",
            live: "",
            tags: ["Next.js", "Tailwind CSS", "MongoDB"],
          },
          {
            title: "E-Commerce Application",
            description:
              "A full-stack e-commerce application with authentication, payments, and order management.",
            image: "https://source.unsplash.com/600x400/?ecommerce",
            github: "",
            live: "",
            tags: ["React", "Node.js", "Stripe"],
          },
        ],
      }

    case "skills":
      return {
        type: "skills",
        primaryHeading: "Skills & Tools",
        secondaryHeading:
          "Technologies and tools I use to build reliable and scalable applications.",
        skills: [
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Tailwind CSS",
          "Node.js",
          "MongoDB",
          "Git",
        ],
      }

    case "services":
      return {
        type: "services",
        heading: "Services",
        subHeading: "How I can help you bring your ideas to life.",
        services: [
          {
            title: "Web Development",
            description:
              "Building fast, responsive, and scalable web applications.",
            icon: "code",
            link: "",
          },
          {
            title: "UI / UX Design",
            description:
              "Designing clean and intuitive user interfaces.",
            icon: "palette",
            link: "",
          },
          {
            title: "Consulting",
            description:
              "Providing technical guidance and architecture planning.",
            icon: "layout",
            link: "",
          },
        ],
      }

    case "experience":
      return {
        type: "experience",
        primaryHeading: "Experience",
        experiences: [
          {
            jobTitle: "Software Developer",
            companyName: "Tech Company",
            startDate: "2023",
            endDate: "Present",
            responsibillities:
              "Worked on building and maintaining scalable web applications, collaborating with cross-functional teams.",
            technologies: "React, Next.js, Node.js",
          },
        ],
      }

    case "education":
      return {
        type: "education",
        heading: "Education",
        subHeading: "Academic background and learning journey.",
        items: [
          {
            degree: "Bachelor’s Degree in Computer Science",
            institution: "University Name",
            year: "2020 – 2024",
            description:
              "Focused on software engineering fundamentals, algorithms, and system design.",
            icon: "graduationCap",
          },
        ],
      }

    case "certifications":
      return {
        type: "certifications",
        heading: "Certifications",
        subHeading: "Professional certifications and achievements.",
        items: [
          {
            title: "Full-Stack Web Development",
            issuer: "Online Learning Platform",
            year: "2023",
            description:
              "Completed a comprehensive full-stack development program.",
            link: "",
            icon: "badgeCheck",
          },
        ],
      }

    case "testimonials":
      return {
        type: "testimonials",
        heading: "Testimonials",
        testimonials: [
          {
            name: "Client Name",
            role: "Founder, Startup",
            message:
              "Great experience working together. Professional, reliable, and skilled.",
            image: "",
          },
        ],
      }

    case "faqs":
      return {
        type: "faqs",
        heading: "Frequently Asked Questions",
        subHeading: "Answers to common questions.",
        items: [
          {
            question: "Can I update my portfolio later?",
            answer:
              "Yes, you can edit and update your portfolio anytime after publishing.",
          },
          {
            question: "Is the portfolio responsive?",
            answer:
              "Yes, all portfolios are optimized for mobile, tablet, and desktop.",
          },
        ],
      }

    case "footer":
      return {
        portfolioName: "Your Portfolio",
        description:
          "A professional portfolio showcasing skills, projects, and experience.",
        links: [
          { title: "Home", link: "/" },
          { title: "About", link: "/" },
          { title: "Projects", link: "/" },
          { title: "Contact", link: "/" },
        ],
        socials: [
          { platform: "GitHub", link: "", icon: "github" },
          { platform: "LinkedIn", link: "", icon: "linkedin" },
        ],
        copyright:
          `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
      }

    default:
      return { type: "section" }
  }
}
