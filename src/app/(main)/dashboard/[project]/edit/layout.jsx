'use client'
import Navbar from '@/components/dashboard/editor/Navbar'
import Toolbar from '@/components/dashboard/editor/Toolbar'
import React, { useEffect } from 'react'
import Sidebar from '@/components/dashboard/editor/Sidebar'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setProject, setSections, setTheme, setThemeColors } from '../../../../../../features/portfolio/portfolioSlice'
import Inspector from '@/components/dashboard/editor/Inspector'
export default function EditorLayout({ children }) {
  const params = useParams()
  const dispatch = useDispatch()
  const theme= useSelector((state)=> state.portfolio.themeId)
  useEffect(() => {
    console.log(theme)
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/project/${params.project}`, {
          method: 'GET',
        })
        const data = await res.json()
        dispatch(setProject(data.myproject))
      }
      catch (error) {
        console.error(error)
      }
    }
    
    const fetchSections = async () => {
      await fetch(`/api/project/${params.project}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            dispatch(setSections(data.myproject.sections));
            dispatch(setTheme({ id: data.myproject.theme }))
          } else {
            console.error('Failed to fetch sections:', data.error);
          }
        })
        .catch((error) => {
          console.error('Error fetching sections:', error);
        });
    }
    fetchProject();
    fetchSections();
  }, [])

  useEffect(() => {
  if (!theme) return; 
  
  const fetchTheme = async () => {
    const res = await fetch(`/api/themes/${theme}`);
    const data = await res.json();
    if (data.success) {
      dispatch(setThemeColors({ colors: data.theme.colors }));
    }
  };

  fetchTheme();
}, [theme]);
  return (
    <>
      <Navbar />
      <Toolbar />
      <Sidebar projectId={params.project} />
      {children}
      <Inspector />
    </>
  )
}
