'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, Plus } from 'lucide-react'
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'skills' }))
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'skills' }))
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  )
}

const EditableChip = ({
  value,
  onChange,
  onDelete,
  sectionId,
  isSelected,
}) => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        contentEditable
        suppressContentEditableWarning
        className={cn(
          'bg-muted text-foreground px-4 py-2 rounded-xl text-base border border-muted cursor-text',
          isSelected
            ? 'outline outline-2 outline-primary'
            : 'outline-none'
        )}
        onClick={(e) => {
          e.stopPropagation()
          dispatch(setSelectedSection({ _id: sectionId, type: 'skills' }))
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
          className="text-xs text-muted-foreground hover:text-destructive transition flex items-center gap-1"
        >
          <X size={12} />
          Remove
        </button>
      )}
    </div>
  )
}

export default function SkillsSection({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedSection) return
    setSelected(selectedSection._id === id)
  }, [selectedSection, id])

  const normalizeSkills = (skills) => {
    if (Array.isArray(skills)) return [...skills]
    if (typeof skills === 'string')
      return skills.split(',').map(s => s.trim()).filter(Boolean)
    return []
  }

  return (
    <section
      className="relative bg-background py-10 px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'skills' }))
      }
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
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

        <EditableParagraph
          value={content.secondaryHeading}
          sectionId={id}
          isSelected={isSelected}
          className="text-muted-foreground mb-8 text-base md:text-lg"
          onChange={(val) =>
            dispatch(updateSection({
              _id: id,
              content: { secondaryHeading: val },
            }))
          }
        />

        <div className="flex flex-wrap justify-center gap-4">
          {normalizeSkills(content.skills).map((skill, index) => (
            <EditableChip
              key={index}
              value={skill}
              sectionId={id}
              isSelected={isSelected}
              onChange={(val) => {
                const nextSkills = normalizeSkills(content.skills).map(
                  (s, i) => (i === index ? val : s)
                )

                dispatch(updateSection({
                  _id: id,
                  content: { skills: nextSkills },
                }))
              }}
              onDelete={() => {
                const nextSkills = normalizeSkills(content.skills).filter(
                  (_, i) => i !== index
                )

                dispatch(updateSection({
                  _id: id,
                  content: { skills: nextSkills },
                }))
              }}
            />
          ))}
        </div>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              dispatch(updateSection({
                _id: id,
                content: {
                  skills: [...normalizeSkills(content.skills), 'New Skill'],
                },
              }))
            }}
            className="mt-6 w-full py-4 rounded-xl border border-dashed text-muted-foreground hover:text-primary hover:border-primary hover:bg-muted/40 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Skill
          </button>
        )}
      </div>
    </section>
  )
}
