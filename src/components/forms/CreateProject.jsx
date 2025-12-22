"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileIcon, PlusIcon } from "lucide-react";

export default function CreateProject({ onProjectCreated, userId }) {
  const [name, setName] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => { // Added event parameter
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name, urlSlug }),
      });

      const data = await res.json();
      
      if (res.ok) {
        onProjectCreated(data);
        setName("");
        setUrlSlug("");
        // Dialog will close via DialogClose component
      } else {
        setError(data.message || "Failed to create project");
      }
    } catch (err) {
      setError("Error creating project");
      console.error("Error creating project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="dark:text-black">
          <FileIcon/>
          <span>Create Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
          <DialogDescription>
            Add details to create your new project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Project Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Portfolio Website"
              required
            />
          </div>
          <div>
            <Label>URL Slug</Label>
            <Input
              value={urlSlug}
              onChange={(e) => setUrlSlug(e.target.value)}
              placeholder="ex. harsh-tech"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}