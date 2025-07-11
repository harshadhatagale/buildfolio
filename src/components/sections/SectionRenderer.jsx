import React from 'react'
import  HeroSection  from './HeroSection';
import Nav from './Nav';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import TestimonialsSection from './TestimonialsSection';
import SimpleSection from './SimpleSection';
import Footer from './Footer';
import ProjectsSection from './ProjectsSection';
import ServicesSection from './ServicesSection';
import EducationSection from './EducationSection';
import CertificationsSection from './CertificationsSection';
import FaqsSection from './FaqsSection';
import AchievementsSection from './AchievementsSection';

export default function SectionRenderer({ id, type,content }) {
  const renderSection = () => {
    switch (type) {
      case 'hero':
        return <HeroSection  content={content}/>;
      case 'nav':
        return <Nav content={content}/>;
      case 'about':
        return <AboutSection  content={content}/>;
      case 'skills':
        return <SkillsSection  content={content}/>;
      case 'experience':
        return <ExperienceSection  content={content}/>;
      case 'testimonials':
        return <TestimonialsSection id={id} content={content}/>;
      case 'footer':
        return <Footer content={content}/>;
      case 'projects':
        return <ProjectsSection content={content}/>;
      case "services":
        return <ServicesSection content={content}/>
      case "education":
        return <EducationSection content={content}/>
      case "certifications":
        return <CertificationsSection content={content}/>
      case "faqs":
        return <FaqsSection content={content}/>
      case "achievements":
        return <AchievementsSection content={content}/>
      default:
        return <SimpleSection content={content}/>;
    }
  };

  return (
    <>
      {renderSection()}
    </>
  );
}
