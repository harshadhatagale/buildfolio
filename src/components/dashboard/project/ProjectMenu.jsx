'use client'

import { useState } from 'react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast'
export default function ProjectMenu({ projectId }) {
    const [rename, setRename] = useState(false);
    const handleDelete = async () => {
        const res = await fetch(`/api/project/${projectId}/`,
            {
                method: "DELETE"
            }
        )
        if (res.ok) {
            toast.success("Project deleted succesfully !")
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
        else {
            toast.error("Failed to delete project !")
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger><EllipsisVertical size={16} /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setRename(true)}>Rename</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={rename} onOpenChange={setRename}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename Project</DialogTitle>
                        <DialogDescription>
                            Enter the new name for your project.
                        </DialogDescription>
                    </DialogHeader>
                    <input
                        placeholder="New project name"
                        className="w-full border rounded px-2 py-1"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => setRename(false)}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
