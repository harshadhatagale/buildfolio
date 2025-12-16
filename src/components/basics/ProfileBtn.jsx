'use client'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LoaderPinwheel } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export default function ProfileBtn() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router= useRouter()
    // If data is still loading
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center">
                <LoaderPinwheel size={24} className='animate-spin'/>
            </div>
        );
    }
    return (
        <Avatar className="border-1 border-muted cursor-pointer shadow-md" onClick={()=> router.push("/profile")}>
            <AvatarImage
                src={user?.imageUrl ?? ""}
                alt={user?.fullName ?? "Profile"}
            />
            <AvatarFallback className="text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                {user?.firstName?.charAt(0) ?? "U"}
            </AvatarFallback>
        </Avatar>
    )
}
