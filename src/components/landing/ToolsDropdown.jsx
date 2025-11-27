import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Linkedin, FileText, CheckSquare, Layout, FileDown, Cpu, Users } from "lucide-react";

/**
 * BuildFolio Tools Dropdown (Shadcn)
 * - Default export React component
 * - Tailwind + shadcn/ui components
 * - Accepts onSelect callback and optional className
 *
 * Usage:
 * <ToolsDropdown onSelect={(tool) => console.log(tool)} />
 */

const TOOLS = [
  {
    id: "linkedin-portfolio",
    name: "LinkedIn → Portfolio",
    desc: "Create a portfolio from a LinkedIn URL",
    icon: Linkedin,
    tag: "Viral",
  },
  {
    id: "resume-portfolio",
    name: "Resume → Portfolio",
    desc: "Convert your resume into a portfolio",
    icon: FileText,
    tag: "AI",
  },
  {
    id: "score-checker",
    name: "Portfolio Score Checker",
    desc: "Get instant feedback & score",
    icon: CheckSquare,
    tag: "Free",
  },
  {
    id: "templates",
    name: "Templates Gallery",
    desc: "Browse and use free templates",
    icon: Layout,
    tag: "SEO",
  },
  {
    id: "pdf-export",
    name: "Portfolio → PDF",
    desc: "Export a beautiful PDF in one click",
    icon: FileDown,
    tag: "Download",
  },
  {
    id: "ai-builder",
    name: "AI Portfolio Builder",
    desc: "Generate a portfolio using AI",
    icon: Cpu,
    tag: "AI",
  },
  {
    id: "referrals",
    name: "Referrals & Rewards",
    desc: "Invite friends & earn rewards",
    icon: Users,
    tag: "Growth",
  },
];

export default function ToolsDropdown({ onSelect, className = "" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return TOOLS;
    const q = query.toLowerCase();
    return TOOLS.filter(
      (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || (t.tag || "").toLowerCase().includes(q)
    );
  }, [query]);

  function handleSelect(tool) {
    setOpen(false);
    if (onSelect) onSelect(tool);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className={"flex items-center gap-2 " + className} aria-expanded={open} aria-haspopup="menu">
          Tools
          <ChevronDown className="w-4 h-4 opacity-80" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={8} className="w-[320px] p-2">
        <div className="px-2 pb-2">
          <Input
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
            aria-label="Search tools"
          />
        </div>

        <DropdownMenuLabel className="px-3 pt-1 pb-0 text-xs text-muted-foreground">BuildFolio Tools</DropdownMenuLabel>

        {filtered.length === 0 ? (
          <div className="px-3 py-2 text-sm text-center text-muted-foreground">No tools found</div>
        ) : (
          filtered.map((tool) => {
            const Icon = tool.icon;
            return (
              <DropdownMenuItem
                key={tool.id}
                onClick={() => handleSelect(tool)}
                className="flex items-start gap-3 px-3 py-2 rounded-md hover:bg-accent/60"
                role="menuitem"
                tabIndex={0}
              >
                <div className="mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium truncate">{tool.name}</span>
                    {tool.tag && <Badge variant="outline" className="text-xs">{tool.tag}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{tool.desc}</p>
                </div>
              </DropdownMenuItem>
            );
          })
        )}

        <DropdownMenuSeparator className="my-1" />

        <div className="px-3 py-2 text-xs text-muted-foreground">Tip: Press / to focus search</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
