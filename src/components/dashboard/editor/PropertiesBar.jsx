import React from 'react'
import NavProps from './SectionProperties/NavProps'
import HeroProps from './SectionProperties/HeroProps'

export default function PropertiesBar() {
  return (
    <div className='flex flex-col bg-background px-3 w-56 border-l-2 border-muted fixed top-14 right-0 h-[calc(100vh-56px)] py-3'>
       <h3 className='text-lg font-bold mb-5'>Properties</h3>
       <NavProps/>
    </div>
  )
}
