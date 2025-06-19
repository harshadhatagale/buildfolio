'use client'
import React from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { EllipsisVertical, Lock, PanelsTopLeft, Plus } from 'lucide-react';
import ProjectMenu from './ProjectMenu';
import { usePathname, useRouter } from 'next/navigation';
export default function ProjectListItem({ id, name }) {
    const router= useRouter()
    const path= usePathname()
    return (
        <>
            <Card className="flex flex-col justify-center items-center w-35 h-45 cursor-pointer hover:border-primary transition-all duration-300 ease-in-out py-2">
                <div className='h-[170px] justify-between flex flex-col' onClick={()=>router.push(`${path}/${id}`)}>
                    <div className={"flex flex-col justify-center items-center py-3 h-20"}>
                        <PanelsTopLeft size={65} />
                    </div>
                    <div className="flex flex-col justify-center items-center text-center">
                        <h3 className="text-sm font-semibold">{name}</h3>
                    </div>
                </div>
                <div className='flex justify-end w-full px-2'>
                    <Lock size={16} />
                    <ProjectMenu projectId={id} />
                </div>
            </Card>
        </>
    )
}
