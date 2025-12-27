'use client'
import React from 'react'
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  globe: Globe
};
export default function Footer({id, content}) {
  
  return (
    <footer className={`relative w-full border-t bg-background px-6 py-5`}>
      <div className="container py-3 flex flex-col md:flex-row justify-between gap-6">
        {/* Left Side */}
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold">{content?.portfolioName}</h2>
          {content?.description && (
            <p className="text-sm text-muted-foreground max-w-sm">
              {content.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {content?.copyright ||
              `© ${new Date().getFullYear()} All rights reserved.`}
          </p>
          <p className='text-xs text-muted-foreground'>Built with ❤️ using BuildFolio.</p>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {content?.links?.map((link) => (
            <Link
              key={link.title}    
              href={link.link}
              className="text-sm text-muted-foreground hover:underline"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Right Social Icons */}
        <div className="flex items-center gap-4 justify-center md:justify-end">
          {content?.socials?.map((social) => {
            const Icon = iconMap[social.icon?.toLowerCase()] || Globe;
            return (
              <Button
                key={social.platform}
                variant="ghost"
                size="icon"
                asChild
              >
                <a href={social.link} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </footer>
  )
}