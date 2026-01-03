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

/* ---------- Editable Components ---------- */

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

/* ---------- Image Fallback ---------- */

const ProjectImageFallback = ({ title }) => {
  const letter = title?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="aspect-video rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border">
      <span className="text-5xl font-bold text-primary/70">
        {letter}
      </span>
    </div>
  )
}

/* ---------- Main Section ---------- */

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

  const updateContent = (partial) => {
    dispatch(
      updateSection({
        _id: id,
        content: {
          ...content,
          ...partial,
        },
      })
    )
  }

  const addProject = () => {
    updateContent({
      projects: [
        ...(content.projects || []),
        {
          title: 'New Project',
          description: 'Short project description',
          image: null,
          github: '',
          live: '',
          tags: ['React'],
        },
      ],
    })
  }

  const deleteProject = (index) => {
    updateContent({
      projects: content.projects.filter((_, i) => i !== index),
    })
  }

  return (
    <section
      className="relative bg-background py-12 px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'projects' }))
      }
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className={cn('font-bold', headingSize)}>
            <EditableText
              value={content.heading}
              sectionId={id}
              isSelected={isSelected}
              onChange={(val) => updateContent({ heading: val })}
            />
          </h2>

          {content.subHeading && (
            <EditableParagraph
              value={content.subHeading}
              sectionId={id}
              isSelected={isSelected}
              className="text-muted-foreground max-w-2xl mx-auto"
              onChange={(val) => updateContent({ subHeading: val })}
            />
          )}
        </div>

        <div className={cn('grid gap-6', gridCols)}>
          {content.projects?.map((project, index) => (
            <div
              key={index}
              className="relative bg-muted p-6 rounded-xl border border-border flex flex-col gap-4"
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

              {project.image && project.image.trim() !== '' ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg aspect-video object-cover"
                />
              ) : (
                <ProjectImageFallback title={project.title} />
              )}

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  <EditableText
                    value={project.title}
                    sectionId={id}
                    isSelected={isSelected}
                    onChange={(val) => {
                      const next = [...content.projects]
                      next[index] = { ...next[index], title: val }
                      updateContent({ projects: next })
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
                    updateContent({ projects: next })
                  }}
                />
              </div>

              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-background border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-auto">
                {project.live && (
                  <Button size="sm" asChild>
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.github} target="_blank" rel="noreferrer">
                      Code
                    </a>
                  </Button>
                )}
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
