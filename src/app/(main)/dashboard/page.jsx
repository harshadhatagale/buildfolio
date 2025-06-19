"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ProjectList from "@/components/dashboard/project/ProjectList";
import Navbar from "@/components/dashboard/project/Navbar";
import { Loader2 } from "lucide-react";
export default function Page() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false); // moved here to ensure it only triggers after fetch completes
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 size={25} className="animate-spin" />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="px-5 pt-5">
            <ProjectList user={user._id} />
          </div>
        </>
      )}
    </>
  );
}
