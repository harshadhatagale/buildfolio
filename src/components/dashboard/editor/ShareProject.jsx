import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Link as LinkIcon, Copy } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { slugify } from "./SectionProperties/NavProps"

export default function ShareProject() {
    const [copied, setCopied] = useState(false)
    const project= useSelector((state)=> state.portfolio.project)
    const portfolioLink = `${process.env.NEXT_PUBLIC_SITE_URL}/${project.urlSlug}`// replace with dynamic link

    const handleCopy = () => {
        navigator.clipboard.writeText(portfolioLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <HoverCard className="mx-0">
            <HoverCardTrigger asChild>
                <Button variant={"secondary"} size={"sm"}>
                    <LinkIcon size={20} />
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72 mx-5 space-y-3">
                <div className="text-sm font-medium">
                    🚀 Share your portfolio and impress recruiters!
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        value={portfolioLink}
                        readOnly
                        className="text-sm"
                    />
                    <Button
                        onClick={handleCopy}
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        {copied ? "✅" : <Copy size={16} />}
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Copy this link and share it on LinkedIn, WhatsApp, or Twitter.
                </p>
            </HoverCardContent>
        </HoverCard>
    )
}
