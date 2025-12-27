'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'
import { Plus, Trash } from 'lucide-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'certifications' }))
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'certifications' }))
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  )
}

export default function CertificationsSection({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)
  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedSection) return
    setSelected(selectedSection._id === id)
  }, [selectedSection, id])

  const getIcon = (iconName) => {
    if (!iconName) return LucideIcons.Layout

    const formattedName = iconName
      .toLowerCase()
      .split(/[-_ ]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')

    return LucideIcons[formattedName] || LucideIcons.Layout
  }

  const addCertification = () => {
    const next = [
      ...(content.items || []),
      {
        title: 'Certification Name',
        issuer: 'Issuer',
        year: 'Year',
        description: 'Certification description',
        icon: 'layout',
        link: '',
      },
    ]

    dispatch(updateSection({ _id: id, content: { items: next } }))
  }

  const deleteCertification = (index) => {
    const next = content.items.filter((_, i) => i !== index)
    dispatch(updateSection({ _id: id, content: { items: next } }))
  }

  return (
    <section
      className="relative w-full py-10 bg-background px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'certifications' }))
      }
    >
      <div className="container space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            <EditableText
              value={content?.heading || 'Certifications'}
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
            value={
              content?.subHeading ||
              'Credentials and certifications I have achieved.'
            }
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
            const Icon = getIcon(item.icon)

            return (
              <Card key={index} className="relative hover:shadow-xl transition-shadow">
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteCertification(index)
                    }}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition"
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
                      value={item.title}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.items]
                        next[index] = { ...next[index], title: val }
                        dispatch(updateSection({ _id: id, content: { items: next } }))
                      }}
                    />
                  </CardTitle>

                  <CardDescription>
                    <EditableText
                      value={item.issuer}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.items]
                        next[index] = { ...next[index], issuer: val }
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

                {item.link && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full pointer-events-none"
                    >
                      View Certificate
                      <LucideIcons.ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            )
          })}
        </div>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              addCertification()
            }}
            className="w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Certification
          </button>
        )}
      </div>
    </section>
  )
}
