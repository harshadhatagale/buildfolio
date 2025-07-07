import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function PreviewSkeleton() {
    return (
        <div className='w-full p-5'>
            <div className='rounded-md border border-muted p-2 flex justify-between items-center'>
                <Skeleton className={'h-14 w-14'} />
                <Skeleton className={'h-5 w-[60%] hidden md:block'} />
            </div>
            <div className='w-full flex-col md:flex-row flex gap-5 items-center my-5'>
                <Skeleton className={"h-100 w-100"} />
                <div className='h-100 w-100 flex gap-5 flex-col'>
                    <Skeleton className={"h-5 w-full"} />
                    <Skeleton className={"h-5 w-full"} />
                    <Skeleton className={"h-5 w-full"} />
                </div>
            </div>
        </div>
    )
}
