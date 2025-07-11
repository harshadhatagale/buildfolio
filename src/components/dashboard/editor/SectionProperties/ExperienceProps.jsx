'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Briefcase, Plus, X, ChevronUp, ChevronDown, Pencil, Trash2, Check } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-hot-toast'
import { Badge } from '@/components/ui/badge'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, parse } from "date-fns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function ExperienceProps() {
    const dispatch = useDispatch()
    const sections = useSelector((state) => state.portfolio.present)
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)
    const [newExperience, setNewExperience] = useState({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
        technologies: ''
    })
    const [editingIndex, setEditingIndex] = useState(-1)
    const [isAdding, setIsAdding] = useState(false)
    const [startDate, setStartDate] = useState(undefined)
    const [endDate, setEndDate] = useState(undefined)
    const [editStartDate, setEditStartDate] = useState(undefined)
    const [editEndDate, setEditEndDate] = useState(undefined)

    if (!selectedSection) return null

    const index = sections.findIndex(section => section._id === selectedSection._id)
    if (index === -1) return null

    const section = sections[index]

    const handleChange = (key) => (e) => {
        const newContent = { ...section.content, [key]: e.target.value }
        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
    }

    const handleExperienceChange = (key, value, index) => {
        const updatedExperiences = [...section.content.experiences]
        updatedExperiences[index] = { ...updatedExperiences[index], [key]: value }

        const newContent = {
            ...section.content,
            experiences: updatedExperiences
        }

        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
    }

    const handleAddExperience = () => {
        if (!newExperience.jobTitle.trim() || !newExperience.companyName.trim()) {
            toast.error('Job title and company name are required')
            return
        }

        const formattedStartDate = startDate ? format(startDate, 'MMM yyyy') : ''
        const formattedEndDate = endDate ? format(endDate, 'MMM yyyy') : 'Present'

        const experienceToAdd = {
            ...newExperience,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        }

        const newContent = {
            ...section.content,
            experiences: [...section.content.experiences, experienceToAdd]
        }

        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
        setNewExperience({
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
            responsibilities: '',
            technologies: ''
        })
        setStartDate(undefined)
        setEndDate(undefined)
        setIsAdding(false)
        toast.success('Experience added')
    }

    const handleEditExperience = (index) => {
        const experience = section.content.experiences[index]
        setNewExperience({
            jobTitle: experience.jobTitle,
            companyName: experience.companyName,
            startDate: experience.startDate,
            endDate: experience.endDate,
            responsibilities: experience.responsibilities,
            technologies: experience.technologies
        })
        
        // Parse the dates if they exist
        if (experience.startDate) {
            try {
                setEditStartDate(parse(experience.startDate, 'MMM yyyy', new Date()))
            } catch {
                setEditStartDate(undefined)
            }
        }
        if (experience.endDate && experience.endDate !== 'Present') {
            try {
                setEditEndDate(parse(experience.endDate, 'MMM yyyy', new Date()))
            } catch {
                setEditEndDate(undefined)
            }
        }
        
        setEditingIndex(index)
        setIsAdding(true)
    }

    const handleUpdateExperience = () => {
        if (!newExperience.jobTitle.trim() || !newExperience.companyName.trim()) {
            toast.error('Job title and company name are required')
            return
        }

        const formattedStartDate = startDate ? format(startDate, 'MMM yyyy') : ''
        const formattedEndDate = endDate ? format(endDate, 'MMM yyyy') : 'Present'

        const updatedExperience = {
            ...newExperience,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        }

        const updatedExperiences = [...section.content.experiences]
        updatedExperiences[editingIndex] = updatedExperience

        const newContent = {
            ...section.content,
            experiences: updatedExperiences
        }

        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
        
        setNewExperience({
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
            responsibilities: '',
            technologies: ''
        })
        setStartDate(undefined)
        setEndDate(undefined)
        setEditStartDate(undefined)
        setEditEndDate(undefined)
        setEditingIndex(-1)
        setIsAdding(false)
        toast.success('Experience updated')
    }

    const handleDeleteExperience = (index) => {
        const updatedExperiences = [...section.content.experiences]
        updatedExperiences.splice(index, 1)

        const newContent = {
            ...section.content,
            experiences: updatedExperiences
        }

        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
        toast.success('Experience removed')
    }

    const handleMoveExperience = (index, direction) => {
        if ((direction === 'up' && index === 0) ||
            (direction === 'down' && index === section.content.experiences.length - 1)) {
            return
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1
        const updatedExperiences = [...section.content.experiences]
        const temp = updatedExperiences[index]
        updatedExperiences[index] = updatedExperiences[newIndex]
        updatedExperiences[newIndex] = temp

        const newContent = {
            ...section.content,
            experiences: updatedExperiences
        }

        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
    }

    return (
        <div className='w-full flex flex-col justify-center items-center gap-6'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <Briefcase className="text-primary" />
                <h2>{section.name}</h2>
            </div>

            <div className="w-full max-w-2xl space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="primary_heading">Section Title</Label>
                    <Input
                        id="primary_heading"
                        type="text"
                        placeholder="e.g. Work Experience"
                        value={section.content.primaryHeading || ''}
                        onChange={handleChange("primaryHeading")}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="desc">Description</Label>
                    <Textarea
                        id="desc"
                        placeholder="Brief introduction about your experience"
                        value={section.content.secondaryHeading || ''}
                        onChange={handleChange("secondaryHeading")}
                        rows={3}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex space-y-2 flex-col justify-between items-center">
                        <h3 className="text-lg font-medium">Work Experiences</h3>
                        <Button
                            size="sm"
                            onClick={() => {
                                setIsAdding(true)
                                setEditingIndex(-1)
                                setNewExperience({
                                    jobTitle: '',
                                    companyName: '',
                                    startDate: '',
                                    endDate: '',
                                    responsibilities: '',
                                    technologies: ''
                                })
                                setStartDate(undefined)
                                setEndDate(undefined)
                            }}
                            disabled={isAdding}
                        >
                            <Plus size={16} className="mr-2" />
                            Add Experience
                        </Button>
                    </div>

                    {(isAdding || editingIndex !== -1) && (
                        <div className="border rounded-lg p-4 space-y-4 bg-card">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Job Title*</Label>
                                    <Input
                                        value={newExperience.jobTitle}
                                        onChange={(e) => setNewExperience({ ...newExperience, jobTitle: e.target.value })}
                                        placeholder="e.g. Frontend Developer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Company*</Label>
                                    <Input
                                        value={newExperience.companyName}
                                        onChange={(e) => setNewExperience({ ...newExperience, companyName: e.target.value })}
                                        placeholder="e.g. Google"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Start Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className="w-full justify-start text-sm text-left overflow-hidden"
                                            >
                                                {startDate || editStartDate ? format(startDate || editStartDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={startDate || editStartDate}
                                                onSelect={(date) => {
                                                    if (editingIndex !== -1) {
                                                        setEditStartDate(date)
                                                    } else {
                                                        setStartDate(date)
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label>End Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className="w-full justify-start text-sm text-left overflow-hidden"
                                            >
                                                {endDate || editEndDate ? format(endDate || editEndDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={endDate || editEndDate}
                                                onSelect={(date) => {
                                                    if (editingIndex !== -1) {
                                                        setEditEndDate(date)
                                                    } else {
                                                        setEndDate(date)
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Responsibilities</Label>
                                <Textarea
                                    value={newExperience.responsibilities}
                                    onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}
                                    placeholder="Describe your key responsibilities"
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Technologies</Label>
                                <Input
                                    value={newExperience.technologies}
                                    onChange={(e) => setNewExperience({ ...newExperience, technologies: e.target.value })}
                                    placeholder="e.g. React, Node.js, TypeScript"
                                />
                            </div>
                            <div className="flex justify-between gap-2">
                                <Button
                                    variant="outline"
                                    size={"sm"}
                                    onClick={() => {
                                        setIsAdding(false)
                                        setEditingIndex(-1)
                                        setNewExperience({
                                            jobTitle: '',
                                            companyName: '',
                                            startDate: '',
                                            endDate: '',
                                            responsibilities: '',
                                            technologies: ''
                                        })
                                        setStartDate(undefined)
                                        setEndDate(undefined)
                                        setEditStartDate(undefined)
                                        setEditEndDate(undefined)
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button size={"sm"} onClick={editingIndex !== -1 ? handleUpdateExperience : handleAddExperience}>
                                    <Check size={16} className="mr-2" />
                                    {editingIndex !== -1 ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <Accordion type="single" collapsible>
                            {section.content.experiences?.map((exp, index) => (
                                <AccordionItem key={index} value={exp.jobTitle + index}>
                                    <div className="flex items-center">
                                        <AccordionTrigger className="flex-1">
                                            <h4 className="text-sm font-medium">{exp.jobTitle}</h4>
                                        </AccordionTrigger>
                                        <div className="flex gap-1 pr-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleEditExperience(index)
                                                }}
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDeleteExperience(index)
                                                }}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                    <AccordionContent>
                                        <div className="border rounded-lg p-4 space-y-3 group hover:border-primary transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-muted-foreground">{exp.companyName}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 text-sm text-muted-foreground">
                                                <span>{exp.startDate}</span>
                                                <span>-</span>
                                                <span>{exp.endDate}</span>
                                            </div>
                                            <p className="text-sm mt-2">{exp.responsibilities}</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {exp.technologies.split(',').map((tech, i) => (
                                                    <Badge key={i} variant="secondary" className="px-2 py-1 text-xs">
                                                        {tech.trim()}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}