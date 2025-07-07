'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Swords } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Textarea } from '@/components/ui/textarea'

export default function SkillsProps() {
    const dispatch = useDispatch()
    const sections = useSelector((state) => state.portfolio.present)
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)
    if (!selectedSection) {
        return null
    }
    const index = sections.findIndex(
        (section) => section._id === selectedSection._id
    )
    if (index === -1) {
        return null
    }
    const section = sections[index]
    const handleChange = (key) => (e) => {
        const newContent = { ...section.content, [key]: e.target.value }
        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection(section))
    }
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <Swords />
                <span>{section.name}</span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="primary_heading">Primary heading</Label>
                <Input name="primary_heading" required type={"text"} placeholder="Enter your Portfolio name" value={section.content.primaryHeading} onChange={handleChange("primaryHeading")} />
                <Label htmlFor="desc">Description</Label>
                <Textarea name="desc" required type={"text"} placeholder="Enter your Portfolio name" value={section.content.secondaryHeading} onChange={handleChange("secondaryHeading")} />
                <div className='flex justify-between items-center'>
                    <p className='text-lg'>Skills</p>
                    <Plus className='text-lg cursor-pointer' />
                </div>
                <div className="flex flex-col justify-center gap-4">
                    {section.content.skills.map((skill, index) => (
                        <Badge
                            key={index}
                            className="text-base dark:text-slate-400 text-slate-800 px-3 py-1 rounded-xl shadow-sm border-muted bg-accent"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    )
}

