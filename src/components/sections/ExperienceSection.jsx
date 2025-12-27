'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
import { Trash, Plus } from 'lucide-react'
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'experience' }))
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'experience' }))
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
    <span
      contentEditable
      suppressContentEditableWarning
      className={cn(
        'bg-muted text-foreground px-3 py-1 rounded-full text-sm border border-border cursor-text',
        isSelected
          ? 'outline outline-2 outline-primary'
          : 'outline-none'
      )}
      onClick={(e) => {
        e.stopPropagation()
        dispatch(setSelectedSection({ _id: sectionId, type: 'experience' }))
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          e.currentTarget.blur()
        }
        if (e.key === 'Backspace' && e.currentTarget.innerText === '') {
          e.preventDefault()
          onDelete()
        }
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </span>
  )
}

export default function ExperienceSection({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedSection) return
    setSelected(selectedSection._id === id)
  }, [selectedSection, id])

  const parseTechString = (str = '') =>
    str.split(',').map(t => t.trim()).filter(Boolean)

  const stringifyTechs = (arr) => arr.join(', ')

  const addExperience = () => {
    const next = [
      ...content.experiences,
      {
        jobTitle: 'Job Title',
        companyName: 'Company Name',
        startDate: 'Start',
        endDate: 'End',
        responsibillities: 'Describe your role here...',
        technologies: 'Tech1, Tech2',
      },
    ]

    dispatch(updateSection({ _id: id, content: { experiences: next } }))
  }

  const deleteExperience = (index) => {
    const next = content.experiences.filter((_, i) => i !== index)
    dispatch(updateSection({ _id: id, content: { experiences: next } }))
  }

  return (
    <section
      className="relative bg-background py-10 px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'experience' }))
      }
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-5">
          <EditableText
            value={content.primaryHeading}
            sectionId={id}
            isSelected={isSelected}
            onChange={(val) =>
              dispatch(updateSection({
                _id: id,
                content: { primaryHeading: val },
              }))
            }
          />
        </h2>

        <div className="space-y-8">
          {content.experiences.map((exp, idx) => {
            const techArray = parseTechString(exp.technologies)

            return (
              <div
                key={idx}
                className="relative bg-background rounded-xl shadow-md p-6 border border-border hover:shadow-lg transition-shadow"
              >
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteExperience(idx)
                    }}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition"
                  >
                    <Trash size={16} />
                  </button>
                )}

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    <EditableText
                      value={exp.jobTitle}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const updated = [...content.experiences]
                        updated[idx] = { ...updated[idx], jobTitle: val }
                        dispatch(updateSection({ _id: id, content: { experiences: updated } }))
                      }}
                    />
                    <span className="text-primary">
                      {' '}@{' '}
                      <EditableText
                        value={exp.companyName}
                        sectionId={id}
                        isSelected={isSelected}
                        onChange={(val) => {
                          const updated = [...content.experiences]
                          updated[idx] = { ...updated[idx], companyName: val }
                          dispatch(updateSection({ _id: id, content: { experiences: updated } }))
                        }}
                      />
                    </span>
                  </h3>

                  <span className="text-sm text-muted-foreground">
                    <EditableText
                      value={exp.startDate}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const updated = [...content.experiences]
                        updated[idx] = { ...updated[idx], startDate: val }
                        dispatch(updateSection({ _id: id, content: { experiences: updated } }))
                      }}
                    />
                    {' - '}
                    <EditableText
                      value={exp.endDate}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const updated = [...content.experiences]
                        updated[idx] = { ...updated[idx], endDate: val }
                        dispatch(updateSection({ _id: id, content: { experiences: updated } }))
                      }}
                    />
                  </span>
                </div>

                <EditableParagraph
                  value={exp.responsibillities}
                  sectionId={id}
                  isSelected={isSelected}
                  className="mt-4 text-muted-foreground"
                  onChange={(val) => {
                    const updated = [...content.experiences]
                    updated[idx] = { ...updated[idx], responsibillities: val }
                    dispatch(updateSection({ _id: id, content: { experiences: updated } }))
                  }}
                />

                <div className="mt-5 flex flex-wrap gap-2">
                  {techArray.map((tech, techIdx) => (
                    <EditableChip
                      key={techIdx}
                      value={tech}
                      sectionId={id}
                      isSelected={isSelected}
                      onChange={(val) => {
                        const next = techArray.map((t, i) =>
                          i === techIdx ? val : t
                        )
                        const updated = [...content.experiences]
                        updated[idx] = {
                          ...updated[idx],
                          technologies: stringifyTechs(next),
                        }
                        dispatch(updateSection({ _id: id, content: { experiences: updated } }))
                      }}
                      onDelete={() => {
                        const next = techArray.filter((_, i) => i !== techIdx)
                        const updated = [...content.experiences]
                        updated[idx] = {
                          ...updated[idx],
                          technologies: stringifyTechs(next),
                        }
                        dispatch(updateSection({ _id: id, content: { experiences: updated } }))
                      }}
                    />
                  ))}

                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const next = [...techArray, 'New Tech']
                        const updated = [...content.experiences]
                        updated[idx] = {
                          ...updated[idx],
                          technologies: stringifyTechs(next),
                        }
                        dispatch(updateSection({ _id: id, content: { experiences: updated } }))
                      }}
                      className="text-xs px-3 py-1 rounded-full border border-dashed text-muted-foreground hover:text-primary hover:border-primary"
                    >
                      + Add Tech
                    </button>
                  )}
                </div>
              </div>
            )
          })}

          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                addExperience()
              }}
              className="w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Experience
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
