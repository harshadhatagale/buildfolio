"use client";

import React, { useEffect, useState } from "react";
import ProjectList from "@/components/dashboard/project/ProjectList";
import { useParams } from "next/navigation";
import Navbar from "@/components/dashboard/project/Navbar";
import { Loader2 } from "lucide-react";
export default function Page() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/${params.user}`);
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

    if (params.user) {
      fetchUser();
    }
  }, [params.user]);

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
