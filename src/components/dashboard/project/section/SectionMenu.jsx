import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react'
export default function SectionMenu({sectionId}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><EllipsisVertical size={16}/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> handleDelete()}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
