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
  const device = useSelector((state) => state.portfolio.device)
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(selectedSection?._id === id)
  }, [selectedSection, id])

  const gridCols =
    device === 'mobile'
      ? 'grid-cols-1'
      : device === 'tablet'
      ? 'grid-cols-2'
      : 'grid-cols-3'

  const headingSize =
    device === 'mobile'
      ? 'text-2xl'
      : device === 'tablet'
      ? 'text-3xl'
      : 'text-4xl'

  const avatarSize =
    device === 'mobile'
      ? 'w-14 h-14'
      : device === 'tablet'
      ? 'w-16 h-16'
      : 'w-20 h-20'

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

    dispatch(updateSection({ _id: id, content: { testimonials: next } }))
  }

  const deleteTestimonial = (index) => {
    const next = content.testimonials.filter((_, i) => i !== index)
    dispatch(updateSection({ _id: id, content: { testimonials: next } }))
  }

  return (
    <section
      className="relative bg-background py-10 px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'testimonials' }))
      }
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className={cn('font-bold tracking-tight', headingSize)}>
            <EditableText
              value={content.heading}
              sectionId={id}
              isSelected={isSelected}
              onChange={(val) =>
                dispatch(updateSection({ _id: id, content: { heading: val } }))
              }
            />
          </h2>

          <EditableParagraph
            value={content.subHeading}
            sectionId={id}
            isSelected={isSelected}
            className="text-muted-foreground text-lg"
            onChange={(val) =>
              dispatch(updateSection({ _id: id, content: { subHeading: val } }))
            }
          />
        </div>

        <div className={cn('grid gap-6', gridCols)}>
          {content.testimonials?.map((item, index) => (
            <Card key={index} className="relative hover:shadow-md transition">
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteTestimonial(index)
                  }}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                >
                  <Trash size={16} />
                </button>
              )}

              <CardHeader className="flex flex-col items-center text-center gap-3">
                <Avatar className={avatarSize}>
                  <AvatarImage src={item.image} />
                  <AvatarFallback>
                    {item.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>

                <CardTitle>
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
