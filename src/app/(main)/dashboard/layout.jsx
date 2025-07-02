import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      {children}
    </div>
  )
}
