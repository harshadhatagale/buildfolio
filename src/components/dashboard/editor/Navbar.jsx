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
import { ShimmerButton } from '@/components/ui/shimmer-button'

export default function Navbar({ loading }) {
  const router = useRouter()
  const params = useParams()
  const dispatch = useDispatch()

  const project = useSelector((state) => state.portfolio.project)
  const handlePublish = async (status) => {
    const toastId = toast.loading("Updating publish status...")
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/project/${params.project}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ visibillity: status }),
        }
      )

      if (!response.ok) {
        const err = await response.text()
        throw new Error(err || 'Publish update failed')
      }

      const data = await response.json()
      dispatch(setProject(data.project))

      toast.success(
        status === 'public'
          ? 'Project published successfully!'
          : 'Project unpublished successfully!',
        { id: toastId }
      )
    } catch (error) {
      toast.error(error?.message || String(error), { id: toastId })
      console.error(error)
    }
  }

  return (
    <nav className='flex bg-background justify-between items-center w-full h-14 border-b-2 border-muted px-3'>
      <div className='flex justify-center items-center gap-3'>
        <img src='/images/code.png' alt='Project Logo' width={30} height={30} />
        {loading ? (
          <div className="w-32 h-4 rounded bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
        ) : (
          <span className="text-lg font-semibold">
            {project?.name}
          </span>
        )}

      </div>
      <div className="flex justify-center items-center gap-4">
        <Button onClick={() => router.push("/dashboard")} className={"cursor-pointer"} variant={"secondary"}>Dashboard</Button>
        <ThemeEditor />
        <Eye size={20} className='cursor-pointer' onClick={() => router.replace(`/dashboard/${params.project}/preview`)} />
        <Settings size={20} className='cursor-pointer' onClick={() => router.replace(`/dashboard/${params.project}/settings`)} />
        {project.visibillity === "private" ? (
          <ShimmerButton onClick={() => handlePublish("public")} className="py-1 px-3 flex gap-2 justify-between items-center">
            <Globe size={16} />
            <span className='text-[16px]'>Publish</span>
          </ShimmerButton>
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
            <ShareProject />
          </>
        ) : (
          <Button
            variant={"outline"}
            className={"bg-muted"}
            disabled
          >
            <Loader size={20} className='animate-spin' />
            <span>Loading</span>
          </Button>
        )}
        <ModeToggle />
      </div>
    </nav>
  )
}