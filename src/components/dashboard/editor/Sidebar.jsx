'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft, EllipsisVertical, Trash } from 'lucide-react'
import React, { act, useState } from 'react'
import SectionList from './SectionList'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Award, BadgeCheck, Briefcase, FolderKanban, GraduationCap, HelpCircle, Home, Layout, LayoutDashboard, Mountain, Package, Quote, Swords, UserCircle, Zap } from 'lucide-react'
import { setSections, setSelectedSection } from '../../../../features/portfolio/portfolioSlice'
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
export default function Sidebar({ projectId }) {
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
        <h3 className='text-lg font-bold mb-5'>Sections</h3>
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((i) => i._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className='flex overflow-x-hidden flex-col w-full justify-center items-center gap-2 overflow-y-hidden mb-3'>
              {sections.map((section) =>
                <SortableProjectSectionItem id={section._id} key={section._id} section={section} />
              )}
            </div>
          </SortableContext>
        </DndContext>
        <Button
          variant="outline"
          className="bg-primary dark:bg-primary cursor-pointer hover:bg-primary/50 dark:hover:bg-primary/50 w-full"
          onClick={() => setSide(false)}
        >
          Add Section
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

const SortableProjectSectionItem = ({ id, section }) => {
  const {

    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const dispatch = useDispatch()
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)
  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cn(
        'hover:shadow',
        isDragging && 'opacity-50 border-none'
      ) w-full py-2 hover:border transition hover:border-primary rounded-md ${selectedSection ? `${selectedSection._id === section._id ? "border-primary/100" : ""}` : ""}`} onClick={() => dispatch(setSelectedSection(section))}>
      <div className='flex justify-between items-center w-full h-full px-2'>
        <div className="flex gap-3">
          <SectionIconRenderer id={section._id} type={section.type} />
          <span className='cursor-text'>{section.name}</span>
        </div>
        <SectionMenu  section={section}/>
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
        return <LayoutDashboard {...attributes} {...listeners} className={"cursor-move border-none"} />
        break;

      case "hero":
        return <Mountain {...attributes} {...listeners} className={"cursor-move"} />
        break

      case "about":
        return <UserCircle {...attributes} {...listeners} className={"cursor-move"} />
        break

      case "skills":
        return <Swords {...attributes} {...listeners} className={"cursor-move"} />

      case "experience":
        return <Briefcase {...attributes} {...listeners} className={"cursor-move"} />

      case "testimonials":
        return <Quote {...attributes} {...listeners} className={"cursor-move"} />
        break

      case 'section':
        return <Layout {...attributes} {...listeners} className={"cursor-move"} />
        break

      case "projects":
        return <FolderKanban {...attributes} {...listeners} className={"cursor-move"} />

      case "services":
        return <Package {...attributes} {...listeners} className={"cursor-move"} />

      case "education":
        return <GraduationCap {...attributes} {...listeners} className={"cursor-move"} />

      case "faq":
        return <HelpCircle {...attributes} {...listeners} className={"cursor-move"} />

      case "certifications":
        return <BadgeCheck {...attributes} {...listeners} className={"cursor-move"} />

      case "achievements":
        return <Award {...attributes} {...listeners} className={"cursor-move"} />
      default:
        return <Layout {...attributes} {...listeners} className={"cursor-move"} />
        break;
    }
  }
  return (
    <>
      {renderIcon()}
    </>
  )
}