"use client";

import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push(`/dashboard/${userId}`);
    }
  }, [isLoaded, userId]);

  return <div className="flex items-center justify-center h-screen">
    <Loader2 size={25} className="animate-spin" />
  </div>;
}
