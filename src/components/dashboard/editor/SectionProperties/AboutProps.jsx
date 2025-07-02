import {UserCircle } from 'lucide-react'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useDispatch, useSelector} from 'react-redux'
import { updateSection, setSelectedSection } from '../../../../../features/portfolio/portfolioSlice'
export default function AboutProps() {
    const disptach = useDispatch()
    const sections = useSelector((state) => state.portfolio.present)
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)
    const index = sections.findIndex(
        (section) => section._id === selectedSection._id
    )
    const section= sections[index]
    const handleChange = (key) => (e) => {
        console.log(sections)
        const newContent = { ...section.content, [key]: e.target.value}
        disptach(updateSection({ _id: section._id, content: newContent }))
        disptach(setSelectedSection(section))
    }
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <UserCircle/>
                <span>About Section</span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Avatar link</Label>
                <Input type={"text"} onChange={handleChange("avatar")} value={section.content.avatar} placeholder="Hi, I'm Harshad 👋" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Heading</Label>
                <Input type={"text"} onChange={handleChange("heading")} value={section.content.heading} placeholder="About me" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">About</Label>
                <Textarea placeholder="I'm a full-stack developer passionate about building interactive websites and mobile apps. I specialize in React, Next.js, and Tailwind CSS." row="5" onChange={handleChange('about')} defaultValue={section.content.about}/>
            </div>
        </div>
    )
}
