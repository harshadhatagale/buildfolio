import { Mountain } from 'lucide-react'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
export default function HeroProps() {
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex justify-start gap-3 items-center'>
                <Mountain />
                <span>Hero Section</span>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Primary Heading</Label>
                <Input type={"text"} placeholder="Hi, I'm Harshad 👋" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Secondary Heading</Label>
                <Textarea placeholder="I'm a full-stack developer passionate about building interactive websites and mobile apps. I specialize in React, Next.js, and Tailwind CSS." row="5" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Call To Action</Label>
                <div className='flex flex-wrap space-x-3 space-y-3'>
                    <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>Primary</Button>
                    <Button className={"w-[40%] cursor-pointer"} variant={"outline"}>Secondary</Button>
                </div>
            </div>
        </div>
    )
}
