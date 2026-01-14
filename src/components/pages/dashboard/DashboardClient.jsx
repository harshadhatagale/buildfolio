"use client";

import { useState } from "react";
import Navbar from "@/components/dashboard/project/Navbar";
import CreateProject from "@/components/forms/CreateProject";
import ProjectList from "@/components/dashboard/project/ProjectList";

export default function DashboardClient({ myUser, initialProjects }) {
    const [projects, setProjects] = useState(initialProjects);

    const handleProjectCreated = (data) => {
        const newProject = {
            _id: data.projectId,
            name: data.name,
            urlSlug: data.urlSlug,
            userId: myUser._id,
        };

        setProjects((prev) => [newProject, ...prev]);
    };

    return (
        <>
            <Navbar />
            <div className="px-5 mt-4">
                <CreateProject
                    userId={myUser._id}
                    subType={myUser.subscriptionType}
                    onProjectCreated={handleProjectCreated}
                />
            </div>

            <div className="px-5 pt-5">
                <ProjectList
                    projects={projects}
                    setProjects={setProjects}
                />
            </div>
        </>
    );
}
