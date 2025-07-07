import { Mountain } from 'lucide-react'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useDispatch, useSelector } from 'react-redux'
import { updateSection, setSelectedSection } from '../../../../../features/portfolio/portfolioSlice'
export default function HeroProps() {
    const disptach = useDispatch()
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
        disptach(updateSection({ _id: section._id, content: newContent }))
        disptach(setSelectedSection(section))
    }
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <Mountain />
                <span>Hero Section</span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="primary_heading">Primary Heading</Label>
                <Input name="primary_heading" type={"text"} onChange={handleChange("primaryHeading")} value={section.content.primaryHeading || ""} placeholder="Hi, I'm Harshad 👋" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="sec_heading">Secondary Heading</Label>
                <Textarea name="sec_heading" placeholder="I'm a full-stack developer passionate about building interactive websites and mobile apps. I specialize in React, Next.js, and Tailwind CSS." row="5" onChange={handleChange("secondaryHeading")} value={section.content.secondaryHeading || ""} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label >Call To Action</Label>
                <div className='flex flex-wrap space-x-3 space-y-3'>
                    <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>Primary</Button>
                    <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>Secondary</Button>
                </div>
            </div>
        </div>
    )
}
