import { Quote, Pencil, Trash2, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useDispatch, useSelector } from 'react-redux'
import { updateSection, setSelectedSection } from '../../../../../features/portfolio/portfolioSlice'

export default function TestimonialsProps() {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)
  const [editingIndex, setEditingIndex] = useState(null)

  if (!selectedSection) {
    return null
  }

  const index = sections.findIndex(
    (section) => section._id === selectedSection._id
  )

  if (index === -1) {
    return null
  }

  const section = sections[index]
  const testimonials = section.content.testimonials || []

  const handleChange = (key) => (e) => {
    const newContent = { ...section.content, [key]: e.target.value }
    dispatch(updateSection({ _id: section._id, content: newContent }))
  }

  const handleTestimonialChange = (index, key, value) => {
    const updatedTestimonials = [...testimonials]
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [key]: value
    }
    dispatch(updateSection({
      _id: section._id,
      content: { ...section.content, testimonials: updatedTestimonials }
    }))
  }

  const addNewTestimonial = () => {
    const newTestimonial = {
      name: "New Client",
      role: "Position",
      message: "Testimonial message",
      image: ""
    }
    dispatch(updateSection({
      _id: section._id,
      content: {
        ...section.content,
        testimonials: [...testimonials, newTestimonial]
      }
    }))
    setEditingIndex(testimonials.length) // Edit the new one immediately
  }

  const removeTestimonial = (index) => {
    const updatedTestimonials = testimonials.filter((_, i) => i !== index)
    dispatch(updateSection({
      _id: section._id,
      content: {
        ...section.content,
        testimonials: updatedTestimonials
      }
    }))
    if (editingIndex === index) setEditingIndex(null)
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-4'>
      <div className='w-full flex justify-start gap-3 items-center'>
        <Quote className='text-primary' />
        <span className="font-medium">{section.name}</span>
      </div>

      {/* Section Heading */}
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="heading">Section Heading</Label>
        <Input
          id="heading"
          type="text"
          onChange={handleChange("heading")}
          value={section.content.heading || ""}
          placeholder="What People Say"
        />
      </div>

      {/* Testimonials List */}
      <div className="w-full max-w-sm space-y-4">
        <div className="flex flex-col gap-2">
          <Label>Testimonials</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={addNewTestimonial}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        <Accordion type="multiple" value={editingIndex !== null ? [editingIndex.toString()] : []}>
          {testimonials.map((testimonial, index) => (
            <AccordionItem
              key={index}
              value={index.toString()}
              className="border rounded-lg mb-3"
            >
              <div className="flex items-center">
                <AccordionTrigger
                  className="flex-1 px-4 hover:no-underline"
                  onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-medium text-left">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground text-left">{testimonial.role}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  onClick={() => removeTestimonial(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              <AccordionContent className="px-4 pb-4 space-y-3">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={testimonial.name}
                      onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`role-${index}`}>Role</Label>
                    <Input
                      id={`role-${index}`}
                      value={testimonial.role}
                      onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`image-${index}`}>Image URL</Label>
                    <Input
                      id={`image-${index}`}
                      value={testimonial.image}
                      onChange={(e) => handleTestimonialChange(index, 'image', e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`message-${index}`}>Testimonial</Label>
                    <Textarea
                      id={`message-${index}`}
                      value={testimonial.message}
                      onChange={(e) => handleTestimonialChange(index, 'message', e.target.value)}
                      rows={3}
                    />
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