'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Plus,
  Trash
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  updateSection,
  setSelectedSection,
} from '../../../features/portfolio/portfolioSlice'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  globe: Globe
}

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
        dispatch(setSelectedSection({ _id: sectionId, type: 'footer' }))
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
        dispatch(setSelectedSection({ _id: sectionId, type: 'footer' }))
      }}
      onBlur={(e) => onChange(e.target.innerText)}
    >
      {value}
    </p>
  )
}

export default function Footer({ id, content }) {
  const dispatch = useDispatch()
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedSection) return
    setSelected(selectedSection._id === id)
  }, [selectedSection, id])

  const addLink = () => {
    const next = [
      ...(content.links || []),
      { title: 'New Link', link: '#' },
    ]
    dispatch(updateSection({ _id: id, content: { links: next } }))
  }

  const deleteLink = (index) => {
    const next = content.links.filter((_, i) => i !== index)
    dispatch(updateSection({ _id: id, content: { links: next } }))
  }

  const addSocial = () => {
    const next = [
      ...(content.socials || []),
      { platform: 'Website', icon: 'globe', link: '#' },
    ]
    dispatch(updateSection({ _id: id, content: { socials: next } }))
  }

  const deleteSocial = (index) => {
    const next = content.socials.filter((_, i) => i !== index)
    dispatch(updateSection({ _id: id, content: { socials: next } }))
  }

  return (
    <footer
      className="relative w-full border-t bg-background px-6 py-5"
      onClick={() =>
        dispatch(setSelectedSection({ _id: id, type: 'footer' }))
      }
    >
      <div className="container py-3 flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold">
            <EditableText
              value={content?.portfolioName}
              sectionId={id}
              isSelected={isSelected}
              onChange={(val) =>
                dispatch(updateSection({
                  _id: id,
                  content: { portfolioName: val },
                }))
              }
            />
          </h2>

          {content?.description && (
            <EditableParagraph
              value={content.description}
              sectionId={id}
              isSelected={isSelected}
              className="text-sm text-muted-foreground max-w-sm"
              onChange={(val) =>
                dispatch(updateSection({
                  _id: id,
                  content: { description: val },
                }))
              }
            />
          )}

          <EditableText
            value={
              content?.copyright ||
              `© ${new Date().getFullYear()} All rights reserved.`
            }
            sectionId={id}
            isSelected={isSelected}
            className="text-xs text-muted-foreground block"
            onChange={(val) =>
              dispatch(updateSection({
                _id: id,
                content: { copyright: val },
              }))
            }
          />

          <p className="text-xs text-muted-foreground">
            Built with ❤️ using BuildFolio.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {content?.links?.map((link, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <EditableText
                value={link.title}
                sectionId={id}
                isSelected={isSelected}
                className="text-sm text-muted-foreground hover:underline"
                onChange={(val) => {
                  const next = [...content.links]
                  next[index] = { ...next[index], title: val }
                  dispatch(updateSection({ _id: id, content: { links: next } }))
                }}
              />

              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteLink(index)
                  }}
                  className="text-[10px] text-muted-foreground hover:text-destructive"
                >
                  remove
                </button>
              )}
            </div>
          ))}

          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                addLink()
              }}
              className="text-xs px-3 py-1 rounded border border-dashed text-muted-foreground hover:text-primary hover:border-primary"
            >
              + Link
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 justify-center md:justify-end">
          {content?.socials?.map((social, index) => {
            const Icon = iconMap[social.icon?.toLowerCase()] || Globe

            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Icon className="h-5 w-5" />
                </Button>

                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSocial(index)
                    }}
                    className="text-[10px] text-muted-foreground hover:text-destructive"
                  >
                    remove
                  </button>
                )}
              </div>
            )
          })}

          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                addSocial()
              }}
              className="text-xs px-3 py-1 rounded border border-dashed text-muted-foreground hover:text-primary hover:border-primary"
            >
              + Social
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
