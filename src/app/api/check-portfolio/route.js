import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ 
        score: -1, 
        improvements: ["Invalid URL provided"],
        categories: {}
      });
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);

    const categories = {
      basicInfo: { score: 0, maxScore: 20, checks: [] },
      projects: { score: 0, maxScore: 20, checks: [] },
      socialLinks: { score: 0, maxScore: 10, checks: [] },
      seo: { score: 0, maxScore: 20, checks: [] },
      userExperience: { score: 0, maxScore: 20, checks: [] },
      technical: { score: 0, maxScore: 10, checks: [] }
    };

    let totalScore = 0;
    let allImprovements = [];

    // === Basic Info (20) ===
    const h1Count = $("h1").length;
    if (h1Count === 1) {
      categories.basicInfo.score += 5;
      categories.basicInfo.checks.push("✓ Single H1 tag present");
    } else if (h1Count > 1) {
      categories.basicInfo.checks.push("Multiple H1 tags detected - consider using only one");
    } else {
      allImprovements.push("Add a strong headline or name (use <h1>)");
    }

    const imgCount = $("img").length;
    if (imgCount >= 1) {
      categories.basicInfo.score += 5;
      categories.basicInfo.checks.push(`✓ ${imgCount} image(s) found`);
    } else {
      allImprovements.push("Add a profile image or avatar");
    }

    const aboutSection = $("*").filter((i, el) => {
      const text = $(el).text().toLowerCase();
      return text.includes('about') && text.length < 500;
    });
    if (aboutSection.length) {
      categories.basicInfo.score += 5;
      categories.basicInfo.checks.push("✓ About section found");
    } else {
      allImprovements.push("Add an About section to describe yourself");
    }

    const skillsSection = $("*").filter((i, el) => {
      const text = $(el).text().toLowerCase();
      return text.includes('skill') && text.length < 500;
    });
    if (skillsSection.length) {
      categories.basicInfo.score += 5;
      categories.basicInfo.checks.push("✓ Skills section found");
    } else {
      allImprovements.push("Add a Skills section to show your stack");
    }

    // === Projects (20) ===
    const projectsSection = $("*").filter((i, el) => {
      const text = $(el).text().toLowerCase();
      return text.includes('project') && text.length < 500;
    });
    if (projectsSection.length) {
      categories.projects.score += 5;
      categories.projects.checks.push("✓ Projects section found");
    } else {
      allImprovements.push("Add a Projects section showcasing your work");
    }

    const projectElements = $("[class*='project'], [id*='project'], .project, .project-card, .portfolio-item").length;
    if (projectElements >= 2) {
      categories.projects.score += 5;
      categories.projects.checks.push(`✓ ${projectElements} project items found`);
    } else {
      allImprovements.push("Add at least 2 detailed project cards");
    }

    const githubLinks = $("a[href*='github']").length;
    if (githubLinks >= 1) {
      categories.projects.score += 5;
      categories.projects.checks.push(`✓ ${githubLinks} GitHub link(s) found`);
    } else {
      allImprovements.push("Include GitHub links for your projects");
    }

    const liveLinks = $("a").filter((i, el) => {
      const text = $(el).text().toLowerCase();
      return text.includes('live') || text.includes('demo') || text.includes('visit');
    }).length;
    if (liveLinks >= 1) {
      categories.projects.score += 5;
      categories.projects.checks.push("✓ Live demo links found");
    } else {
      allImprovements.push("Add Live Demo links to your projects");
    }

    // === Social Links (10) ===
    const linkedinLinks = $("a[href*='linkedin']").length;
    if (linkedinLinks >= 1) {
      categories.socialLinks.score += 3;
      categories.socialLinks.checks.push("✓ LinkedIn profile link found");
    } else {
      allImprovements.push("Add your LinkedIn profile link");
    }

    const githubProfileLinks = $("a[href*='github.com'][href*='/']").not($("a[href*='github.com/']").filter((i, el) => {
      // Filter out project links, look for profile links
      const href = $(el).attr('href') || '';
      return href.split('/').filter(part => part.length > 0).length <= 4;
    })).length;
    
    if (githubProfileLinks >= 1) {
      categories.socialLinks.score += 3;
      categories.socialLinks.checks.push("✓ GitHub profile link found");
    } else {
      allImprovements.push("Add your GitHub profile link");
    }

    const otherSocialLinks = $("a[href*='twitter'], a[href*='x.com'], a[href*='instagram'], a[href*='dribbble'], a[href*='behance']").length;
    if (otherSocialLinks >= 1) {
      categories.socialLinks.score += 2;
      categories.socialLinks.checks.push(`✓ ${otherSocialLinks} additional social link(s) found`);
    } else {
      categories.socialLinks.checks.push("Consider adding more social profiles (Twitter, Instagram, etc.)");
    }

    // === SEO (20) ===
    const title = $("title").text().trim();
    if (title.length > 10 && title.length < 60) {
      categories.seo.score += 5;
      categories.seo.checks.push("✓ Good title tag length");
    } else if (title.length > 0) {
      categories.seo.checks.push("Title tag should be between 10-60 characters");
    } else {
      allImprovements.push("Add a proper <title> tag");
    }

    const metaDescription = $("meta[name='description']").attr("content") || "";
    if (metaDescription.length > 50 && metaDescription.length < 160) {
      categories.seo.score += 5;
      categories.seo.checks.push("✓ Good meta description length");
    } else if (metaDescription.length > 0) {
      categories.seo.checks.push("Meta description should be 50-160 characters");
    } else {
      allImprovements.push("Add a meta description for SEO");
    }

    const imagesWithAlt = $("img[alt]").length;
    const totalImages = $("img").length;
    if (imagesWithAlt >= 1) {
      categories.seo.score += 5;
      categories.seo.checks.push(`✓ ${imagesWithAlt}/${totalImages} images have ALT tags`);
    } else {
      allImprovements.push("Add ALT tags to your images");
    }

    const headings = $("h1, h2, h3").length;
    if (headings >= 3) {
      categories.seo.score += 5;
      categories.seo.checks.push(`✓ Good heading structure with ${headings} headings`);
    } else {
      allImprovements.push("Use proper headings (H1-H3) for structure");
    }

    // === User Experience (20) ===
    const resumeLinks = $("a").filter((i, el) => {
      const text = $(el).text().toLowerCase();
      const href = $(el).attr('href') || '';
      return text.includes('resume') || text.includes('cv') || href.includes('resume') || href.includes('cv');
    }).length;
    if (resumeLinks >= 1) {
      categories.userExperience.score += 5;
      categories.userExperience.checks.push("✓ Resume/CV link found");
    } else {
      allImprovements.push("Add a downloadable resume link");
    }

    const contactForm = $("form, [class*='contact'], [id*='contact']").length;
    if (contactForm >= 1) {
      categories.userExperience.score += 5;
      categories.userExperience.checks.push("✓ Contact form/section found");
    } else {
      allImprovements.push("Add a contact form or clear contact information");
    }

    // Check for custom domain
    const isCustomDomain = !url.match(/\.(vercel\.app|netlify\.app|github\.io|gitlab\.io)/);
    if (isCustomDomain) {
      categories.userExperience.score += 5;
      categories.userExperience.checks.push("✓ Custom domain detected");
    } else {
      allImprovements.push("Consider using a custom domain for professionalism");
    }

    // Check for interactive elements
    const hasInteractivity = $("button, [class*='toggle'], [class*='theme'], [class*='mode']").length > 0;
    if (hasInteractivity) {
      categories.userExperience.score += 5;
      categories.userExperience.checks.push("✓ Interactive elements detected");
    } else {
      categories.userExperience.checks.push("Consider adding interactive elements (theme toggle, animations)");
    }

    // === Technical (10) ===
    // Check for viewport meta tag
    const viewportMeta = $("meta[name='viewport']").length;
    if (viewportMeta) {
      categories.technical.score += 3;
      categories.technical.checks.push("✓ Viewport meta tag present");
    } else {
      allImprovements.push("Add viewport meta tag for mobile responsiveness");
    }

    // Check for favicon
    const favicon = $("link[rel*='icon']").length;
    if (favicon) {
      categories.technical.score += 3;
      categories.technical.checks.push("✓ Favicon detected");
    } else {
      allImprovements.push("Add a favicon for better branding");
    }

    // Check for semantic HTML
    const semanticElements = $("header, footer, main, section, article, nav").length;
    if (semanticElements >= 3) {
      categories.technical.score += 4;
      categories.technical.checks.push(`✓ Good semantic HTML with ${semanticElements} elements`);
    } else {
      categories.technical.checks.push("Use more semantic HTML elements (header, footer, section, etc.)");
    }

    // Calculate total score
    Object.values(categories).forEach(category => {
      totalScore += category.score;
    });

    // Calculate percentage score
    const maxTotalScore = Object.values(categories).reduce((sum, cat) => sum + cat.maxScore, 0);
    const percentageScore = Math.round((totalScore / maxTotalScore) * 100);

    // Get grade
    const getGrade = (score) => {
      if (score >= 90) return "A+";
      if (score >= 80) return "A";
      if (score >= 70) return "B";
      if (score >= 60) return "C";
      if (score >= 50) return "D";
      return "F";
    };

    return NextResponse.json({
      score: totalScore,
      maxScore: maxTotalScore,
      percentage: percentageScore,
      grade: getGrade(percentageScore),
      improvements: allImprovements,
      categories: categories,
      summary: {
        totalChecks: Object.values(categories).reduce((sum, cat) => sum + cat.checks.length, 0),
        passedChecks: Object.values(categories).reduce((sum, cat) => sum + cat.checks.filter(check => check.startsWith('✓')).length, 0)
      }
    });

  } catch (err) {
    console.error("Portfolio analysis error:", err);
    return NextResponse.json({ 
      score: -1, 
      improvements: [`Failed to analyze portfolio: ${err.message}`],
      categories: {}
    });
  }
}