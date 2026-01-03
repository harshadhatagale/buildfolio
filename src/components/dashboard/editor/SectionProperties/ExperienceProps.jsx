'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Check
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { toast } from 'react-hot-toast'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function ExperienceProps() {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)

  const [newExperience, setNewExperience] = useState({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
    technologies: ''
  })

  const [editingIndex, setEditingIndex] = useState(-1)
  const [isAdding, setIsAdding] = useState(false)

  if (!selectedSection) return null

  const index = sections.findIndex(
    (section) => section._id === selectedSection._id
  )
  if (index === -1) return null

  const section = sections[index]

  const updateContent = (content) => {
    dispatch(updateSection({ _id: section._id, content }))
    dispatch(setSelectedSection({ ...section, content }))
  }

  const handleChange = (key) => (e) => {
    updateContent({
      ...section.content,
      [key]: e.target.value
    })
  }

  const handleAddExperience = () => {
    if (!newExperience.jobTitle.trim() || !newExperience.companyName.trim()) {
      toast.error('Job title and company name are required')
      return
    }

    const experienceToAdd = {
      ...newExperience,
      startDate: newExperience.startDate || '',
      endDate: newExperience.endDate || 'Present'
    }

    updateContent({
      ...section.content,
      experiences: [...section.content.experiences, experienceToAdd]
    })

    resetForm()
    toast.success('Experience added')
  }

  const handleEditExperience = (idx) => {
    setNewExperience(section.content.experiences[idx])
    setEditingIndex(idx)
    setIsAdding(true)
  }

  const handleUpdateExperience = () => {
    if (!newExperience.jobTitle.trim() || !newExperience.companyName.trim()) {
      toast.error('Job title and company name are required')
      return
    }

    const updatedExperiences = [...section.content.experiences]
    updatedExperiences[editingIndex] = {
      ...newExperience,
      startDate: newExperience.startDate || '',
      endDate: newExperience.endDate || 'Present'
    }

    updateContent({
      ...section.content,
      experiences: updatedExperiences
    })

    resetForm()
    toast.success('Experience updated')
  }

  const handleDeleteExperience = (idx) => {
    const updatedExperiences = section.content.experiences.filter(
      (_, i) => i !== idx
    )

    updateContent({
      ...section.content,
      experiences: updatedExperiences
    })

    toast.success('Experience removed')
  }

  const resetForm = () => {
    setNewExperience({
      jobTitle: '',
      companyName: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      technologies: ''
    })
    setEditingIndex(-1)
    setIsAdding(false)
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Briefcase className="text-primary" />
        <h2>{section.name}</h2>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label>Section Title</Label>
          <Input
            placeholder="e.g. Experience"
            value={section.content.primaryHeading || ''}
            onChange={handleChange('primaryHeading')}
          />
        </div>

        <Button
          size="sm"
          disabled={isAdding}
          onClick={() => {
            setIsAdding(true)
            setEditingIndex(-1)
            resetForm()
            setIsAdding(true)
          }}
        >
          <Plus size={16} className="mr-2" />
          Add Experience
        </Button>

        {isAdding && (
          <div className="border rounded-lg p-4 space-y-4 bg-card">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Job Title *</Label>
                <Input
                  value={newExperience.jobTitle}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, jobTitle: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Company *</Label>
                <Input
                  value={newExperience.companyName}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, companyName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  placeholder="e.g. Nov 2024"
                  value={newExperience.startDate}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  placeholder="e.g. Present"
                  value={newExperience.endDate}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Responsibilities</Label>
              <Textarea
                rows={3}
                value={newExperience.responsibilities}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    responsibilities: e.target.value
                  })
                }
              />
            </div>

            <div>
              <Label>Technologies</Label>
              <Input
                placeholder="e.g. React, Next.js"
                value={newExperience.technologies}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    technologies: e.target.value
                  })
                }
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={resetForm}>
                Cancel
              </Button>
              <Button size="sm" onClick={editingIndex !== -1 ? handleUpdateExperience : handleAddExperience}>
                <Check size={16} className="mr-2" />
                {editingIndex !== -1 ? 'Update' : 'Save'}
              </Button>
            </div>
          </div>
        )}

        <Accordion type="single" collapsible>
          {section.content.experiences?.map((exp, idx) => (
            <AccordionItem key={idx} value={`exp-${idx}`}>
              <AccordionTrigger>
                {exp.jobTitle}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="text-muted-foreground">{exp.companyName}</p>
                  <p className="text-sm">{exp.startDate} – {exp.endDate}</p>
                  <p className="text-sm">{exp.responsibilities}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies
                      ?.split(',')
                      .map((t, i) => (
                        <Badge key={i} variant="secondary">
                          {t.trim()}
                        </Badge>
                      ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEditExperience(idx)}>
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDeleteExperience(idx)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
