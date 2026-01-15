import SectionRenderer from './sections/SectionRenderer'
import {
  defaultTheme,
} from '../../../features/portfolio/portfolioSlice'
import React from 'react'
import { slugify } from '@/lib/slugify'
import NotFound from '@/app/not-found/page'

export default function Portfolio({ project,mode="light", themeColors }) {
  const getThemeStyles = () => {
    const colors = {
      ...defaultTheme[mode === 'dark' ? 'dark' : 'light'],
      ...themeColors[mode === 'dark' ? 'dark' : 'light'],
    }

    return {
      '--background': colors.background,
      '--foreground': colors.foreground,
      '--card': colors.card,
      '--card-foreground': colors.cardForeground,
      '--popover': colors.popover,
      '--popover-foreground': colors.popoverForeground,
      '--primary': colors.primary,
      '--primary-foreground': colors.primaryForeground,
      '--secondary': colors.secondary,
      '--secondary-foreground': colors.secondaryForeground,
      '--muted': colors.muted,
      '--muted-foreground': colors.mutedForeground,
      '--accent': colors.accent,
      '--accent-foreground': colors.accentForeground,
      '--destructive': colors.destructive,
      '--border': colors.border,
      '--input': colors.input,
      '--ring': colors.ring,
      '--chart-1': colors.chart1,
      '--chart-2': colors.chart2,
      '--chart-3': colors.chart3,
      '--chart-4': colors.chart4,
      '--chart-5': colors.chart5,
      '--sidebar': colors.sidebar,
      '--sidebar-foreground': colors.sidebarForeground,
      '--sidebar-primary': colors.sidebarPrimary,
      '--sidebar-primary-foreground': colors.sidebarPrimaryForeground,
      '--sidebar-accent': colors.sidebarAccent,
      '--sidebar-accent-foreground': colors.sidebarAccentForeground,
      '--sidebar-border': colors.sidebarBorder,
      '--sidebar-ring': colors.sidebarRing,
    }
  }
  if (!project) return <NotFound />
  return (
    <>
      <main
        style={{ fontFamily: `'${project.font}', Poppins, sans-serif` }}
        className="h-full w-full bg-background"
      >
        <div
        style={getThemeStyles()}
          className="text-foreground portfolio">
          {project.sections.map((section) => (
            <div
              key={section._id}
              className="bg-card h-full text-card-foreground"
            >
              <SectionRenderer
                name={slugify(section.name)}
                type={section.type}
                content={section.content}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
