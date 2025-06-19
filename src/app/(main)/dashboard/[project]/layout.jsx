'use client'
import Navbar from '@/components/dashboard/editor/Navbar'
import Toolbar from '@/components/dashboard/editor/Toolbar'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/dashboard/editor/Sidebar'
import PropertiesBar from '@/components/dashboard/editor/PropertiesBar'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from '@/app/store'
import { useParams } from 'next/navigation'
export default function EditorLayout({ children }) {
  const params = useParams()
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Toolbar />
        <Sidebar projectId={params.project} />
        {children}
        <PropertiesBar />
      </Provider>
    </>
  )
}
