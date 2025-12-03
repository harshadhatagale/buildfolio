import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "../../../../models/Project";

export async function POST(request) {
    try {
        const { userId, name, urlSlug } = await request.json();
        
        // Input validation
        if (!userId || !name || !urlSlug) {
            return NextResponse.json(
                { message: "Missing required fields: userId, name, or urlSlug" }, 
                { status: 400 }
            );
        }

        await dbConnect();
        
        const existingProject = await Project.findOne({ urlSlug: urlSlug });
        
        if (existingProject) {
            return NextResponse.json(
                { message: "URL slug is not available!" }, 
                { status: 409 } // 409 Conflict is more appropriate for duplicate resources
            );
        }
        
        const projectCount = await Project.countDocuments({ userId: userId });
        if (projectCount > 0)
        {
            return NextResponse.json(
                { message: "Limit is reached! Upgrade your subscription plan!" }, 
                { status: 403 } 
            );
        }
        const newProject = new Project({ 
            userId: userId, 
            name: name,
            urlSlug: urlSlug 
        });
        
        await newProject.save();
        
        return NextResponse.json(
            { 
                message: "Project created successfully!",
                projectId: newProject._id // Return the created project ID
            }, 
            { status: 201 }
        );
        
    } catch (error) {
        console.error("Project creation error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message }, 
            { status: 500 }
        );
    }
}