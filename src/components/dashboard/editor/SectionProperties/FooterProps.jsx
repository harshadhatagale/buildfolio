import { HelpCircle } from 'lucide-react'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
export default function FooterProps() {
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
        <HelpCircle />
        <span>Footer</span>
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="heading">Heading</Label>
        <Input name="heading" type={"text"} onChange={handleChange("portfolioName")} value={section.content.portfolioName || ""} placeholder="Frequently Asked Questions" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="desc">Description</Label>
        <Textarea name="desc" placeholder="I'm a full-stack developer passionate about building interactive websites and mobile apps. I specialize in React, Next.js, and Tailwind CSS." row="5" onChange={handleChange("description")} value={section.content.description || ""} />
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email">Important Links</Label>
        <div className='flx flex-wrap space-x-3 space-y-3'>
          <TooltipProvider>
            {section.content.links.map((link) => (
              <Tooltip key={link.title}>
                <TooltipTrigger asChild>
                  <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>{link.title}</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='dark:text-black text-white'>{link.link}</p>
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
