
export const GetDefaultContent = (type) => {
    let content = {}
    switch (type) {
        case "nav":
            content = {
                type: "nav",
                portfolioName: "Harsh Tech",
                links: [
                    {
                        title: "Home",
                        link: "#home"
                    },
                    {
                        title: "About Me",
                        link: "#about"
                    },
                    {
                        title: "Skills",
                        link: "#skills"
                    }
                ]
            }
            return content
            break;
        case "hero":
            content = {
                type: "hero",
                primaryHeading: "Hi, I'm Harshad 👋",
                secondaryHeading: "I'm a full-stack developer passionate about building interactive websites and mobile apps. I specialize in React, Next.js, and Tailwind CSS.",
            }
            return content
            break
        case "about":
            content = {
                type: "about",
                avatar: "/images/code.png",
                heading: "About me",
                about: "I'm Harshad, a full-stack developer with a passion for building sleek, functional UIs and solving real-world problems with code. I love working with modern tech like React, Next.js, Tailwind, and Firebase.\n When I’m not coding, you’ll find me exploring game development, reading tech blogs, or helping others learn web dev through my YouTube channel."
            }
            return content
            break
        case "projects":
            content = {
                type: "projects",
                heading: "Projects",
                subHeading: "Some of the cool things I've built recently.",
                projects: [
                    {
                        title: "Portfolio Builder SaaS",
                        description: "A platform where users can build and deploy their own developer portfolios with drag-and-drop UI.",
                        image: "https://source.unsplash.com/600x400/?tech",
                        github: "https://github.com/harshadhatagale",
                        live: "https://portfolio.harshad.com",
                        tags: ["Next.js", "Tailwind", "MongoDB", "ShadCN"]
                    },
                    {
                        title: "E-commerce Store",
                        description: "A full-stack e-commerce web app with authentication, cart, checkout, and order management.",
                        image: "https://source.unsplash.com/600x400/?ecommerce",
                        github: "https://github.com/harshadhatagale/ecommerce",
                        live: "https://store.harshad.com",
                        tags: ["React", "Node.js", "Express", "MongoDB"]
                    },
                    {
                        title: "Chat App",
                        description: "Real-time chat app with socket.io and JWT authentication.",
                        image: "https://source.unsplash.com/600x400/?chat",
                        github: "https://github.com/harshadhatagale/chatapp",
                        live: "https://chat.harshad.com",
                        tags: ["React", "Socket.io", "Node.js"]
                    }
                ]
            }
            return content
            break
        case "skills":
            content = {
                type: "skills",
                primaryHeading: "My Skills",
                secondaryHeading: "These are the tools and technologies I work with and love to build awesome projects.",
                skills: ["Next.js", "React", "Tailwind CSS", "JavaScript", "TypeScript", "Node.js", "Firebase", "MongoDB", "Python", "Git & GitHub"]
            }
            return content
            break

        case "Services":
            content = {
                type: "services",
                heading: "My Services",
                subHeading: "Here’s what I can do for you.",
                services: [
                    {
                        title: "Web Development",
                        description: "Building responsive and modern websites using Next.js, React, and Tailwind CSS.",
                        icon: "code",
                        link: "/services/web-development"
                    },
                    {
                        title: "UI/UX Design",
                        description: "Designing user-friendly, clean, and interactive UI experiences.",
                        icon: "palette",
                        link: "/services/ui-ux-design"
                    },
                    {
                        title: "Mobile App Development",
                        description: "Creating cross-platform mobile apps with React Native.",
                        icon: "smartphone",
                        link: "/services/mobile-development"
                    }
                ]
            }
            return content
            break


        case "experience":
            content = {
                type: "experience",
                primaryHeading: "Experience",
                secondaryHeading: "",
                experiences: [
                    {
                        jobTitle: "Team Lead",
                        companyName: "College Coding Club, GCOEJ",
                        startDate: "Jan 2024",
                        endDate: "May 2024",
                        responsibillities:
                            "Led a team of 5 developers to build web apps for college events. Managed task distribution, performed code reviews, and implemented CI/CD pipelines.",
                        technologies: "React, TailwindCSS, Firebase, Git",
                    },
                    {
                        jobTitle: "Frontend Developer Intern",
                        companyName: "ABC Technologies",
                        startDate: "Jun 2023",
                        endDate: "Aug 2023",
                        responsibillities:
                            "Developed responsive UI components for client dashboards. Collaborated closely with designers and backend teams to deliver seamless user experiences.",
                        technologies: "Next.js, TypeScript, TailwindCSS, Redux",
                    },
                    {
                        jobTitle: "Open Source Contributor",
                        companyName: "GSSoC 2024",
                        startDate: "Mar 2024",
                        endDate: "May 2024",
                        responsibillities:
                            "Contributed to multiple open-source projects by fixing bugs, improving documentation, and adding new features related to frontend development.",
                        technologies: "React, Git, Markdown, GitHub Actions",
                    },
                    {
                        jobTitle: "Full Stack Developer",
                        companyName: "Freelance",
                        startDate: "Sep 2023",
                        endDate: "Dec 2023",
                        responsibillities:
                            "Built a complete e-commerce website for a local business with product listing, cart functionality, and admin dashboard.",
                        technologies: "MERN Stack, TailwindCSS, Stripe, Cloudinary",
                    },
                    {
                        jobTitle: "Technical Head",
                        companyName: "College TechFest, GCOEJ",
                        startDate: "Oct 2023",
                        endDate: "Nov 2023",
                        responsibillities:
                            "Managed all technical aspects of the college's annual tech fest, including website development, event registrations, and technical support during the fest.",
                        technologies: "React, Firebase, Node.js, Vercel",
                    },
                ]
            }
            return content
            break

        case "education":
            content = {
                heading: "Education",
                subHeading: "My academic journey so far.",
                items: [
                    {
                        degree: "Bachelor of Technology in Computer Science",
                        institution: "GCOEJ - Government College of Engineering, Jalgaon",
                        year: "2022 - 2026",
                        description: "Learning Computer Science fundamentals, data structures, algorithms, and software development practices.",
                        icon: "graduationCap"
                    },
                    {
                        degree: "HSC - Science",
                        institution: "XYZ Junior College",
                        year: "2020 - 2022",
                        description: "Physics, Chemistry, Math with Computer Science.",
                        icon: "book"
                    },
                    {
                        degree: "SSC - High School",
                        institution: "ABC High School",
                        year: "2010 - 2020",
                        description: "Completed schooling with distinction.",
                        icon: "school"
                    }
                ]
            }
            return content
            break

        case "certifications":
            content = {
                type: "certifications",
                heading: "Certifications",
                subHeading: "Here are some of the certifications I have earned.",
                items: [
                    {
                        title: "Full Stack Web Development",
                        issuer: "Coursera",
                        year: "2023",
                        description: "Completed a comprehensive full-stack web development course including React, Node.js, and MongoDB.",
                        link: "https://coursera.org/certificate/xyz123",
                        icon: "badgeCheck"
                    },
                    {
                        title: "AWS Certified Cloud Practitioner",
                        issuer: "Amazon Web Services",
                        year: "2024",
                        description: "Certification in basic AWS cloud concepts and services.",
                        link: "https://aws.amazon.com/certification/",
                        icon: "cloud"
                    },
                    {
                        title: "Data Structures & Algorithms",
                        issuer: "Coding Ninjas",
                        year: "2023",
                        description: "Mastered DSA in C++ with hands-on problem solving.",
                        link: "https://codingninjas.com/certificate/abc",
                        icon: "braces"
                    }
                ]
            }
            return content
            break
        case "faqs":
            content = {
                type: "faqs",
                heading: "Frequently Asked Questions",
                subHeading: "Got questions? I’ve got answers.",
                items: [
                    {
                        question: "Can I customize my portfolio after publishing?",
                        answer: "Yes! You can log in anytime to edit, add, or remove sections as you like."
                    },
                    {
                        question: "Is the portfolio mobile-friendly?",
                        answer: "Absolutely! All portfolios are fully responsive and look great on any device."
                    },
                    {
                        question: "Do I need to know coding?",
                        answer: "No coding needed. The builder is completely drag and drop with customizable sections."
                    },
                    {
                        question: "Is there a free plan?",
                        answer: "Yes, there is a basic free plan with limited features. You can upgrade anytime."
                    }
                ]
            }
            return content
            break
        case "achievements":
            content = {
                type: "achievements",
                heading: "Achievements",
                subHeading: "Milestones and recognitions that I'm proud of.",
                items: [
                    {
                        title: "Top Performer at Hackathon 2024",
                        issuer: "GCOEJ",
                        year: "2024",
                        description: "Won 1st place in a national-level hackathon organized at GCOEJ for building an AI-powered SaaS product.",
                        icon: "award"
                    },
                    {
                        title: "Google Cloud Career Readiness Scholarship",
                        issuer: "Google Cloud",
                        year: "2023",
                        description: "Received a scholarship for completing the Google Cloud training program.",
                        icon: "cloud"
                    },
                    {
                        title: "Open Source Contributor",
                        issuer: "GirlScript Summer of Code",
                        year: "2022",
                        description: "Contributed to multiple open-source projects including documentation, features, and bug fixes.",
                        icon: "gitBranch"
                    }
                ]
            }
        case "footer":
            content = {
                portfolioName: "Harshad's Portfolio", // Footer title or brand name
                description: "Building beautiful and functional web experiences.", // Optional tagline or description
                links: [
                    {
                        title: "Home",
                        link: "/"
                    },
                    {
                        title: "About",
                        link: "/about"
                    },
                    {
                        title: "Projects",
                        link: "/projects"
                    },
                    {
                        title: "Contact",
                        link: "/contact"
                    }
                ],

                socials: [
                    {
                        platform: "GitHub",
                        link: "https://github.com/harshadhatagale",
                        icon: "github" // For dynamic rendering with lucide-react
                    },
                    {
                        platform: "LinkedIn",
                        link: "https://linkedin.com/in/harshadhatagale",
                        icon: "linkedin"
                    },
                    {
                        platform: "Twitter",
                        link: "https://twitter.com/harshadhatagale",
                        icon: "twitter"
                    },
                    {
                        platform: "Instagram",
                        link: "https://instagram.com/harshadhatagale",
                        icon: "instagram"
                    }
                ],

                copyright:
                    "© 2025 Harshad Hatagale. All rights reserved. Built with ❤️ using Next.js & ShadCN."
            }
            return content
        default:
            content = {
                type: 'section'
            }
            return content
            break;
    }
}