"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import ProjectList from "@/components/dashboard/project/ProjectList";
import Navbar from "@/components/dashboard/project/Navbar";
import CreateProject from "@/components/forms/CreateProject";

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [myUser, setMyUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const syncUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.fullName,
              email: user.emailAddresses[0].emailAddress,
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to sync user");

        const data = await res.json();
        setMyUser(data)
      } catch (err) {
        console.error("User sync error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    syncUser();
    
  }, [isLoaded, isSignedIn, user]);

  
  const handleProjectCreated = (newProjectData) => {
    const newProject = {
      _id: newProjectData.projectId,
      name: newProjectData.name,
      urlSlug: newProjectData.urlSlug,
      userId: myUser?._id,
    };

    setProjects((prev) => [newProject, ...prev]);
  };

  /* ✅ Global loading state */
  if (!isLoaded || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 size={28} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mt-4 ml-5">
        <CreateProject
          onProjectCreated={handleProjectCreated}
          userId={myUser?._id}
          subType={myUser?.subscriptionType}
        />
      </div>

      <div className="px-5 pt-5">
        <ProjectList
          user={myUser?._id}
          projects={projects}
          setProjects={setProjects}
        />
      </div>
    </>
  );
}
