'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LayoutDashboard, Plus, Trash } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSection, updateSection } from '../../../../../features/portfolio/portfolioSlice'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { v4 as uuidv4 } from 'uuid'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NavProps() {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)

  if (!selectedSection) return null

  const index = sections.findIndex((section) => section._id === selectedSection._id)
  if (index === -1) return null

  const section = sections[index]

  const handleChange = (key) => (e) => {
    const newContent = { ...section.content, [key]: e.target.value }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
  }

  const handleLinkChange = (i, key, value) => {
    const updatedLinks = section.content.links.map((link, idx) =>
      idx === i ? { ...link, [key]: value } : link
    )
    const newContent = { ...section.content, links: updatedLinks }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
  }

  const handleAddLink = () => {
    // Validate title uniqueness before adding
    const existingTitles = section.content.links.map((l) => l.name)
    const untitledCount = section.content.links.filter((l) => l.title.startsWith("Untitled")).length
    const title = `Untitled ${untitledCount + 1}`

    if (existingTitles.includes(title)) {
      alert("Duplicate title. Please rename existing links before adding new ones.")
      return
    }

    const newLink = {
      id: `link-${uuidv4()}`,
      title,
      link: "",
    }
    const newContent = { ...section.content, links: [...section.content.links, newLink] }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
  }

  const handleLinkDelete = (i) => {
    const updatedLinks = [...section.content.links]
    updatedLinks.splice(i, 1)
    const newContent = { ...section.content, links: updatedLinks }
    dispatch(updateSection({ _id: section._id, content: newContent }))
    dispatch(setSelectedSection({ ...section, content: newContent }))
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-4'>
      <div className='w-full flex justify-start gap-3 items-center'>
        <LayoutDashboard className='text-primary'/>
        <span>{section.name}</span>
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Portfolio Name</Label>
        <Input
          type="text"
          placeholder="Enter your Portfolio name"
          value={section.content.portfolioName}
          onChange={handleChange("portfolioName")}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Links</Label>
        <div className='flex flex-col gap-3'>
          {section.content.links.map((link, index) => (
            <LinkPopover
              key={index}
              link={link}
              index={index}
              allSections={sections}
              onLinkChange={handleLinkChange}
              onLinkDelete={handleLinkDelete}
            />
          ))}
          <Button variant="outline" onClick={handleAddLink}><Plus size={16} /></Button>
        </div>
      </div>
    </div>
  )
}

export const slugify = (text) => {
  return text
    .toString()                           // Convert to string
    .toLowerCase()                        // Convert to lowercase
    .trim()                              // Trim whitespace from both ends
    .replace(/\s+/g, '-')                // Replace spaces with -
    .replace(/[^\w\-]+/g, '')            // Remove all non-word chars
    .replace(/\-\-+/g, '-')              // Replace multiple - with single -
    .replace(/^-+/, '')                  // Trim - from start of text
    .replace(/-+$/, '');
}
const LinkPopover = ({ link, index, onLinkChange, onLinkDelete, allSections }) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="truncate min-w-[120px]">{link.title || "Untitled"}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 space-y-3">
        <div className="grid gap-2">
          <Label>Title</Label>
          <Input
            type="text"
            value={link.title}
            onChange={(e) => onLinkChange(index, "title", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Assign Section</Label>
          <Select
            value={link.link}
            onValueChange={(value) => onLinkChange(index, "link", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              {allSections
                .filter((section) => section.type !== "nav") // Filter out nav sections
                .map((section) => (
                  <SelectItem key={section._id} value={`#${slugify(section.name)}`}>
                    {section.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex justify-end'>
          <Button variant="destructive" onClick={() => onLinkDelete(index)} size="sm">
            <Trash size={14} className='mr-1' /> Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}