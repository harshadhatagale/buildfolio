'use client';
import React from 'react';
import ProjectListItem from './ProjectListItem';

export default function ProjectList({ projects, setProjects }) {
    if (!projects.length) {
        return <p className="text-sm text-muted-foreground">No projects yet</p>;
    }
    return (
        <div className="flex flex-wrap items-center gap-4">
            {projects.map((project) => (
                <ProjectListItem
                    key={project._id}
                    id={project._id}
                    name={project.name}
                    urlSlug={project.urlSlug}
                    visibillity={project.visibillity}
                    onDelete={() => {
                        setProjects(prev => prev.filter(p => p._id !== project._id));
                    }}
                />
            ))}
        </div>
    );
}