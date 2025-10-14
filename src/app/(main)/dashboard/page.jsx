"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ProjectList from "@/components/dashboard/project/ProjectList";
import Navbar from "@/components/dashboard/project/Navbar";
import { Loader2 } from "lucide-react";
import CreateProject from "@/components/forms/CreateProject";
export default function Page() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
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
  const handleProjectCreated = (newProjectData) => {
    // Create a proper project object to add to the state
    const newProject = {
      _id: newProjectData.projectId,
      name: newProjectData.name, // You might need to adjust this based on your API response
      urlSlug: newProjectData.urlSlug,
      userId: userId
    };
    setProjects((prev) => [newProject, ...prev]);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 size={25} className="animate-spin" />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="mt-4 ml-5">
            <CreateProject
              onProjectCreated={handleProjectCreated}
              userId={user._id}
            />
          </div>
          <div className="px-5 pt-5">
            <ProjectList user={user._id} projects={projects} setProjects={setProjects} />
          </div>
        </>
      )}
    </>
  );
}
