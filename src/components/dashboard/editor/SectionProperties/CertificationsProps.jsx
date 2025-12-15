'use client'
import IconChooser from '@/components/icons/iconChooser'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { BadgeCheck, Plus, X, Pencil, Trash2, Check, ArrowUp, ArrowDown, Link as LinkIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-hot-toast'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
export default function CertificationsProps() {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    year: '',
    description: '',
    link: '',
    icon: ''
  })
  const [editingIndex, setEditingIndex] = useState(-1)
  const [isAdding, setIsAdding] = useState(false)

  if (!selectedSection) return null

  const index = sections.findIndex(section => section._id === selectedSection._id)
  if (index === -1) return null

  const section = sections[index]

  const handleChange = (key) => (e) => {
    const newContent = { ...section.content, [key]: e.target.value }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
  }

  const handleCertChange = (key, value, idx) => {
    const updatedItems = [...section.content.items]
    updatedItems[idx] = { ...updatedItems[idx], [key]: value }
    const newContent = { ...section.content, items: updatedItems }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
  }

  const handleAddCert = () => {
    if (!newCert.title.trim() || !newCert.issuer.trim()) {
      toast.error('Title and Issuer are required')
      return
    }

    const newContent = {
      ...section.content,
      items: [...section.content.items, newCert]
    }

    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))

    setNewCert({
      title: '',
      issuer: '',
      year: '',
      description: '',
      link: '',
      icon: ''
    })
    setIsAdding(false)
    toast.success('Certification added')
  }

  const handleEditCert = (idx) => {
    setNewCert(section.content.items[idx])
    setEditingIndex(idx)
    setIsAdding(true)
  }

  const handleUpdateCert = () => {
    if (!newCert.title.trim() || !newCert.issuer.trim()) {
      toast.error('Title and Issuer are required')
      return
    }

    const updatedItems = [...section.content.items]
    updatedItems[editingIndex] = newCert

    const newContent = {
      ...section.content,
      items: updatedItems
    }

    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))

    setNewCert({
      title: '',
      issuer: '',
      year: '',
      description: '',
      link: '',
      icon: ''
    })
    setEditingIndex(-1)
    setIsAdding(false)
    toast.success('Certification updated')
  }

  const handleDeleteCert = (idx) => {
    const updatedItems = [...section.content.items]
    updatedItems.splice(idx, 1)

    const newContent = { ...section.content, items: updatedItems }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
    toast.success('Certification removed')
  }

  const handleMoveCert = (idx, direction) => {
    if ((direction === 'up' && idx === 0) ||
      (direction === 'down' && idx === section.content.items.length - 1)) {
      return
    }
    const newIndex = direction === 'up' ? idx - 1 : idx + 1
    const updatedItems = [...section.content.items]
    const temp = updatedItems[idx]
    updatedItems[idx] = updatedItems[newIndex]
    updatedItems[newIndex] = temp

    const newContent = { ...section.content, items: updatedItems }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-6'>
      <div className='w-full flex justify-start gap-3 items-center'>
        <BadgeCheck className="text-primary" />
        <h2>{section.name}</h2>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Heading */}
        <div className="space-y-2">
          <Label>Section Title</Label>
          <Input
            type="text"
            placeholder="e.g. Certifications"
            value={section.content.heading || ''}
            onChange={handleChange("heading")}
          />
        </div>
        {/* Subheading */}
        <div className="space-y-2">
          <Label>Section Subtitle</Label>
          <Input
            type="text"
            placeholder="e.g. Here are some of the certifications I have earned."
            value={section.content.subHeading || ''}
            onChange={handleChange("subHeading")}
          />
        </div>

        {/* Items */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Certification Items</h3>
            <Button
              size="sm"
              onClick={() => {
                setIsAdding(true)
                setEditingIndex(-1)
                setNewCert({
                  title: '',
                  issuer: '',
                  year: '',
                  description: '',
                  link: '',
                  icon: ''
                })
              }}
              disabled={isAdding}
            >
              <Plus size={16} className="mr-2" /> Add
            </Button>
          </div>

          {(isAdding || editingIndex !== -1) && (
            <div className="border rounded-lg p-4 space-y-4 bg-card">
              <div className="space-y-2">
                <Label>Title*</Label>
                <Input
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  placeholder="e.g. Full Stack Web Development"
                />
              </div>
              <div className="space-y-2">
                <Label>Issuer*</Label>
                <Input
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  placeholder="e.g. Coursera"
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  value={newCert.year}
                  onChange={(e) => setNewCert({ ...newCert, year: e.target.value })}
                  placeholder="e.g. 2023"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newCert.description}
                  onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                  placeholder="Describe the certification and skills learned"
                />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input
                  value={newCert.link}
                  onChange={(e) => setNewCert({ ...newCert, link: e.target.value })}
                  placeholder="e.g. https://coursera.org/certificate/xyz123"
                />
              </div>
              <div className="space-y-2">
                <Label>Icon (optional)</Label>
                <IconChooser
                  value={newCert.icon}
                  onChange={(icon) =>
                    setNewCert({ ...newCert, icon })
                  }
                />
              </div>
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAdding(false)
                    setEditingIndex(-1)
                    setNewCert({
                      title: '',
                      issuer: '',
                      year: '',
                      description: '',
                      link: '',
                      icon: ''
                    })
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={editingIndex !== -1 ? handleUpdateCert : handleAddCert}
                >
                  <Check size={16} className="mr-2" />
                  {editingIndex !== -1 ? 'Update' : 'Save'}
                </Button>
              </div>
            </div>
          )}

          {/* Accordion list */}
          <Accordion type="single" collapsible>
            {section.content.items?.map((cert, idx) => (
              <AccordionItem key={idx} value={cert.title + idx}>
                <div className="flex items-center">
                  <AccordionTrigger className="flex-1">
                    <h4 className="text-sm font-medium">{cert.title}</h4>
                  </AccordionTrigger>
                  <div className="flex gap-1 pr-4">
                    <Button variant="ghost" size="icon" onClick={() => handleMoveCert(idx, 'up')}>
                      <ArrowUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleMoveCert(idx, 'down')}>
                      <ArrowDown size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditCert(idx)}>
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCert(idx)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <AccordionContent>
                  <div className="border rounded-lg p-4 space-y-3">
                    <p className="text-muted-foreground">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground">{cert.year}</p>
                    <p className="text-sm">{cert.description}</p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary text-xs"
                      >
                        <LinkIcon size={14} /> View Certificate
                      </a>
                    )}
                    {cert.icon && <p className="text-xs text-muted-foreground">Icon: {cert.icon}</p>}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
