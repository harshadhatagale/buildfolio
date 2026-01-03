import { Mountain } from 'lucide-react'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateSection,
  setSelectedSection,
} from '../../../../../features/portfolio/portfolioSlice'

export default function HeroProps() {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  if (!selectedSection) return null

  const index = sections.findIndex(
    (section) => section._id === selectedSection._id
  )
  if (index === -1) return null

  const section = sections[index]
  const content = section.content || {}

  // 🔹 Generic updater
  const updateContent = (newContent) => {
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection(section))
  }

  // 🔹 Normal field handler
  const handleChange = (key) => (e) => {
    updateContent({
      ...content,
      [key]: e.target.value,
    })
  }

  // 🔹 CTA nested handler
  const handleCTAChange = (key) => (e) => {
    updateContent({
      ...content,
      cta: {
        ...(content.cta || {}),
        [key]: e.target.value,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Mountain className="text-primary" />
        <span className="font-medium">{section.name}</span>
      </div>

      {/* Primary Heading */}
      <div className="grid gap-2">
        <Label>Primary Heading</Label>
        <Input
          value={content.primaryHeading || ''}
          onChange={handleChange('primaryHeading')}
          placeholder="Building Digital Experiences That Matter"
        />
      </div>

      {/* Secondary Heading */}
      <div className="grid gap-2">
        <Label>Secondary Heading</Label>
        <Textarea
          rows={4}
          value={content.secondaryHeading || ''}
          onChange={handleChange('secondaryHeading')}
          placeholder="A modern full-stack developer crafting scalable web applications..."
        />
      </div>

      {/* CTA LINKS */}
      <div className="grid gap-4 pt-2 border-t">
        <span className="text-sm font-medium text-muted-foreground">
          Call To Action Links
        </span>

        <div className="grid gap-2">
          <Label>Resume Link</Label>
          <Input
            value={content.cta?.resumeLink || ''}
            onChange={handleCTAChange('resumeLink')}
            placeholder="https://example.com/resume.pdf"
          />
        </div>

        <div className="grid gap-2">
          <Label>Get In Touch Link</Label>
          <Input
            value={content.cta?.getInTouchLink || ''}
            onChange={handleCTAChange('getInTouchLink')}
            placeholder="mailto:hello@example.com"
          />
        </div>
      </div>
    </div>
  )
}
