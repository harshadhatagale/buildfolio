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
    const [name, setName] = useState("")
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
            }, 2500)
        }
        else {
            toast.error("Failed to delete project !")
        }
    }
    const handleRename = async () => {
        const res = await fetch(`/api/project/${projectId}/rename`,
            {
                method: "PATCH",
                body: JSON.stringify({ name: name }),
                headers: { "Content-Type": "application/json" }
            }
        )
        const data = await res.json();
        if (res.ok) {
            setRename(false)
            toast.success("Project renamed succesfully!");
        } else {
            toast.error(data.message);
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className={"cursor-pointer"} variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className={"cursor-pointer"} onClick={handleRename}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
