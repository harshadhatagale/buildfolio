import React from 'react'
import { Toaster } from 'react-hot-toast'
export default function ThemesLayout({ children }) {
    return (
        <main>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {children}
        </main>
    )
}
