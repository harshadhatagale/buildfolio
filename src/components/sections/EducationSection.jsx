'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  GraduationCap,
  Book,
  School,
  Layout,
  Trash,
  Plus,
} from 'lucide-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

import { cn } from '@/lib/utils'
import {
  updateSection,
  setSelectedSection,
} from '../../../features/portfolio/portfolioSlice'

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
        dispatch(setSelectedSection({ _id: sectionId, type: 'education' }))
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'education' }))
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  )
}

export default function EducationSection({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedSection) return
    setSelected(selectedSection._id === id)
  }, [selectedSection, id])

  const iconMap = {
    graduationcap: GraduationCap,
    book: Book,
    school: School,
  }

  const addEducation = () => {
    const next = [
      ...(content.items || []),
      {
        icon: 'graduationcap',
        degree: 'Degree Name',
        institution: 'Institution Name',
        year: '2020 - 2024',
        description: 'Short description',
      },
    ]

    dispatch(updateSection({ _id: id, content: { items: next } }))
  }

  const deleteEducation = (index) => {
    const next = content.items.filter((_, i) => i !== index)
    dispatch(updateSection({ _id: id, content: { items: next } }))
  }

  return (
    <section
      className="relative w-full py-10 px-6 bg-background"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'education' }))
      }
    >
      <div className="container space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            <EditableText
              value={content?.heading || 'Education'}
              sectionId={id}
              isSelected={isSelected}
              onChange={(val) =>
                dispatch(updateSection({
                  _id: id,
                  content: { heading: val },
                }))
              }
            />
          </h2>

          <EditableParagraph
            value={content?.subHeading || 'My academic background'}
            sectionId={id}
            isSelected={isSelected}
            className="text-muted-foreground text-lg"
            onChange={(val) =>
              dispatch(updateSection({
                _id: id,
                content: { subHeading: val },
              }))
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.items?.map((item, index) => {
            const Icon =
              iconMap[item.icon?.toLowerCase()] || Layout

            return (
              <Card
                key={index}
                className="relative hover:shadow-xl transition-shadow"
              >
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteEducation(index)
                    }}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                  >
                    <Trash size={16} />
                  </button>
                )}

                <CardHeader className="flex flex-col gap-3 items-start">
                  <div className="p-3 rounded-xl bg-muted">
                    <Icon className="h-6 w-6" />
                  </div>

                  <CardTitle>
                    <EditableText
                      value={item.degree}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.items]
                        next[index] = { ...next[index], degree: val }
                        dispatch(updateSection({ _id: id, content: { items: next } }))
                      }}
                    />
                  </CardTitle>

                  <CardDescription>
                    <EditableText
                      value={item.institution}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.items]
                        next[index] = { ...next[index], institution: val }
                        dispatch(updateSection({ _id: id, content: { items: next } }))
                      }}
                    />
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <EditableText
                    value={item.year}
                    sectionId={id}
                    isSelected={isSelected}
                    className="text-sm text-muted-foreground"
                    onChange={(val) => {
                      const next = [...content.items]
                      next[index] = { ...next[index], year: val }
                      dispatch(updateSection({ _id: id, content: { items: next } }))
                    }}
                  />

                  <EditableParagraph
                    value={item.description}
                    sectionId={id}
                    isSelected={isSelected}
                    className="text-sm"
                    onChange={(val) => {
                      const next = [...content.items]
                      next[index] = { ...next[index], description: val }
                      dispatch(updateSection({ _id: id, content: { items: next } }))
                    }}
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              addEducation()
            }}
            className="mt-10 w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Education
          </button>
        )}
      </div>
    </section>
  )
}
