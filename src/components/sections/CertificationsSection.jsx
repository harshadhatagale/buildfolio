'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

import DynamicIcon from '../icons/DynamicIcon'
import IconChooser from '../icons/iconChooser'

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
      onBlur={(e) => onChange(e.currentTarget.innerText)}
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
      onBlur={(e) => onChange(e.currentTarget.innerText)}
    >
      {value}
    </p>
  )
}

export default function CertificationsSection({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector((s) => s.portfolio.selectedSection)

  const [isSelected, setSelected] = useState(false)
  const [iconIndex, setIconIndex] = useState(null)

  useEffect(() => {
    setSelected(selectedSection?._id === id)
  }, [selectedSection, id])

  const updateItem = (index, patch) => {
    const next = [...content.items]
    next[index] = { ...next[index], ...patch }
    dispatch(updateSection({ _id: id, content: { items: next } }))
  }

  const addCertification = () => {
    dispatch(updateSection({
      _id: id,
      content: {
        items: [
          ...(content.items || []),
          {
            title: 'Certification Name',
            issuer: 'Issuer',
            year: 'Year',
            description: 'Certification description',
            icon: 'mdi:certificate',
            link: '',
          },
        ],
      },
    }))
  }

  const deleteCertification = (index) => {
    dispatch(updateSection({
      _id: id,
      content: {
        items: content.items.filter((_, i) => i !== index),
      },
    }))
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item, index) => (
            <Card key={index} className="relative hover:shadow-xl transition">
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteCertification(index)
                  }}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                >
                  <Trash size={16} />
                </button>
              )}

              <CardHeader className="flex flex-col gap-3 items-start">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isSelected) setIconIndex(index)
                  }}
                  className={cn(
                    'p-3 rounded-xl bg-muted cursor-pointer',
                    isSelected && 'outline outline-1 outline-dashed'
                  )}
                >
                  <DynamicIcon icon={item.icon} className="h-6 w-6" />
                </div>

                <CardTitle>
                  <EditableText
                    value={item.title}
                    sectionId={id}
                    isSelected={isSelected}
                    onChange={(val) => updateItem(index, { title: val })}
                  />
                </CardTitle>

                <CardDescription>
                  <EditableText
                    value={item.issuer}
                    sectionId={id}
                    isSelected={isSelected}
                    onChange={(val) => updateItem(index, { issuer: val })}
                  />
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <EditableText
                  value={item.year}
                  sectionId={id}
                  isSelected={isSelected}
                  className="text-sm text-muted-foreground"
                  onChange={(val) => updateItem(index, { year: val })}
                />

                <EditableParagraph
                  value={item.description}
                  sectionId={id}
                  isSelected={isSelected}
                  className="text-sm"
                  onChange={(val) =>
                    updateItem(index, { description: val })
                  }
                />
              </CardContent>

              {item.link && (
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full pointer-events-none"
                  >
                    View Certificate
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
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

      {iconIndex !== null && (
        <IconChooser
          value={content.items[iconIndex].icon}
          onChange={(icon) => {
            updateItem(iconIndex, { icon })
            setIconIndex(null)
          }}
        />
      )}
    </section>
  )
}
