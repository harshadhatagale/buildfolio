import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LayoutDashboard, Plus } from 'lucide-react'
import React from 'react'

export default function NavProps({ content }) {
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <LayoutDashboard />
                <span>Navbar</span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Portfolio Name</Label>
                <Input type={"text"} placeholder="Enter your Portfolio name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Links</Label>
                <div className='flx flex-wrap space-x-3 space-y-3'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>Home</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className='dark:text-black text-white'>/#home</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>About</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className='dark:text-black text-white'>/#about</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>Skills</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className='dark:text-black text-white'>/#skills</p>
                            </TooltipContent>
                        </Tooltip>
                        <Button className='cursor-pointer' variant={"outline"}><Plus /></Button>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

