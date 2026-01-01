'use client'
import { Icon } from '@iconify/react'

export default function DynamicIcon({ icon, className }) {
  if (!icon) return null
  return <Icon icon={icon} className={className} />
}
