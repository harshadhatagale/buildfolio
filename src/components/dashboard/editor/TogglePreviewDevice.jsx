'use client'

import {
  Monitor,
  Smartphone,
  Tablet,
  Save,
  Undo,
  Redo,
} from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setDevice,
} from '../../../../features/portfolio/portfolioSlice'
import { useParams } from 'next/navigation'

export default function TogglePreviewDevice() {
  const dispatch = useDispatch()
  const device = useSelector((state) => state.portfolio.device)
  const iconClass = (type) =>
    `cursor-pointer transition ${
      device === type
        ? 'text-primary'
        : 'text-muted-foreground hover:text-foreground'
    }`

  return (
    <div className="flex w-12 flex-col bg-background items-center px-1 gap-5 border border-muted rounded-md absolute py-3 top-1/3 -left-full shadow-lg">
      {/* Desktop */}
      <Monitor
        size={18}
        className={iconClass('desktop')}
        onClick={() => dispatch(setDevice('desktop'))}
      />

      {/* Tablet */}
      <Tablet
        size={18}
        className={iconClass('tablet')}
        onClick={() => dispatch(setDevice('tablet'))}
      />

      {/* Mobile */}
      <Smartphone
        size={18}
        className={iconClass('mobile')}
        onClick={() => dispatch(setDevice('mobile'))}
      />
    </div>
  )
}
