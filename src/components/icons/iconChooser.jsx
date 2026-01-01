'use client'

import React, { useEffect, useMemo, useState, Suspense } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { DynamicIcon } from 'lucide-react/dynamic'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

function IconLoader() {
  return (
    <div className="w-5 h-5 rounded bg-muted animate-pulse" />
  )
}

const RECENT_LIMIT = 8
const RECENT_KEY = 'icon-chooser-recent'

export default function IconChooser({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [recentIcons, setRecentIcons] = useState([])

  /** Load recent icons */
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY)
    if (stored) setRecentIcons(JSON.parse(stored))
  }, [])

  /** Save recent icon */
  const addRecent = (icon) => {
    const updated = [
      icon,
      ...recentIcons.filter((i) => i !== icon),
    ].slice(0, RECENT_LIMIT)

    setRecentIcons(updated)
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
  }

  /** Safe icon names */
  const iconNames = useMemo(() => {
    if (!dynamicIconImports) return []
    return Object.keys(dynamicIconImports)
  }, [])

  /** Filtered icons */
  const filteredIcons = useMemo(() => {
    if (query.length < 2) return []
    return iconNames
      .filter((name) =>
        name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 80)
  }, [query, iconNames])

  const handleSelect = (iconName) => {
    onChange(iconName)
    addRecent(iconName)
    setOpen(false)
    setQuery('')
  }

  return (
    <>
      {/* Trigger */}
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => setOpen(true)}
      >
        {value ? (
          <>
            <Suspense fallback={<IconLoader />}>
              <DynamicIcon name={value} size={18} />
            </Suspense>
            <span>{value}</span>
          </>
        ) : (
          <span className="text-muted-foreground">
            Select an icon
          </span>
        )}
      </Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Select an Icon</DialogTitle>
          </DialogHeader>

          <Command
            shouldFilter={false}
            className="border-t"
          >
            <CommandInput
              placeholder="Search icons (min 2 chars)..."
              value={query}
              onValueChange={setQuery}
            />

            <CommandList className="max-h-[420px]">
              {/* Recent */}
              {query.length === 0 && recentIcons.length > 0 && (
                <CommandGroup heading="Recent">
                  {recentIcons.map((icon) => (
                    <CommandItem
                      key={icon}
                      value={icon}
                      onSelect={() => handleSelect(icon)}
                    >
                      <Suspense fallback={<IconLoader />}>
                        <DynamicIcon name={icon} size={20} />
                      </Suspense>
                      <span className="ml-2">{icon}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Search Results */}
              {query.length < 2 ? (
                <CommandEmpty>
                  Type at least 2 characters
                </CommandEmpty>
              ) : filteredIcons.length === 0 ? (
                <CommandEmpty>No icons found.</CommandEmpty>
              ) : (
                <CommandGroup heading="Lucide Icons">
                  {filteredIcons.map((iconName) => (
                    <CommandItem
                      key={iconName}
                      value={iconName}
                      onSelect={() => handleSelect(iconName)}
                    >
                      <Suspense fallback={<IconLoader />}>
                        <DynamicIcon name={iconName} size={20} />
                      </Suspense>
                      <span className="ml-2">{iconName}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
