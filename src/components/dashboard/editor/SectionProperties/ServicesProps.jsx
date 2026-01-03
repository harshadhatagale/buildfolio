'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Check,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export default function ServicesProps() {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)

  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState(-1)

  const [service, setService] = useState({
    title: '',
    description: '',
    icon: '',
    highlights: '',
  })

  if (!selectedSection) return null

  const index = sections.findIndex(
    (section) => section._id === selectedSection._id
  )
  if (index === -1) return null

  const section = sections[index]

  /* ---------- helpers ---------- */

  const updateContent = (services) => {
    const newContent = { ...section.content, services }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
  }

  const resetForm = () => {
    setService({
      title: '',
      description: '',
      icon: '',
      highlights: '',
    })
    setEditingIndex(-1)
    setIsAdding(false)
  }

  /* ---------- CRUD ---------- */

  const handleAdd = () => {
    if (!service.title.trim()) {
      toast.error('Service title is required')
      return
    }

    updateContent([
      ...section.content.services,
      {
        title: service.title,
        description: service.description,
        icon: service.icon,
        highlights: service.highlights
          .split(',')
          .map((h) => h.trim())
          .filter(Boolean),
      },
    ])

    resetForm()
    toast.success('Service added')
  }

  const handleEdit = (i) => {
    const s = section.content.services[i]
    setService({
      title: s.title,
      description: s.description,
      icon: s.icon,
      highlights: s.highlights.join(', '),
    })
    setEditingIndex(i)
    setIsAdding(true)
  }

  const handleUpdate = () => {
    if (!service.title.trim()) {
      toast.error('Service title is required')
      return
    }

    const updated = [...section.content.services]
    updated[editingIndex] = {
      title: service.title,
      description: service.description,
      icon: service.icon,
      highlights: service.highlights
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean),
    }

    updateContent(updated)
    resetForm()
    toast.success('Service updated')
  }

  const handleDelete = (i) => {
    const updated = [...section.content.services]
    updated.splice(i, 1)
    updateContent(updated)
    toast.success('Service removed')
  }
  const move = (i, dir) => {
    const list = [...section.content.services]
    const newIndex = dir === 'up' ? i - 1 : i + 1
    if (newIndex < 0 || newIndex >= list.length) return
    ;[list[i], list[newIndex]] = [list[newIndex], list[i]]
    updateContent(list)
  }

  /* ---------- UI ---------- */

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Briefcase className="text-primary" />
        <h2>{section.name}</h2>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Add Button */}
        <Button
          size="sm"
          onClick={() => {
            setIsAdding(true)
            setEditingIndex(-1)
            setService({
              title: '',
              description: '',
              icon: '',
              highlights: '',
            })
          }}
          disabled={isAdding}
        >
          <Plus size={16} className="mr-2" />
          Add Service
        </Button>

        {/* Form */}
        {isAdding && (
          <div className="border rounded-lg p-4 space-y-4 bg-card">
            <div className="space-y-2">
              <Label>Title*</Label>
              <Input
                value={service.title}
                onChange={(e) =>
                  setService({ ...service, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={service.description}
                onChange={(e) =>
                  setService({ ...service, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Icon (lucide name)</Label>
              <Input
                placeholder="e.g. rocket, layers, penTool"
                value={service.icon}
                onChange={(e) =>
                  setService({ ...service, icon: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Highlights (comma separated)</Label>
              <Input
                placeholder="UX audits, wireframes, design systems"
                value={service.highlights}
                onChange={(e) =>
                  setService({ ...service, highlights: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={resetForm}>
                <X size={14} className="mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={editingIndex === -1 ? handleAdd : handleUpdate}>
                <Check size={14} className="mr-1" />
                {editingIndex === -1 ? 'Save' : 'Update'}
              </Button>
            </div>
          </div>
        )}

        {/* List */}
        <Accordion type="single" collapsible>
          {section.content.services?.map((s, i) => (
            <AccordionItem key={i} value={s.title + i}>
              <div className="flex items-center">
                <AccordionTrigger className="flex-1">
                  <h4 className="text-sm font-medium">{s.title}</h4>
                </AccordionTrigger>

                <div className="flex gap-1 pr-4">
                  <Button size="icon" variant="ghost" onClick={() => move(i, 'up')}>
                    <ChevronUp size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => move(i, 'down')}>
                    <ChevronDown size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(i)}>
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(i)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  {s.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {s.highlights.map((h, idx) => (
                    <Badge key={idx} variant="secondary">
                      {h}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
