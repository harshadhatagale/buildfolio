'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LayoutDashboard, Plus, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function NavProps() {
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
    if (!selectedSection) {
        return null
    }

    const handleLinkChange = (i, key, value) => {
        const newLinks = section.content.links.map((link, idx) =>
            idx === i ? { ...link, [key]: value } : link
        )
        const newContent = { ...section.content, links: newLinks }
        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
    }
    const handleAddLink = () => {
        const newLinks = [...section.content.links, { title: "", link: "" }]
        const newContent = { ...section.content, links: newLinks }
        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
    }
    const handleLinkDelete = (i) => {
        const newLinks = [...section.content.links]
        newLinks.splice(i, 1)
        const newContent = { ...section.content, links: newLinks }
        dispatch(updateSection({ _id: section._id, content: newContent }))
        dispatch(setSelectedSection({ ...section, content: newContent }))
    }
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <LayoutDashboard />
                <span>{section.name}</span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Portfolio Name</Label>
                <Input required type={"text"} placeholder="Enter your Portfolio name" value={section.content.portfolioName} onChange={handleChange("portfolioName")} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Links</Label>
                <div className='flx flex-wrap space-x-3 space-y-3'>
                    {section.content.links.map((link, index) => (
                        <LinkPopover onLinkChange={handleLinkChange} key={link._id} index={index} onLinkDelete={handleLinkDelete} link={link} />
                    ))}
                    <Button className='cursor-pointer' variant={"outline"} onClick={handleAddLink}><Plus /></Button>
                </div>
            </div>
        </div>
    )
}

const LinkPopover = ({ link, index, onLinkChange, onLinkDelete }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={"truncate"}>{link.title || "Untitled"}</Button>
            </PopoverTrigger>
            <PopoverContent className={"w-72 space-y-3"}>
                <div className="grid gap-2">
                    <Label>Title</Label>
                    <Input type={"text"} value={link.title} onChange={(e) => onLinkChange(index, "title", e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label>Link</Label>
                    <Input type={"text"} value={link.link} onChange={(e) => onLinkChange(index, "link", e.target.value)} />
                </div>
                <div className='flex justify-end'>
                    <Button variant={"destructive"} onClick={() => onLinkDelete(index)} size={"sm"}>
                        <Trash size={14} className='mr-1' />Delete
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}