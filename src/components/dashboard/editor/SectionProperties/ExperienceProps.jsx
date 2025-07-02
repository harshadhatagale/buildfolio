'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Briefcase, LayoutDashboard, Plus, Swords } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Textarea } from '@/components/ui/textarea'

export default function ExperienceProps() {
    const disptach = useDispatch()
    const sections = useSelector((state) => state.portfolio.present)
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)
    const index = sections.findIndex(
        (section) => section._id === selectedSection._id
    )
    const section = sections[index]
    const handleChange = (key) => (e) => {
        const newContent = { ...section.content, [key]: e.target.value }
        disptach(updateSection({ _id: section._id, content: newContent }))
        disptach(setSelectedSection(section))
    }
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <Briefcase />
                <span>Experiences</span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="primary_heading">Primary heading</Label>
                <Input name="primary_heading" required type={"text"} placeholder="Enter your Portfolio name" value={section.content.primaryHeading} onChange={handleChange("primaryHeading")} />
                <Label htmlFor="desc">Description</Label>
                <Textarea name="desc" required type={"text"} placeholder="Enter your Portfolio name" value={section.content.secondaryHeading} onChange={handleChange("secondaryHeading")} />
                
            </div>
        </div>
    )
}

