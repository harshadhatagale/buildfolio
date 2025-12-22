'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft, EllipsisVertical, Plus, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SectionList from './SectionList'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Award, BadgeCheck, Briefcase, FolderKanban, GraduationCap, HelpCircle, Home, Layout, LayoutDashboard, Mountain, Package, Quote, Swords, UserCircle, Zap } from 'lucide-react'
import { setSections, setSelectedSection, removeSection, renameSection } from '../../../../features/portfolio/portfolioSlice'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import SectionMenu from '../project/section/SectionMenu'
import { Input } from '@/components/ui/input'
export default function Sidebar({ loading, projectId }) {
  const [side, setSide] = useState(true)
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const sensors = useSensors(
    useSensor(PointerSensor)
  )

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((i) => i._id === active.id);
      const newIndex = sections.findIndex((i) => i._id === over.id);

      const newArray = arrayMove(sections, oldIndex, newIndex);
      const updatedArray = newArray.map((item, index) => ({
        ...item,
        order: index + 1 // or start with 0 based on your logic
      }));

      dispatch(setSections(updatedArray));
    }
  };

  return (
    <aside className='z-15 select-none overflow-y-scroll overflow-x-hidden flex flex-col bg-background px-3 w-56 border-r-2 border-muted fixed top-14 left-0 h-[calc(100vh-56px)]'>
      {/* Left Panel: Section List */}
      <div
        className={`p-3 overflow-x-hidden overflow-hidden absolute top-0 left-0 w-full h-auto transition-transform duration-300 
        ${side ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='flex justify-between items-center pb-3'>
          <h3 className='text-lg font-bold'>Sections</h3>
          <Plus
            onClick={() => setSide(false)}
            size={30}
            className='cursor-pointer hover:opacity-80 hover:bg-muted p-1 rounded-md'
          />
        </div>
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((i) => i._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col w-full gap-2 mb-3">
              {loading ? (
                <SectionsSkeleton />
              ) : (
                sections.map((section) => (
                  <SortableProjectSectionItem
                    id={section._id}
                    key={section._id}
                    section={section}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
        <Button
          variant="outline"
          className="bg-primary dark:bg-primary cursor-pointer hover:bg-primary/50 dark:hover:bg-primary/50 w-full"
          onClick={() => setSide(false)}
        >
          <Plus size={20} /><span>Add Section</span>
        </Button>
      </div>

      {/* Right Panel: Add Section Form */}
      <div
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-300
        ${side ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <div className='sticky top-0 w-full overflow-hidden flex p-3 items-center left-0 bg-background'>
          <Button variant="outline" className="flex justify-center items-center cursor-pointer" onClick={() => setSide(true)}>
            <ChevronLeft />
          </Button>
        </div>
        <div className="p-3 w-full">
          <SectionList projectId={projectId} />
        </div>
      </div>
    </aside>
  )
}

const SectionsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-full h-9 rounded-md bg-muted animate-pulse flex items-center px-2 gap-3"
        >
          <div className="w-4 h-4 rounded bg-muted-foreground/30" />
          <div className="h-3 w-24 rounded bg-muted-foreground/30" />
        </div>
      ))}
    </div>
  )
}

import toast from 'react-hot-toast';

const SortableProjectSectionItem = ({ id, section }) => {
  const sectionId = section._id
  const dispatch = useDispatch()
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)
  const sections = useSelector((state) => state.portfolio.present)

  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(section.name)
  const inputRef = React.useRef(null)

  const {
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleNameChange = (e) => {
    setTempName(e.target.value)
  }

  const validateName = (name) => {
    if (!name.trim()) {
      toast.error("Section name cannot be empty")
      return false
    }

    const isDuplicate = sections.some(
      s => s.name.toLowerCase() === name.toLowerCase() && s._id !== section._id
    )

    if (isDuplicate) {
      toast.error("This section name already exists")
      return false
    }

    return true
  }

  const saveChanges = () => {
    if (!validateName(tempName)) {
      return false
    }

    dispatch(renameSection({ _id: section._id, name: tempName }))
    dispatch(setSelectedSection({ ...section, name: tempName }))
    return true
  }

  const handleDelete = () => {
    dispatch(removeSection(sectionId))
  }

  const handleDoubleClick = () => {
    setTempName(section.name)
    setIsEditing(true)
  }

  const handleBlur = () => {
    if (saveChanges()) {
      setIsEditing(false)
    } else {
      // Keep focus if validation fails
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (saveChanges()) {
        setIsEditing(false)
      }
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cn(
        'hover:shadow',
        isDragging && 'opacity-50 border-none'
      ) w-full py-2 hover:border transition hover:border-primary rounded-md ${selectedSection?._id === section._id ? "border-primary/100" : ""
        }`}
      onClick={() => dispatch(setSelectedSection(section))}
    >
      <div className='flex justify-between items-center w-full h-full px-2'>
        <div className="flex gap-3 justify-between items-center">
          <SectionIconRenderer id={section._id} type={section.type} />
          {isEditing ? (
            <input
              ref={inputRef}
              maxLength={20}
              type="text"
              value={tempName}
              onChange={handleNameChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className={`bg-transparent outline-none w-fit border-none focus:ring-1 rounded-sm text-sm max-w-[100px] p-1`}
            />
          ) : (
            <span
              className="text-sm cursor-pointer"
              onDoubleClick={handleDoubleClick}
            >
              {section.name}
            </span>
          )}
        </div>
        <Trash size={15} onClick={handleDelete} />
      </div>
    </Card>
  )
}


export const SectionIconRenderer = ({ id, type }) => {
  const {
    attributes,
    listeners,
  } = useSortable({ id })
  const renderIcon = () => {
    switch (type) {
      case "nav":
        return <LayoutDashboard {...attributes} {...listeners} className={"cursor-grabbing order-none"} size={15} />
        break;

      case "hero":
        return <Mountain {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />
        break

      case "about":
        return <UserCircle {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />
        break

      case "skills":
        return <Swords {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />

      case "experience":
        return <Briefcase {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />

      case "testimonials":
        return <Quote {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />
        break

      case 'section':
        return <Layout {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />
        break

      case "projects":
        return <FolderKanban {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />

      case "services":
        return <Package {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />

      case "education":
        return <GraduationCap {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />

      case "faqs":
        return <HelpCircle {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />

      case "certifications":
        return <BadgeCheck {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />

      case "achievements":
        return <Award {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />
      default:
        return <Layout {...attributes} {...listeners} className={"cursor-grabbing"} size={15} />
        break;
    }
  }
  return (
    <>
      {renderIcon()}
    </>
  )
}