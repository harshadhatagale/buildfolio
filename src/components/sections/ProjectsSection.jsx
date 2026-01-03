'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'projects' }))
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'projects' }))
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  )
}

export default function ProjectsSection({ id, content }) {
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

  const addProject = () => {
    const next = [
      ...(content.projects || []),
      {
        title: 'Project Title',
        description: 'Short project description',
        tags: ['React', 'Next.js'],
        live: '',
        github: '',
      },
    ]

    dispatch(updateSection({ _id: id, content: { projects: next } }))
  }

  const deleteProject = (index) => {
    const next = content.projects.filter((_, i) => i !== index)
    dispatch(updateSection({ _id: id, content: { projects: next } }))
  }

  return (
    <section
      className="relative bg-background py-10 px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'projects' }))
      }
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className={cn('font-bold text-center', headingSize)}>
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

        <div className={cn('grid gap-6', gridCols)}>
          {content.projects?.map((project, index) => (
            <div
              key={index}
              className="relative bg-muted p-6 rounded-xl border border-border flex flex-col justify-between"
            >
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteProject(index)
                  }}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                >
                  <Trash size={16} />
                </button>
              )}

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  <EditableText
                    value={project.title}
                    sectionId={id}
                    isSelected={isSelected}
                    onChange={(val) => {
                      const next = [...content.projects]
                      next[index] = { ...next[index], title: val }
                      dispatch(updateSection({ _id: id, content: { projects: next } }))
                    }}
                  />
                </h3>

                <EditableParagraph
                  value={project.description}
                  sectionId={id}
                  isSelected={isSelected}
                  className="text-sm text-muted-foreground"
                  onChange={(val) => {
                    const next = [...content.projects]
                    next[index] = { ...next[index], description: val }
                    dispatch(updateSection({ _id: id, content: { projects: next } }))
                  }}
                />
              </div>

              <div className="flex gap-2 mt-4 pointer-events-none">
                <Button size="sm">Live</Button>
                <Button size="sm" variant="outline">Code</Button>
              </div>
            </div>
          ))}
        </div>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              addProject()
            }}
            className="w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Project
          </button>
        )}
      </div>
    </section>
  )
}
