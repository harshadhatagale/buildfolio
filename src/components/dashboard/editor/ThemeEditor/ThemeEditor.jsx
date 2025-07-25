import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Paintbrush } from 'lucide-react'
import ThemeVariant from './ThemeVariant'

export default function ThemeEditor() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Paintbrush className='cursor-pointer' size={20} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <div>
                            <h3 className='text-2xl font-bold'>Theme Editor</h3>
                            <p className='text-lg font-semibold text-muted-foreground'>Select your favourite theme</p>
                        </div>
                    </SheetTitle>
                    <SheetDescription asChild>
                        <div className="mt-4 gap-2 grid grid-cols-2 items-center">
                            {Array(4).fill().map((_, index) => (
                                <ThemeVariant key={index}/>
                            ))}
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}