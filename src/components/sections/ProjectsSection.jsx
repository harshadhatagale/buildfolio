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

const EditableChip = ({ value, onChange, onDelete, sectionId, isSelected }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        contentEditable
        suppressContentEditableWarning
        className={cn(
          'bg-background text-foreground px-2 py-1 rounded text-xs border cursor-text',
          isSelected
            ? 'outline outline-2 outline-primary'
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

      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="text-[10px] text-muted-foreground hover:text-destructive"
        >
          remove
        </button>
      )}
    </div>
  )
}

export default function ProjectsSection({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedSection) return
    setSelected(selectedSection._id === id)
  }, [selectedSection, id])

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
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
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

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {content?.projects?.map((project, index) => (
            <div
              key={index}
              className="relative bg-muted p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between"
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
                <h3 className="text-xl font-semibold text-foreground mb-2">
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
                  className="text-muted-foreground text-sm mb-4"
                  onChange={(val) => {
                    const next = [...content.projects]
                    next[index] = { ...next[index], description: val }
                    dispatch(updateSection({ _id: id, content: { projects: next } }))
                  }}
                />

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIdx) => (
                    <EditableChip
                      key={tagIdx}
                      value={tag}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const nextTags = project.tags.map((t, i) =>
                          i === tagIdx ? val : t
                        )
                        const next = [...content.projects]
                        next[index] = { ...next[index], tags: nextTags }
                        dispatch(updateSection({ _id: id, content: { projects: next } }))
                      }}
                      onDelete={() => {
                        const nextTags = project.tags.filter((_, i) => i !== tagIdx)
                        const next = [...content.projects]
                        next[index] = { ...next[index], tags: nextTags }
                        dispatch(updateSection({ _id: id, content: { projects: next } }))
                      }}
                    />
                  ))}

                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const next = [...content.projects]
                        next[index] = {
                          ...next[index],
                          tags: [...project.tags, 'New Tag'],
                        }
                        dispatch(updateSection({ _id: id, content: { projects: next } }))
                      }}
                      className="text-xs px-2 py-1 rounded border border-dashed text-muted-foreground hover:text-primary hover:border-primary"
                    >
                      + Tag
                    </button>
                  )}
                </div>
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
            className="mt-10 w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Project
          </button>
        )}
      </div>
    </section>
  )
}
