export function getSectionsToGenerate(onboarding) {
    const sections = []

    sections.push("nav", "hero", "about")

    if (onboarding.skills?.list?.length > 0 || onboarding?.skills?.tools?.length > 0) {
        sections.push("skills")
    }
    if (Array.isArray(onboarding?.experience) && onboarding?.experience.length > 0) {
        sections.push("experience")
    }
    if (onboarding.education) {
        sections.push("education")
    }
    if (Array.isArray(onboarding?.projects) && onboarding?.projects.length > 0) {
        sections.push("projects")
    }
    let finalSections = sections
    finalSections.push("footer")

    return Array.from(new Set(finalSections))
}
