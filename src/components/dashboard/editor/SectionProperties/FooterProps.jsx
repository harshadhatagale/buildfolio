'use client'

import React from 'react'
import { HelpCircle, Plus, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { updateSection } from '../../../../../features/portfolio/portfolioSlice'

export default function FooterProps() {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  if (!selectedSection) return null

  const section = sections.find(
    (s) => s._id === selectedSection._id
  )
  if (!section) return null

  const updateContent = (newContent) => {
    dispatch(
      updateSection({
        _id: section._id,
        content: newContent,
      })
    )
  }

  /* ---------------- Links Handlers ---------------- */

  const handleLinkChange = (index, key, value) => {
    const updatedLinks = [...(section.content.links || [])]
    updatedLinks[index] = {
      ...updatedLinks[index],
      [key]: value,
    }

    updateContent({
      ...section.content,
      links: updatedLinks,
    })
  }

  const addLink = () => {
    updateContent({
      ...section.content,
      links: [
        ...(section.content.links || []),
        { title: 'New Link', link: '/' },
      ],
    })
  }

  const removeLink = (index) => {
    const updatedLinks = section.content.links.filter(
      (_, i) => i !== index
    )

    updateContent({
      ...section.content,
      links: updatedLinks,
    })
  }

  /* ------------------------------------------------ */

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <HelpCircle className="text-primary" />
        <span className="font-medium">{section.name}</span>
      </div>

      {/* Heading */}
      <div className="grid gap-2">
        <Label>Heading</Label>
        <Input
          value={section.content.portfolioName || ''}
          onChange={(e) =>
            updateContent({
              ...section.content,
              portfolioName: e.target.value,
            })
          }
          placeholder="Aarav Studio"
        />
      </div>

      {/* Description */}
      <div className="grid gap-2">
        <Label>Description</Label>
        <Textarea
          rows={4}
          value={section.content.description || ''}
          onChange={(e) =>
            updateContent({
              ...section.content,
              description: e.target.value,
            })
          }
          placeholder="Thoughtful product engineering for modern teams."
        />
      </div>

      {/* Editable Links */}
      <div className="grid gap-3">
        <Label>Important Links</Label>

        {(section.content.links || []).map((link, index) => (
          <div
            key={index}
            className="flex gap-2 items-center"
          >
            <Input
              className="flex-1"
              placeholder="Title"
              value={link.title}
              onChange={(e) =>
                handleLinkChange(
                  index,
                  'title',
                  e.target.value
                )
              }
            />

            <Input
              className="flex-1"
              placeholder="/contact"
              value={link.link}
              onChange={(e) =>
                handleLinkChange(
                  index,
                  'link',
                  e.target.value
                )
              }
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeLink(index)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-fit"
          onClick={addLink}
        >
          <Plus size={16} className="mr-2" />
          Add Link
        </Button>
      </div>

      {/* Copyright */}
      <div className="grid gap-2">
        <Label>Copyright</Label>
        <Input
          value={section.content.copyright || ''}
          onChange={(e) =>
            updateContent({
              ...section.content,
              copyright: e.target.value,
            })
          }
          placeholder="© 2025 Aarav Studio. All rights reserved."
        />
      </div>
    </div>
  )
}
