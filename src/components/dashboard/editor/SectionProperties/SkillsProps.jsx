'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Swords, X, Edit2, Check, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export default function SkillsProps() {
    const dispatch = useDispatch()
    const sections = useSelector((state) => state.portfolio.present)
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)
    const [newSkill, setNewSkill] = useState('')
    const [editingIndex, setEditingIndex] = useState(-1)
    const [editValue, setEditValue] = useState('')

    if (!selectedSection) return null

    const index = sections.findIndex(section => section._id === selectedSection._id)
    if (index === -1) return null

    const section = sections[index]

    const handleChange = (key) => (e) => {
        const newContent = { ...section.content, [key]: e.target.value }
        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
    }

    const handleAddSkill = () => {
        if (!newSkill.trim()) {
            toast.error('Skill cannot be empty')
            return
        }

        if (section.content.skills.includes(newSkill)) {
            toast.error('Skill already exists')
            return
        }

        const newContent = {
            ...section.content,
            skills: [...section.content.skills, newSkill]
        }

        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
        setNewSkill('')
        toast.success('Skill added')
    }

    const handleDeleteSkill = (skillIndex) => {
        const updatedSkills = [...section.content.skills]
        updatedSkills.splice(skillIndex, 1)

        const newContent = {
            ...section.content,
            skills: updatedSkills
        }

        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
        toast.success('Skill removed')
    }

    const startEditing = (index) => {
        setEditingIndex(index)
        setEditValue(section.content.skills[index])
    }

    const saveEdit = () => {
        if (!editValue.trim()) {
            toast.error('Skill cannot be empty')
            return
        }

        const updatedSkills = [...section.content.skills]
        updatedSkills[editingIndex] = editValue

        const newContent = {
            ...section.content,
            skills: updatedSkills
        }

        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
        setEditingIndex(-1)
        toast.success('Skill updated')
    }

    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <Swords className="text-primary" />
                <span>{section.name}</span>
            </div>

            <div className="grid w-full items-center gap-4">
                <div className="space-y-2">
                    <Label htmlFor="primary_heading">Primary heading</Label>
                    <Input
                        id="primary_heading"
                        type="text"
                        placeholder="e.g. My Skills"
                        value={section.content.primaryHeading || ''}
                        onChange={handleChange("primaryHeading")}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="desc">Description</Label>
                    <Textarea
                        id="desc"
                        placeholder="Describe your skills"
                        value={section.content.secondaryHeading || ''}
                        onChange={handleChange("secondaryHeading")}
                        rows={3}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex flex-col items-center">
                    <Label className={"mb-2"}>Skills</Label>
                    <div className="flex gap-1 justify-center items-center">
                        <Input
                            type="text"
                            placeholder="Add new skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="w-35"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                        <Button
                            size="sm"
                            onClick={handleAddSkill}
                            disabled={!newSkill.trim()}
                            variant={"outline"}
                            className={"bg-primary dark:bg-primary text-white dark:text-white"}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                    {section.content.skills?.map((skill, index) => (
                        <div key={index} className="relative group">
                            {editingIndex === index ? (
                                <div className="flex gap-1">
                                    <Input
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="h-8"
                                        autoFocus
                                    />
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={saveEdit}
                                    >
                                        <Check size={16} />
                                    </Button>
                                </div>
                            ) : (
                                <Badge
                                    variant="outline"
                                    className="px-3 py-2 text-sm font-medium rounded-lg group-hover:bg-accent/50 transition-colors"
                                >
                                    {skill}
                                    <div className="ml-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => startEditing(index)}
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSkill(index)}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </Badge>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}