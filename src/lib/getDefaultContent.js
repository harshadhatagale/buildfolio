const SectionType = [
    "nav",
    "hero",
    "about",
    "skills",
    "experience",
    "section",
    "testimonials",
    "footer"
]
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
        case "skills":
            content = {
                type: "skills",
                primaryHeading: "My Skills",
                secondaryHeading: "These are the tools and technologies I work with and love to build awesome projects.",
                skills: ["Next.js", "React", "Tailwind CSS", "JavaScript", "TypeScript", "Node.js", "Firebase", "MongoDB", "Python", "Git & GitHub"]
            }
            return content
            break
        case "experience":
            content={
                type: "experience",
                primaryHeading:"Experience",
                secondaryHeading:"",
                experiences:[
                    {
                        jobTitle:" Frontend Developer, Software Intern, Team Lead",
                        companyName:"e.g., Google, ABC Technologies, College Coding Club",
                        startDate:"Jan 2024",
                        endDate:"May 2024",
                        responsibillities:"List your core tasks, tech stack used, etc.",
                        technologies:"React, TailwindCSS, Firebase, Git"
                    }
                ]
            }
            return content
            break
        default:
            content = {
                type: 'section'
            }
            return content
            break;
    }
}