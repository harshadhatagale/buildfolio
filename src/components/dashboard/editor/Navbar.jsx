'use client'
import { ModeToggle } from '@/components/basics/ModeToggle'
import { Button } from '@/components/ui/button'
import { Eye, Globe, Link, Loader, Lock, Paintbrush, Save, Settings } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import ThemeEditor from './ThemeEditor/ThemeEditor'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../../../../features/portfolio/portfolioSlice'
import ShareProject from './ShareProject'

export default function Navbar({ name, logo }) {
  const router = useRouter()
  const params = useParams()
  const dispatch= useDispatch()

  const project = useSelector((state) => state.portfolio.project)
  const handlePublish = async (status) => {
    try {
      const response = await fetch(`/api/project/${params.project}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visibillity: status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update publish status')
      }

      const data = await response.json()
      dispatch(setProject(data.project))
      toast.success(
        project.visibillity==='private' ? 'Project published successfully!' : project.visibillity==='public'?'Project unpublished successfully!': "Project updated successfully!"
      )
      // Optionally refresh or update state here
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className='flex bg-background justify-between items-center w-full h-14 border-b-2 border-muted px-3'>
      <div className='flex justify-center items-center gap-3'>
        <img src='/images/code.png' alt='Project Logo' width={30} height={30} />
        <span className='text-lg font-semibold'>{project.name || "Untitled"}</span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <ThemeEditor />
        <Eye size={20} className='cursor-pointer' onClick={() => router.replace(`/dashboard/${params.project}/preview`)} />
        <Settings size={20} className='cursor-pointer' onClick={() => router.replace(`/dashboard/${params.project}/settings`)} />
        {project.visibillity === "private" ? (
          <Button
            onClick={() => handlePublish("public")}
            variant={"outline"}
            className={"bg-emerald-500 hover:bg-emerald-500/50 text-slate-900 dark:bg-emerald-900 dark:text-white cursor-pointer"}
          >
            <Globe size={20} />
            <span>Publish</span>
          </Button>
        ) : project.visibillity === "public" ? (
          <>
          <Button
            onClick={() => handlePublish("private")}  // Note: changed to "private"
            variant={"outline"}
            className={"bg-emerald-500 hover:bg-emerald-500/50 text-slate-900 dark:bg-emerald-900 dark:text-white cursor-pointer"}
          >
            <Lock size={20} />
            <span>Make Private</span>
          </Button>
          <ShareProject/>
          </>
        ) : (
          <Button
            variant={"outline"}
            className={"bg-muted"}
            disabled
          >
            <Loader size={20} className='animate-spin'/>
            <span>Loading</span>
          </Button>
        )}
        <ModeToggle />
      </div>
    </nav>
  )
}