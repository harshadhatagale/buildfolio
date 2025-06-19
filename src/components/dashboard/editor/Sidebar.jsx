'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SectionList from './SectionList'
import { useDispatch, useSelector } from 'react-redux'
import { setSections } from '../../../../features/portfolio/portfolioSlice'
import { Card } from '@/components/ui/card'
import { SectionIconRenderer } from './SectionList'
export default function Sidebar({ projectId }) {
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.sections)
  const [side, setSide] = useState(true)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`/api/project/${projectId}/sections/`)
        const data = await res.json()
        dispatch(setSections(data.sections))
      } catch (error) {
        console.error("Failed to fetch sections", error)
      }
    }

    fetchSections()
  }, [dispatch, projectId])

  return (
    <aside className='z-15 overflow-y-scroll overflow-x-hidden flex flex-col bg-background px-3 w-56 border-r-2 border-muted fixed top-14 left-0 h-[calc(100vh-56px)] py-3'>
      <div
        className={`p-3 absolute top-0 left-0 w-full h-full transition-transform duration-300 
        ${side ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h3 className='text-lg font-bold mb-5'>Sections</h3>
        <div className='flex flex-col mb-4 w-full justify-center items-center gap-2 overflow-y-auto'>
          {sections.map((section) =>
            <ProjectSectionItem key={section._id} name={section.name} type={section.type} />
          )}
        </div>
        <Button
          variant="outline"
          className="bg-primary dark:bg-primary cursor-pointer hover:bg-primary/50 dark:hover:bg-primary/50 w-full"
          onClick={() => setSide(false)}
        >
          Add Section
        </Button>
      </div>

      <div
        className={`p-3 absolute top-0 left-0 w-full h-full transition-transform duration-300
        ${side ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <Button variant="outline" className="mb-4 cursor-pointer" onClick={() => setSide(true)}>
          <ChevronLeft />
        </Button>
        <SectionList projectId={projectId} />
      </div>
    </aside>
  )
}

const ProjectSectionItem = ({ name, type }) => {
  return (
    <Card className={"w-full py-2 hover:border transition hover:border-primary rounded-md"}>
      <div className='flex items-center w-full h-full px-2 gap-3'>
        <SectionIconRenderer type={type} />
        <span className='cursor-text' contentEditable suppressContentEditableWarning>{type}</span>
      </div>
    </Card>
  )
}