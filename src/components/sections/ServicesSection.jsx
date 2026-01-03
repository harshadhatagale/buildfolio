'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  updateSection,
  setSelectedSection,
} from '../../../features/portfolio/portfolioSlice'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

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
        dispatch(setSelectedSection({ _id: sectionId, type: 'services' }))
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'services' }))
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  )
}

export default function ServicesSection({ id, content }) {
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

  const iconSize =
    device === 'mobile'
      ? 'h-5 w-5'
      : device === 'tablet'
      ? 'h-6 w-6'
      : 'h-7 w-7'

  const getIcon = (iconName) => {
    if (!iconName) return LucideIcons.Layout

    const formatted = iconName
      .toLowerCase()
      .split(/[-_ ]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')

    return LucideIcons[formatted] || LucideIcons.Layout
  }

  const addService = () => {
    const next = [
      ...(content.services || []),
      {
        icon: 'layout',
        title: 'New Service',
        description: 'Service description',
        link: '',
      },
    ]

    dispatch(updateSection({ _id: id, content: { services: next } }))
  }

  const deleteService = (index) => {
    const next = content.services.filter((_, i) => i !== index)
    dispatch(updateSection({ _id: id, content: { services: next } }))
  }

  return (
    <section
      className="relative w-full py-10 px-6 bg-background"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'services' }))
      }
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className={cn('font-bold tracking-tight', headingSize)}>
            <EditableText
              value={content.heading}
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
            value={content.subHeading}
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

        <div className={cn('grid gap-6', gridCols)}>
          {content.services?.map((item, index) => {
            const Icon = getIcon(item.icon)

            return (
              <Card key={index} className="relative hover:shadow-md transition">
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteService(index)
                    }}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                  >
                    <LucideIcons.Trash size={16} />
                  </button>
                )}

                <CardHeader className="flex flex-col gap-3 items-start">
                  <div className="p-3 rounded-xl bg-muted">
                    <Icon className={iconSize} />
                  </div>

                  <CardTitle>
                    <EditableText
                      value={item.title}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.services]
                        next[index] = { ...next[index], title: val }
                        dispatch(updateSection({ _id: id, content: { services: next } }))
                      }}
                    />
                  </CardTitle>

                  <CardDescription>
                    <EditableParagraph
                      value={item.description}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = [...content.services]
                        next[index] = { ...next[index], description: val }
                        dispatch(updateSection({ _id: id, content: { services: next } }))
                      }}
                    />
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button variant="outline" className="w-full pointer-events-none">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              addService()
            }}
            className="w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition"
          >
            + Add Service
          </button>
        )}
      </div>
    </section>
  )
}
