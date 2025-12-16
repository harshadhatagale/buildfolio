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

export default function SectionRenderer({ id,name, type,content }) {
  const renderSection = () => {
    switch (type) {
      case 'hero':
        return <HeroSection name={name} id={id}  content={content}/>;
      case 'nav':
        return <Nav name={name} id={id} content={content}/>;
      case 'about':
        return <AboutSection name={name} id={id} content={content}/>;
      case 'skills':
        return <SkillsSection name={name} id={id} content={content}/>;
      case 'experience':
        return <ExperienceSection name={name} id={id} content={content}/>;
      case 'testimonials':
        return <TestimonialsSection name={name} id={id} content={content}/>;
      case 'footer':
        return <Footer name={name} id={id} content={content}/>;
      case 'projects':
        return <ProjectsSection name={name} id={id} content={content}/>;
      case "services":
        return <ServicesSection name={name} id={id} content={content}/>
      case "education":
        return <EducationSection name={name} id={id} content={content}/>
      case "certifications":
        return <CertificationsSection name={name} id={id} content={content}/>
      case "faqs":
        return <FaqsSection name={name} id={id} content={content}/>
      case "achievements":
        return <AchievementsSection name={name} id={id} content={content}/>
      default:
        return <SimpleSection name={name} id={id} content={content}/>;
    }
  };

  return (
    <>
      {renderSection()}
    </>
  );
}
