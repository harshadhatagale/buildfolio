'use client'

import React, { useState, useEffect } from 'react'
import DynamicIcon from './DynamicIcon'
import IconChooser from './IconChooser'
import { cn } from '@/lib/utils'

export default function EditableIcon({
  value,
  onChange,
  isSelected,
  size = 24,
  className,
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation()
          if (isSelected) setOpen(true)
        }}
        className={cn(
          'p-3 rounded-xl bg-muted transition cursor-pointer inline-flex items-center justify-center',
          isSelected &&
            'hover:bg-muted/70 outline outline-1 outline-dashed outline-primary/60',
          className
        )}
      >
        <DynamicIcon icon={value} size={size} />
      </div>

      {open && (
        <IconChooser
          value={value}
          onChange={(icon) => {
            onChange(icon)
            setOpen(false)
          }}
        />
      )}
    </>
  )
}
