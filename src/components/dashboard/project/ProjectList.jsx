'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProjectListItem from './ProjectListItem';

export default function ProjectList({ user }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLaoding] = useState(true)
    // Fetch projects function
    const fetchProjects = async () => {
        if (!user) return;
        const res = await fetch(`/api/user/${user}/projects/`);
        if (res.ok) {
            const data = await res.json();
            setProjects(data);
        } else {
            console.error('Failed to fetch projects');
        }
    };

    useEffect(() => {
        fetchProjects();
        setLaoding(false)
    }, [user]);

    // Add project and then refresh
    const addProject = async () => {
        const res = await fetch(`/api/user/${user}/projects/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            // Refetch projects after adding
            fetchProjects();
        } else {
            console.error('Failed to create project');
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            <Card
                className="flex justify-center items-center w-35 h-45 cursor-pointer hover:border-primary transition-all duration-300 ease-in-out"
                onClick={addProject}
            >
                <CardContent>
                    <Plus size={35} />
                </CardContent>
            </Card>
            {loading ? <Loader2 size={25} className='animate-spin' /> : <>
                {projects.map((project) => (
                    <ProjectListItem key={project._id} id={project._id} name={project.name} />
                ))}
            </>}
        </div>
    );
}
