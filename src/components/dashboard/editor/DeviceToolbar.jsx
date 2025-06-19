import { LaptopMinimal, Monitor, TabletSmartphone } from 'lucide-react'
import React from 'react'

export default function DeviceToolbar() {
    return (
        <div className='flex gap-4 border-2 border-muted justify-between items-center flex-col fixed top-1/2 -translate-y-1/2 z-15 right-60 px-4 bg-background py-4 rounded-md'>
            <TabletSmartphone size={18} className='cursor-pointer'/>
            <LaptopMinimal size={18} className='cursor-pointer'/>
            <Monitor size={18} className='cursor-pointer'/>
        </div>
    )
}
