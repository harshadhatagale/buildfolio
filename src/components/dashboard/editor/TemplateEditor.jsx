import React from "react"
import { Sparkles, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TemplateEditor() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-1">
      <div className="max-w-md w-full rounded-xl border bg-background p-8 text-center shadow-sm">
        
        {/* Badge */}
        <Badge className="mx-auto mb-4 w-fit">
          Coming Soon
        </Badge>

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold">
          Template Editor
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground">
          We’re building a powerful template editor that lets you
          visually design layouts, sections, and styles — without
          touching code.
        </p>

        {/* Feature preview */}
        <ul className="mt-4 space-y-2 text-sm text-left">
          <li>✨ Drag & drop templates</li>
          <li>🎨 Custom layouts & sections</li>
          <li>⚡ Instant preview</li>
          <li>🚀 Faster publishing</li>
        </ul>

        {/* CTA */}
        <Button disabled className="mt-6 w-full gap-2" variant="secondary">
          <Lock size={16} />
          Launching Soon
        </Button>
      </div>
    </div>
  )
}
