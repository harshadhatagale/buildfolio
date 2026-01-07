"use client"

import { useState } from "react"
import { normalizeSection } from "@/lib/validators/normaliseSection"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { addSection } from "../../../../features/portfolio/portfolioSlice"
import { Copy, FileDown } from "lucide-react"
import toast from "react-hot-toast"

const PORTFOLIO_AI_PROMPT = `
You are a portfolio section data generator for BuildFolio.

Using my LinkedIn profile, resume, or previous chat history, generate portfolio sections in the EXACT JSON formats shown below.

LinkedIn Profile: [Paste your Linkdin content here]

════════════════════════════════
STRICT GLOBAL RULES (MANDATORY)
════════════════════════════════
- Output ONLY valid JSON
- Output MUST be a single JSON array
- Maximum 8 sections
- Required sections (must include):
  nav, hero, about, skills, footer
- Optional sections (choose up to 3):
  projects, experience, education, certifications, achievements
- Section order MUST be:
  nav → hero → about → skills → optional sections → footer
- Do NOT invent new section types
- Do NOT include explanations, markdown, or comments
- Do NOT say “Student”, “Fresher”, or “Learning” in hero heading

════════════════════════════════
SECTION SCHEMAS (EXACT – DO NOT CHANGE)
════════════════════════════════

NAV SECTION
{
  "type": "nav",
  "portfolioName": "Full Name",
  "links": [
    { "title": "Home", "link": "/" },
    { "title": "About", "link": "#about" },
    { "title": "Skills", "link": "#skills" },
    { "title": "Projects", "link": "#projects" },
    { "title": "Contact", "link": "#footer" }
  ]
}

HERO SECTION
{
  "type": "hero",
  "primaryHeading": "Strong professional headline (non-basic)",
  "secondaryHeading": "2–3 line confident professional summary",
  "cta": {
    "getInTouchLink": "mailto:email@example.com",
    "resumeLink": ""
  }
}

ABOUT SECTION
{
  "type": "about",
  "heading": "About Me",
  "about": "Professional summary written in 1–2 paragraphs"
}

SKILLS SECTION
{
  "type": "skills",
  "primaryHeading": "Skills & Expertise",
  "secondaryHeading": "What I work with",
  "skills": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ]
}

EXPERIENCE SECTION (OPTIONAL)
{
  "type": "experience",
  "primaryHeading": "Experience",
  "experiences": [
    {
      "jobTitle": "Role",
      "companyName": "Company",
      "startDate": "Year",
      "endDate": "Year / Present",
      "responsibillities": "Impact-focused description",
      "technologies": "Tools / domain"
    }
  ]
}

PROJECTS SECTION (OPTIONAL)
{
  "type": "projects",
  "heading": "Projects",
  "subHeading": "Selected work",
  "projects": [
    {
      "title": "Project Name",
      "description": "Problem solved + outcome",
      "image": "/images/code.png",
      "github": "",
      "live": "",
      "tags": ["Tech 1", "Tech 2"]
    }
  ]
}

EDUCATION SECTION (OPTIONAL)
{
  "type": "education",
  "heading": "Education",
  "subHeading": "Academic background",
  "items": [
    {
      "degree": "Degree Name",
      "institution": "Institute Name",
      "year": "Start – End",
      "description": "Specialization or focus",
      "icon": "graduationCap"
    }
  ]
}

FOOTER SECTION
{
  "type": "footer",
  "portfolioName": "Full Name",
  "description": "Short professional closing line",
  "links": [
    { "title": "LinkedIn", "link": "https://linkedin.com" }
  ],
  "socials": [
    {
      "platform": "LinkedIn",
      "link": "https://linkedin.com",
      "icon": "linkedin"
    }
  ],
  "copyright": "© 2026 Name. All rights reserved."
}

════════════════════════════════
FINAL INSTRUCTION
════════════════════════════════
Return ONLY the JSON array.
No explanations.
No markdown.
No extra text.
`

export default function ImportPortfolioModal() {
    const dispatch = useDispatch()
    const sections = useSelector((state) => state.portfolio.present)

    const [open, setOpen] = useState(false)
    const [bulkJson, setBulkJson] = useState("")
    const [error, setError] = useState("")

    const handleCopyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(PORTFOLIO_AI_PROMPT)
           toast.success(" AI Prompt copied! Paste it into ChatGPT / Claude / Gemini 🚀")
        } catch {
            toast.success("Failed to copy prompt")
        }
    }

    const handleBulkImport = () => {
        try {
            const parsed = JSON.parse(bulkJson)
            const sectionsArray = Array.isArray(parsed) ? parsed : [parsed]

            if (!sectionsArray.length) {
                throw new Error("No sections found in JSON")
            }

            if (sections.length + sectionsArray.length > 15) {
                throw new Error("Section limit reached (15 max)")
            }

            sectionsArray.forEach((rawSection, index) => {
                const normalized = normalizeSection({
                    section: rawSection,
                    order: sections.length + index,
                    existingSections: sections,
                })

                dispatch(addSection(normalized))
            })

            reset()
        } catch (err) {
            setError(err?.message || "Invalid JSON")
        }
    }

    const reset = () => {
        setOpen(false)
        setBulkJson("")
        setError("")
    }

    return (
        <>
            <Button variant={"outline"} className={"cursor-pointer dark:bg-primary bg-primary hover:dark:bg-primary/50 hover:bg-primary/50"} onClick={() => setOpen(true)}>
              <FileDown/> Import Portfolio
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Import Portfolio</DialogTitle>
                    </DialogHeader>

                    {/* COPY PROMPT */}
                    <div className="flex items-center justify-between rounded-md border p-3">
                        <Label className="text-sm">
                            Generate portfolio using AI
                        </Label>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopyPrompt}
                        >
                           <Copy/>  Copy AI Prompt
                        </Button>
                    </div>

                    {/* JSON INPUT */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Paste Portfolio JSON</Label>
                            <Textarea
                                rows={10}
                                value={bulkJson}
                                className={"h-70 overflow-y-auto"}
                                onChange={(e) => setBulkJson(e.target.value)}
                                placeholder={`[{ "type": "hero", ... }, { "type": "projects", ... }]`}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={reset}>
                                Cancel
                            </Button>
                            <Button className={"text-foreground"} onClick={handleBulkImport}>
                                Import Portfolio
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
