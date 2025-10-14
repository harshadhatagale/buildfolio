'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProjectListItem from './ProjectListItem';
import toast from 'react-hot-toast';

export default function ProjectList({ user, projects, setProjects }) {
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // ✅ Fetch projects
    const fetchProjects = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const res = await fetch(`/api/user/${user}/projects/`);
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            } else {
                console.error('Failed to fetch projects');
                toast.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('Error fetching projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [user]);

    // ✅ Add project with toast.promise
    const addProject = async () => {
        if (isCreating) return;

        setIsCreating(true);
        try {
            const promise = fetch(`/api/user/${user}/projects/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user,
                    name: "New Project",
                    urlSlug: `project-${Date.now()}`
                }),
            }).then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Failed to create project');
                }
                return res.json();
            });

            const newProject = await toast.promise(promise, {
                loading: 'Creating project...',
                success: 'Project created successfully!',
                error: (error) => error.message || 'Failed to create project!',
            });

            // Add the new project to the local state
            setProjects(prev => [newProject, ...prev]);

        } catch (error) {
            console.error('Error creating project:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            {loading ? (
                <div className="flex justify-center items-center w-35 h-45">
                    <Loader2 size={25} className="animate-spin" />
                </div>
            ) : (
                <>
                    {projects.map((project) => (
                        // ProjectListItem should accept urlSlug and onDelete props if needed
                        <ProjectListItem
                            key={project._id}
                            id={project._id}
                            name={project.name}
                            urlSlug={project.urlSlug}
                            onDelete={() => {
                                setProjects(prev => prev.filter(p => p._id !== project._id));
                            }}
                        />
                    ))}
                </>
            )}
        </div>
    );
}