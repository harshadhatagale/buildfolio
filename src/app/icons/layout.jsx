import React from 'react'

export default function layout({children}) {
  return (
    <main className='px-2 py-3'>
        <h1 className='text-3xl font-bold mb-3'>Icons</h1>
        {children}
    </main>
  )
}
