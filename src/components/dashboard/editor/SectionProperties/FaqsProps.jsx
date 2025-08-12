'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X, Pencil, Trash2, Check, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-hot-toast'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FaqsProps() {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)
  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: ''
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

  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error('Question and Answer are required')
      return
    }

    const newContent = {
      ...section.content,
      items: [...section.content.items, newFaq]
    }

    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))

    setNewFaq({ question: '', answer: '' })
    setIsAdding(false)
    toast.success('FAQ added')
  }

  const handleEditFaq = (idx) => {
    setNewFaq(section.content.items[idx])
    setEditingIndex(idx)
    setIsAdding(true)
  }

  const handleUpdateFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error('Question and Answer are required')
      return
    }

    const updatedItems = [...section.content.items]
    updatedItems[editingIndex] = newFaq

    const newContent = { ...section.content, items: updatedItems }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))

    setNewFaq({ question: '', answer: '' })
    setEditingIndex(-1)
    setIsAdding(false)
    toast.success('FAQ updated')
  }

  const handleDeleteFaq = (idx) => {
    const updatedItems = [...section.content.items]
    updatedItems.splice(idx, 1)

    const newContent = { ...section.content, items: updatedItems }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
    toast.success('FAQ removed')
  }

  const handleMoveFaq = (idx, direction) => {
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
        <HelpCircle className="text-primary" />
        <h2>{section.name}</h2>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Heading */}
        <div className="space-y-2">
          <Label>Section Title</Label>
          <Input
            type="text"
            placeholder="e.g. Frequently Asked Questions"
            value={section.content.heading || ''}
            onChange={handleChange("heading")}
          />
        </div>
        {/* Subheading */}
        <div className="space-y-2">
          <Label>Section Subtitle</Label>
          <Input
            type="text"
            placeholder="e.g. Got questions? I’ve got answers."
            value={section.content.subHeading || ''}
            onChange={handleChange("subHeading")}
          />
        </div>

        {/* Items */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">FAQ Items</h3>
            <Button
              size="sm"
              onClick={() => {
                setIsAdding(true)
                setEditingIndex(-1)
                setNewFaq({ question: '', answer: '' })
              }}
              disabled={isAdding}
            >
              <Plus size={16} className="mr-2" /> Add
            </Button>
          </div>

          {(isAdding || editingIndex !== -1) && (
            <div className="border rounded-lg p-4 space-y-4 bg-card">
              <div className="space-y-2">
                <Label>Question*</Label>
                <Input
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  placeholder="e.g. Can I customize my portfolio after publishing?"
                />
              </div>
              <div className="space-y-2">
                <Label>Answer*</Label>
                <Textarea
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  placeholder="e.g. Yes! You can log in anytime to edit, add, or remove sections as you like."
                />
              </div>
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAdding(false)
                    setEditingIndex(-1)
                    setNewFaq({ question: '', answer: '' })
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={editingIndex !== -1 ? handleUpdateFaq : handleAddFaq}
                >
                  <Check size={16} className="mr-2" />
                  {editingIndex !== -1 ? 'Update' : 'Save'}
                </Button>
              </div>
            </div>
          )}

          {/* Accordion list */}
          <Accordion type="single" collapsible>
            {section.content.items?.map((faq, idx) => (
              <AccordionItem key={idx} value={faq.question + idx}>
                <div className="flex items-center">
                  <AccordionTrigger className="flex-1">
                    <h4 className="text-sm font-medium">{faq.question}</h4>
                  </AccordionTrigger>
                  <div className="flex gap-1 pr-4">
                    <Button variant="ghost" size="icon" onClick={() => handleMoveFaq(idx, 'up')}>
                      <ArrowUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleMoveFaq(idx, 'down')}>
                      <ArrowDown size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditFaq(idx)}>
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFaq(idx)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
