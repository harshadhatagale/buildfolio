'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
import { Trash, Plus } from 'lucide-react'
import {
  updateSection,
  setSelectedSection,
} from '../../../features/portfolio/portfolioSlice'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

const EditableText = ({ value, onChange, isSelected, sectionId, className }) => {
  const dispatch = useDispatch()

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className={cn(
        className,
        'px-1 cursor-text',
        isSelected
          ? 'outline outline-2 outline-primary rounded-sm'
          : 'outline-none'
      )}
      onClick={(e) => {
        e.stopPropagation()
        dispatch(setSelectedSection({ _id: sectionId, type: 'testimonials' }))
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          e.currentTarget.blur()
        }
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </span>
  )
}

const EditableParagraph = ({ value, onChange, isSelected, sectionId, className }) => {
  const dispatch = useDispatch()

  return (
    <p
      contentEditable
      suppressContentEditableWarning
      className={cn(
        className,
        'px-1 cursor-text whitespace-pre-wrap',
        isSelected
          ? 'outline outline-2 outline-primary rounded-sm'
          : 'outline-none'
      )}
      onClick={(e) => {
        e.stopPropagation()
        dispatch(setSelectedSection({ _id: sectionId, type: 'testimonials' }))
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  )
}

export default function TestimonialsSection({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedSection) return
    setSelected(selectedSection._id === id)
  }, [selectedSection, id])

  const addTestimonial = () => {
    const next = [
      ...(content.testimonials || []),
      {
        name: 'Person Name',
        role: 'Role / Company',
        message: 'What they said about you...',
        image: '',
      },
    ]

    dispatch(
      updateSection({
        _id: id,
        content: { testimonials: next },
      })
    )
  }

  const deleteTestimonial = (index) => {
    const next = content.testimonials.filter((_, i) => i !== index)

    dispatch(
      updateSection({
        _id: id,
        content: { testimonials: next },
      })
    )
  }

  return (
    <section
      className="relative w-full py-10 bg-background px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'testimonials' }))
      }
    >
      <div className="container space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            <EditableText
              value={content?.heading || 'Testimonials'}
              sectionId={id}
              isSelected={isSelected}
              onChange={(val) =>
                dispatch(
                  updateSection({
                    _id: id,
                    content: { heading: val },
                  })
                )
              }
            />
          </h2>

          <EditableParagraph
            value={
              content?.subHeading ||
              'What people say about working with me'
            }
            sectionId={id}
            isSelected={isSelected}
            className="text-muted-foreground text-lg"
            onChange={(val) =>
              dispatch(
                updateSection({
                  _id: id,
                  content: { subHeading: val },
                })
              )
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.testimonials?.map((item, index) => (
            <Card
              key={index}
              className="relative hover:shadow-xl transition-shadow"
            >
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteTestimonial(index)
                  }}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition"
                >
                  <Trash size={16} />
                </button>
              )}

              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={item.image} />
                  <AvatarFallback>
                    {item.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>

                <CardTitle className="mt-4">
                  <EditableText
                    value={item.name}
                    sectionId={id}
                    isSelected={isSelected}
                    onChange={(val) => {
                      const next = [...content.testimonials]
                      next[index] = { ...next[index], name: val }
                      dispatch(updateSection({ _id: id, content: { testimonials: next } }))
                    }}
                  />
                </CardTitle>

                <CardDescription>
                  <EditableText
                    value={item.role}
                    sectionId={id}
                    isSelected={isSelected}
                    onChange={(val) => {
                      const next = [...content.testimonials]
                      next[index] = { ...next[index], role: val }
                      dispatch(updateSection({ _id: id, content: { testimonials: next } }))
                    }}
                  />
                </CardDescription>
              </CardHeader>

              <CardContent>
                <EditableParagraph
                  value={item.message}
                  sectionId={id}
                  isSelected={isSelected}
                  className="text-muted-foreground text-center"
                  onChange={(val) => {
                    const next = [...content.testimonials]
                    next[index] = { ...next[index], message: val }
                    dispatch(updateSection({ _id: id, content: { testimonials: next } }))
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              addTestimonial()
            }}
            className="w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Testimonial
          </button>
        )}
      </div>
    </section>
  )
}
