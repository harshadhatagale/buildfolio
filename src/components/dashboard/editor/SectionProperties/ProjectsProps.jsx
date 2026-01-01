import { Code, Globe, Image, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useDispatch, useSelector } from 'react-redux'
import { updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
export default function ProjectsProps() {
    const dispatch = useDispatch()
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)
    const [editingIndex, setEditingIndex] = useState(null)
    const [newTag, setNewTag] = useState('')
    const [tagInputs, setTagInputs] = useState({})

    if (!selectedSection) return null

    const section = useSelector((state) =>
        state.portfolio.present.find(s => s._id === selectedSection._id)
    )
    if (!section) return null

    const projects = section.content.projects || []

    const handleSectionChange = (key) => (e) => {
        dispatch(updateSection({
            _id: section._id,
            content: { ...section.content, [key]: e.target.value }
        }))
    }

    const handleProjectChange = (index, key, value) => {
        const updatedProjects = [...projects]
        updatedProjects[index] = {
            ...updatedProjects[index],
            [key]: value
        }
        dispatch(updateSection({
            _id: section._id,
            content: { ...section.content, projects: updatedProjects }
        }))
    }

    const handleTagChange = (projectIndex, tagIndex, value) => {
        const updatedProjects = [...projects]
        const updatedTags = [...updatedProjects[projectIndex].tags]
        updatedTags[tagIndex] = value
        updatedProjects[projectIndex].tags = updatedTags
        dispatch(updateSection({
            _id: section._id,
            content: { ...section.content, projects: updatedProjects }
        }))
    }

    const addNewProject = () => {
        const newProject = {
            title: "New Project",
            description: "Project description",
            image: "https://via.placeholder.com/600x400",
            github: "",
            live: "",
            tags: ["New"]
        }
        dispatch(updateSection({
            _id: section._id,
            content: {
                ...section.content,
                projects: [...projects, newProject]
            }
        }))
        setEditingIndex(projects.length)
    }

    const removeProject = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index)
        dispatch(updateSection({
            _id: section._id,
            content: {
                ...section.content,
                projects: updatedProjects
            }
        }))
        if (editingIndex === index) setEditingIndex(null)
    }

    const addTag = (projectIndex) => {
        if (!newTag.trim()) return
        const updatedProjects = [...projects]
        updatedProjects[projectIndex].tags = [...updatedProjects[projectIndex].tags, newTag.trim()]
        dispatch(updateSection({
            _id: section._id,
            content: { ...section.content, projects: updatedProjects }
        }))
        setNewTag('')
    }

    const removeTag = (projectIndex, tagIndex) => {
        const updatedProjects = [...projects]
        updatedProjects[projectIndex].tags = updatedProjects[projectIndex].tags.filter((_, i) => i !== tagIndex)
        dispatch(updateSection({
            _id: section._id,
            content: { ...section.content, projects: updatedProjects }
        }))
    }

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
                <Code className='text-primary' />
                <h3 className="font-medium">{section.name}</h3>
            </div>
            <div className="space-y-3">
                <div>
                    <Label>Main Heading</Label>
                    <Input
                        value={section.content.heading || ""}
                        onChange={handleSectionChange("heading")}
                        placeholder="Projects"
                    />
                </div>
                <div>
                    <Label>Subheading</Label>
                    <Input
                        value={section.content.subHeading || ""}
                        onChange={handleSectionChange("subHeading")}
                        placeholder="Some of the cool things I've built recently"
                    />
                </div>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <Label>Projects</Label>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={addNewProject}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                    </Button>
                </div>

                <Accordion type="multiple" value={editingIndex !== null ? [editingIndex.toString()] : []}>
                    {projects.map((project, index) => (
                        <AccordionItem
                            key={index}
                            value={index.toString()}
                            className="border rounded-lg mb-3"
                        >
                            <div className="flex items-center">
                                <AccordionTrigger
                                    className="flex-1 px-4 hover:no-underline"
                                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={project.image} alt={project.title} />
                                            <AvatarFallback>{project.title.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <h4 className="text-sm font-medium">{project.title}</h4>
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2"
                                    onClick={() => removeProject(index)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>

                            <AccordionContent className="px-4 pb-4 space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <Label>Title</Label>
                                        <Input
                                            value={project.title}
                                            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>Description</Label>
                                        <Textarea
                                            value={project.description}
                                            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <Label>Image URL</Label>
                                        <div className="flex items-center gap-2">
                                            <Image className="w-4 h-4 text-muted-foreground" />
                                            <Input
                                                value={project.image}
                                                onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                                                placeholder="https://source.unsplash.com/600x400/?tech"
                                            />
                                        </div>
                                        {project.image && (
                                            <div className="mt-2">
                                                <img
                                                    src={project.image}
                                                    alt="Preview"
                                                    className="max-h-40 rounded-md object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label>
                                                <div className="flex items-center gap-2">
                                                    <Code className="w-4 h-4" />
                                                    GitHub URL
                                                </div>
                                            </Label>
                                            <Input
                                                value={project.github}
                                                onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
                                                placeholder="https://github.com/username/repo"
                                            />
                                        </div>
                                        <div>
                                            <Label>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4" />
                                                    Live URL
                                                </div>
                                            </Label>
                                            <Input
                                                value={project.live}
                                                onChange={(e) => handleProjectChange(index, 'live', e.target.value)}
                                                placeholder="https://project-demo.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Technologies</Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {project.tags?.map((tag, tagIndex) => (
                                                <Badge
                                                    key={tagIndex}
                                                    variant="outline"
                                                    className="group relative"
                                                >
                                                    <Input
                                                        value={tag}
                                                        onChange={(e) => handleTagChange(index, tagIndex, e.target.value)}
                                                        className="h-6 w-auto max-w-[100px] px-1 border-none bg-transparent"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-4 w-4 ml-1 hover:bg-transparent"
                                                        onClick={() => removeTag(index, tagIndex)}
                                                    >
                                                        <Trash2 className="w-3 h-3 text-red-500" />
                                                    </Button>
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                placeholder="New technology"
                                                className="flex-1"
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() => addTag(index)}
                                            >
                                                Add
                                            </Button>
                                        </div>
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