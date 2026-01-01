'use client'

import React, { useEffect, useState } from 'react'
import DynamicIcon from './DynamicIcon'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Command,
  CommandEmpty,
  CommandInput,
} from '@/components/ui/command'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const RECENT_KEY = 'iconify-recent'
const RECENT_LIMIT = 8

export default function IconChooser({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [icons, setIcons] = useState([])
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(false)

  /* Load recent icons */
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY)
    if (stored) setRecent(JSON.parse(stored))
  }, [])

  const saveRecent = (icon) => {
    const updated = [icon, ...recent.filter(i => i !== icon)].slice(0, RECENT_LIMIT)
    setRecent(updated)
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
  }

  /* Fetch icons */
  useEffect(() => {
    if (query.length < 2) {
      setIcons([])
      return
    }

    const controller = new AbortController()
    setLoading(true)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/icons?q=${query}`, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => setIcons(data))
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [query])

  const selectIcon = (icon) => {
    onChange(icon)
    saveRecent(icon)
    setOpen(false)
    setQuery('')
  }

  const renderGrid = (list) => (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
      {list.map(icon => (
        <div
          key={icon}
          role="button"
          tabIndex={0}
          onClick={() => selectIcon(icon)}
          className={cn(
            'aspect-square rounded-xl cursor-pointer flex items-center justify-center',
            'border border-border bg-background hover:bg-muted transition',
            value === icon && 'border-primary ring-2 ring-primary/30'
          )}
        >
          <DynamicIcon icon={icon} className="h-6 w-6" />
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* Trigger */}
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => setOpen(true)}
      >
        {value ? (
          <DynamicIcon icon={value} className="h-5 w-5" />
        ) : (
          <span className="text-muted-foreground">Select an icon</span>
        )}
      </Button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Select Icon</DialogTitle>
          </DialogHeader>

          <Command shouldFilter={false} className="border-t">
            <CommandInput
              placeholder="Search icons (min 2 chars)…"
              value={query}
              onValueChange={setQuery}
            />

            <div className="p-6 max-h-[420px] overflow-y-auto">
              {query.length === 0 && recent.length > 0 && (
                <>
                  <p className="text-xs text-muted-foreground mb-3">
                    Recent
                  </p>
                  {renderGrid(recent)}
                </>
              )}

              {query.length < 2 ? (
                <CommandEmpty className="py-10 text-center">
                  Type at least 2 characters
                </CommandEmpty>
              ) : loading ? (
                <CommandEmpty className="py-10 text-center">
                  Loading icons…
                </CommandEmpty>
              ) : icons.length === 0 ? (
                <CommandEmpty className="py-10 text-center">
                  No icons found
                </CommandEmpty>
              ) : (
                renderGrid(icons)
              )}
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
