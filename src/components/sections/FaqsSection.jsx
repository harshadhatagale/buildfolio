'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Plus, Trash } from 'lucide-react'
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'faqs' }))
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'faqs' }))
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  )
}

export default function FaqsSection({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedSection) return
    setSelected(selectedSection._id === id)
  }, [selectedSection, id])

  const addFaq = () => {
    const next = [
      ...(content.items || []),
      { question: 'New question?', answer: 'Answer goes here.' },
    ]

    dispatch(
      updateSection({
        _id: id,
        content: { items: next },
      })
    )
  }

  const deleteFaq = (index) => {
    const next = content.items.filter((_, i) => i !== index)

    dispatch(
      updateSection({
        _id: id,
        content: { items: next },
      })
    )
  }

  return (
    <section
      className="relative w-full py-3 bg-background px-6"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'faqs' }))
      }
    >
      <div className="container space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            <EditableText
              value={content?.heading || 'FAQs'}
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
            value={content?.subHeading || 'Common questions and answers.'}
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

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto space-y-2"
        >
          {content?.items?.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <div className="group relative">
                <AccordionTrigger
                  onClick={(e) => e.stopPropagation()}
                  className="text-left pr-10"
                >
                  <EditableText
                    value={item.question}
                    sectionId={id}
                    isSelected={isSelected}
                    onChange={(val) => {
                      const next = [...content.items]
                      next[index] = { ...next[index], question: val }
                      dispatch(updateSection({
                        _id: id,
                        content: { items: next },
                      }))
                    }}
                  />
                </AccordionTrigger>

                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteFaq(index)
                    }}
                    className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>

              <AccordionContent>
                <EditableParagraph
                  value={item.answer}
                  sectionId={id}
                  isSelected={isSelected}
                  className="text-muted-foreground"
                  onChange={(val) => {
                    const next = [...content.items]
                    next[index] = { ...next[index], answer: val }
                    dispatch(updateSection({
                      _id: id,
                      content: { items: next },
                    }))
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {isSelected && (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                addFaq()
              }}
              className="
        w-full
        mt-4
        py-4
        rounded-lg
        border border-dashed
        border-muted
        text-muted-foreground
        text-base
        font-medium
        hover:border-primary
        hover:text-primary
        hover:bg-muted/40
        transition
        flex
        items-center
        justify-center
        gap-2
      "
            >
              <Plus size={18} />
              Add new FAQ
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
