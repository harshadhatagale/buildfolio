'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LayoutDashboard, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'

export default function NavProps() {
    const disptach = useDispatch()
    const sections = useSelector((state) => state.portfolio.present)
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)
    const index = sections.findIndex(
        (section) => section._id === selectedSection._id
    )
    const section= sections[index]
    const handleChange = (key) => (e) => {
        const newContent = { ...section.content, [key]: e.target.value}
        disptach(updateSection({ _id: section._id, content: newContent }))
        disptach(setSelectedSection(section))
    }
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <LayoutDashboard />
                <span>Navbar</span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Portfolio Name</Label>
                <Input required type={"text"} placeholder="Enter your Portfolio name" value={section.content.portfolioName} onChange={handleChange("portfolioName")} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Links</Label>
                <div className='flx flex-wrap space-x-3 space-y-3'>
                    <TooltipProvider>
                        {section.content.links.map((link) => (
                            <Tooltip key={link.title}>
                                <TooltipTrigger asChild>
                                    <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>{link.title}</Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className='dark:text-black text-white'>/{link.link}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                        <Button className='cursor-pointer' variant={"outline"}><Plus /></Button>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

