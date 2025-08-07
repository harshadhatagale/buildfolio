"use client";
import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Paintbrush, Loader2 } from 'lucide-react';
import ThemeVariant from './ThemeVariant';
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export default function ThemeEditor() {
    const { userId } = useAuth();
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchThemes = async () => {
            if (!userId) return;
            try {
                const res = await fetch(`/api/themes?userId=${userId}`);
                const data = await res.json();
                if (res.ok) {
                    setThemes(data.themes || []);
                } else {
                    toast.error(data.error || "Failed to fetch themes");
                }
            } catch (err) {
                console.error("Error fetching themes:", err);
                toast.error("Error fetching themes");
            } finally {
                setLoading(false);
            }
        };
        fetchThemes();
    }, [userId]);

    return (
        <Sheet >
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
                        <div suppressHydrationWarning className="mt-4 h-[30%] overflow-x-hidden overflow-y-auto mx-auto gap-4 grid grid-cols-3 items-center">
                            {loading ? (
                                <div className="col-span-2 flex justify-center">
                                    <Loader2 className="animate-spin" size={24} />
                                </div>
                            ) : themes.length > 0 ? (
                                themes.map((theme) => (
                                    <ThemeVariant
                                        key={theme._id}
                                        name={theme.name}
                                        colors={theme.colors}
                                    />
                                ))
                            ) : (
                                <p className="col-span-2 text-muted-foreground text-sm">
                                    No themes found. Create one to see it here!
                                </p>
                            )}
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
