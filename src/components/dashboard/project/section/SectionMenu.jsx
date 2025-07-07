'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeSection, setSelectedSection } from '../../../../../features/portfolio/portfolioSlice'
export default function SectionMenu({ section }) {
    const sectionId = section._id
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(removeSection(sectionId))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><EllipsisVertical size={16} /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
