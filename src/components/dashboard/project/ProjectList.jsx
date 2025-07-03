'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProjectListItem from './ProjectListItem';
import toast from 'react-hot-toast';

export default function ProjectList({ user }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch projects
    const fetchProjects = async () => {
        if (!user) return;
        const res = await fetch(`/api/user/${user}/projects/`);
        if (res.ok) {
            const data = await res.json();
            setProjects(data);
            setLoading(false);
        } else {
            console.error('Failed to fetch projects');
            toast.error('Failed to fetch projects');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [user]);

    // ✅ Add project with toast.promise
    const addProject = async () => {
        const promise = fetch(`/api/user/${user}/projects/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if (!res.ok) throw new Error('Failed to create project');
            return res.json();
        });

        await toast.promise(promise, {
            loading: 'Creating project...',
            success: 'Project created successfully!',
            error: 'Failed to create project!',
        });

        fetchProjects(); // Refresh after creation
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

            {loading ? (
                <div className="flex justify-center items-center w-35 h-45">
                    <Loader2 size={25} className="animate-spin" />
                </div>
            ) : (
                <>
                    {projects.map((project) => (
                        <ProjectListItem
                            key={project._id}
                            id={project._id}
                            name={project.name}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
