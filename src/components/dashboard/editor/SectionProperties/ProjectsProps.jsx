'use client'

import {
  Code,
  Globe,
  Image as ImageIcon,
  Plus,
  Trash2,
} from 'lucide-react'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useDispatch, useSelector } from 'react-redux'
import { updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export default function ProjectsProps() {
  const dispatch = useDispatch()
  const selectedSection = useSelector((s) => s.portfolio.selectedSection)

  const [editingIndex, setEditingIndex] = useState(null)
  const [newTag, setNewTag] = useState('')

  if (!selectedSection) return null

  const section = useSelector((state) =>
    state.portfolio.present.find((s) => s._id === selectedSection._id)
  )
  if (!section) return null

  const projects = section.content.projects || []

  const updateContent = (partial) => {
    dispatch(
      updateSection({
        _id: section._id,
        content: {
          ...section.content,
          ...partial,
        },
      })
    )
  }

  const updateProjects = (nextProjects) => {
    updateContent({ projects: nextProjects })
  }

  const handleProjectChange = (index, key, value) => {
    updateProjects(
      projects.map((p, i) =>
        i === index ? { ...p, [key]: value } : p
      )
    )
  }

  const addNewProject = () => {
    updateProjects([
      ...projects,
      {
        title: 'New Project',
        description: 'Project description',
        image: null,
        github: '',
        live: '',
        tags: ['React'],
      },
    ])
    setEditingIndex(projects.length)
  }

  const removeProject = (index) => {
    updateProjects(projects.filter((_, i) => i !== index))
    if (editingIndex === index) setEditingIndex(null)
  }

  const addTag = (projectIndex) => {
    if (!newTag.trim()) return

    updateProjects(
      projects.map((p, i) =>
        i === projectIndex
          ? { ...p, tags: [...(p.tags || []), newTag.trim()] }
          : p
      )
    )
    setNewTag('')
  }

  const removeTag = (projectIndex, tagIndex) => {
    updateProjects(
      projects.map((p, i) =>
        i === projectIndex
          ? { ...p, tags: p.tags.filter((_, t) => t !== tagIndex) }
          : p
      )
    )
  }

  const updateTag = (projectIndex, tagIndex, value) => {
    updateProjects(
      projects.map((p, i) =>
        i === projectIndex
          ? {
              ...p,
              tags: p.tags.map((t, ti) =>
                ti === tagIndex ? value : t
              ),
            }
          : p
      )
    )
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Code className="text-primary" />
        <h3 className="font-medium">{section.name}</h3>
      </div>

      {/* SECTION HEADINGS */}
      <div className="space-y-3">
        <div>
          <Label>Section Heading</Label>
          <Input
            value={section.content.heading || ''}
            onChange={(e) =>
              updateContent({ heading: e.target.value })
            }
            placeholder="Selected Work"
          />
        </div>

        <div>
          <Label>Sub Heading</Label>
          <Input
            value={section.content.subHeading || ''}
            onChange={(e) =>
              updateContent({ subHeading: e.target.value })
            }
            placeholder="A few projects that represent how I think and build"
          />
        </div>
      </div>

      {/* PROJECTS */}
      <div className="space-y-4">
        <Button
          size="sm"
          variant="outline"
          onClick={addNewProject}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>

        <Accordion
          type="single"
          collapsible
          value={
            editingIndex !== null
              ? editingIndex.toString()
              : undefined
          }
        >
          {projects.map((project, index) => (
            <AccordionItem
              key={index}
              value={index.toString()}
              className="border rounded-lg"
            >
              <div className="flex items-center">
                <AccordionTrigger
                  className="flex-1 px-4"
                  onClick={() =>
                    setEditingIndex(
                      editingIndex === index ? null : index
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={project.image || undefined}
                      />
                      <AvatarFallback>
                        {project.title?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {project.title}
                    </span>
                  </div>
                </AccordionTrigger>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              <AccordionContent className="px-4 pb-4 space-y-4">
                <Input
                  value={project.title}
                  onChange={(e) =>
                    handleProjectChange(
                      index,
                      'title',
                      e.target.value
                    )
                  }
                  placeholder="Project title"
                />

                <Textarea
                  value={project.description}
                  onChange={(e) =>
                    handleProjectChange(
                      index,
                      'description',
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Project description"
                />

                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  <Input
                    value={project.image || ''}
                    onChange={(e) =>
                      handleProjectChange(
                        index,
                        'image',
                        e.target.value || null
                      )
                    }
                    placeholder="Image URL"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={project.github}
                    onChange={(e) =>
                      handleProjectChange(
                        index,
                        'github',
                        e.target.value
                      )
                    }
                    placeholder="GitHub URL"
                  />
                  <Input
                    value={project.live}
                    onChange={(e) =>
                      handleProjectChange(
                        index,
                        'live',
                        e.target.value
                      )
                    }
                    placeholder="Live URL"
                  />
                </div>

                <div>
                  <Label>Technologies</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags?.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Input
                          value={tag}
                          onChange={(e) =>
                            updateTag(
                              index,
                              tagIndex,
                              e.target.value
                            )
                          }
                          className="h-6 w-24 border-none bg-transparent"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeTag(index, tagIndex)
                          }
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) =>
                        setNewTag(e.target.value)
                      }
                      placeholder="New technology"
                    />
                    <Button
                      size="sm"
                      onClick={() => addTag(index)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
