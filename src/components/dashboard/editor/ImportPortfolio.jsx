"use client"

import { useState } from "react"
import { normalizeSection } from "@/lib/validators/normaliseSection"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { v4 as uuidv4 } from "uuid"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GetDefaultContent } from "@/lib/getDefaultContent"
import { useAddSection } from "@/lib/handlers/handleAddSection"
import { useDispatch, useSelector } from "react-redux"
import { addSection } from "../../../../features/portfolio/portfolioSlice"

const SECTIONS = [
    "hero",
    "about",
    "projects",
    "skills",
    "experience",
    "services",
    "education",
    "certifications",
    "achievements",
    "faqs",
]

export default function ImportPortfolioModal() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [bulkMode, setBulkMode] = useState(false)
    const sections= useSelector((state)=> state.portfolio.present)
    const [sectionType, setSectionType] = useState("")
    const [rawInput, setRawInput] = useState("")
    const [previewData, setPreviewData] = useState(null)

    const [bulkJson, setBulkJson] = useState("")
    const [error, setError] = useState("")

    const handleGenerate = () => {
        const base = GetDefaultContent(sectionType)
        setPreviewData({
            ...base,
            importedText: rawInput,
        })
    }

    const handleSingleImport = () => {
        onImportSingle(previewData)
        reset()
    }



    const handleBulkImport = () => {
        try {
            const parsed = JSON.parse(bulkJson)
            const sectionsArray = Array.isArray(parsed) ? parsed : [parsed]

            if (!sectionsArray.length) {
                throw new Error("No sections found")
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
        setSectionType("")
        setRawInput("")
        setPreviewData(null)
        setBulkJson("")
        setBulkMode(false)
        setError("")
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Import Portfolio</Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl h-70 overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Import Portfolio</DialogTitle>
                    </DialogHeader>

                    {/* Toggle */}
                    <div className="flex items-center justify-between rounded-md border p-3">
                        <Label className="text-sm">Bulk Import (Full JSON)</Label>
                        <Switch checked={bulkMode} onCheckedChange={setBulkMode} />
                    </div>

                    {/* ================= SINGLE SECTION ================= */}
                    {!bulkMode && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Section</Label>
                                <Select value={sectionType} onValueChange={setSectionType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SECTIONS.map((s) => (
                                            <SelectItem key={s} value={s}>
                                                {s.toUpperCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Paste content</Label>
                                <Textarea
                                    rows={6}
                                    value={rawInput}
                                    onChange={(e) => setRawInput(e.target.value)}
                                    placeholder="Paste website / resume / GitHub text"
                                />
                            </div>

                            <Button
                                variant="secondary"
                                disabled={!sectionType}
                                onClick={handleGenerate}
                            >
                                Generate Preview
                            </Button>

                            {previewData && (
                                <pre className="max-h-60 overflow-auto rounded-md bg-muted p-3 text-xs">
                                    {JSON.stringify(previewData, null, 2)}
                                </pre>
                            )}

                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={reset}>
                                    Cancel
                                </Button>
                                <Button disabled={!previewData} onClick={handleSingleImport}>
                                    Import Section
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* ================= BULK JSON ================= */}
                    {bulkMode && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Paste Full Portfolio JSON</Label>
                                <Textarea
                                    rows={10}
                                    value={bulkJson}
                                    onChange={(e) => setBulkJson(e.target.value)}
                                    placeholder={`[{ "type": "hero", ... },{ "type": "projects", ... }]`}
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}

                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={reset}>
                                    Cancel
                                </Button>
                                <Button onClick={handleBulkImport}>
                                    Import Full Portfolio
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
