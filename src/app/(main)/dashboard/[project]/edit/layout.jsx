'use client'
import Navbar from '@/components/dashboard/editor/Navbar'
import Toolbar from '@/components/dashboard/editor/Toolbar'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/dashboard/editor/Sidebar'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setProject, setSections, setTheme, setThemeColors } from '../../../../../../features/portfolio/portfolioSlice'
import Inspector from '@/components/dashboard/editor/Inspector'
export default function EditorLayout({ children }) {
  const params = useParams()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.portfolio.themeId)
  const [loading, setLoading] = useState(true)
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/project/${params.project}`
        )
        const data = await res.json()

        dispatch(setProject(data.myproject))
        dispatch(setSections(data.myproject.sections))
        dispatch(setTheme({ id: data.myproject.theme }))

       
        await delay(2000)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return (
    <>
      <Navbar loading={loading} />
      <Toolbar />
      <Sidebar loading={loading} projectId={params.project} />
      {children}
      <Inspector />
    </>
  )
}
