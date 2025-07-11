'use client'
import Navbar from '@/components/dashboard/editor/Navbar'
import Toolbar from '@/components/dashboard/editor/Toolbar'
import React, { useEffect } from 'react'
import Sidebar from '@/components/dashboard/editor/Sidebar'
import PropertiesBar from '@/components/dashboard/editor/Inspector'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setSections } from '../../../../../../features/portfolio/portfolioSlice'
import Inspector from '@/components/dashboard/editor/Inspector'
export default function EditorLayout({ children }) {
  const params = useParams()
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  useEffect(() => {
    const fetchSections = async () => {
     await fetch(`/api/sections`, {
        method: 'POST',
        body: JSON.stringify({ projectId: params.project }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            dispatch(setSections(data.data));
          } else {
            console.error('Failed to fetch sections:', data.error);
          }
        })
        .catch((error) => {
          console.error('Error fetching sections:', error);
        });
    }

    fetchSections();
  }, [])
  return (
    <>
      <Navbar />
      <Toolbar projectId={params.project}  sections={sections}/>
      <Sidebar projectId={params.project} />
      {children}
      <Inspector/>
    </>
  )
}
