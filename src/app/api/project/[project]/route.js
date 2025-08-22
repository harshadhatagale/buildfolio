import dbConnect from "@/lib/db"
import Project from "../../../../../models/Project"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const { project } = params // Removed await
    
    try {
        await dbConnect()
        const myproject = await Project.findById(project)
        
        if (!myproject) {
            return NextResponse.json(
                { error: "Project not found!" }, 
                { status: 404 }
            )
        }
        
        return NextResponse.json(myproject, { status: 200 }) // Removed wrapping object
    } catch (error) {
        console.error("GET Error:", error)
        return NextResponse.json(
            { error: "Failed to fetch project!" }, 
            { status: 500 } // Changed from 501
        )
    }
}

export async function DELETE(req, { params }) {
    const { project } = params // Removed await
    
    try {
        await dbConnect()
        const deletedProject = await Project.findByIdAndDelete(project)
        
        if (!deletedProject) {
            return NextResponse.json(
                { error: "Project not found!" }, 
                { status: 404 }
            )
        }
        
        return NextResponse.json(
            { message: "Project deleted successfully!" }, 
            { status: 200 }
        )
    } catch (error) {
        console.error("DELETE Error:", error)
        return NextResponse.json(
            { error: "Failed to delete project!" }, 
            { status: 500 } // Changed from 501
        )
    }
}

export async function PATCH(req, { params }) {
    const { project } = params // Removed await
    const body = await req.json()
    
    try {
        await dbConnect()
        const updatedProject = await Project.findByIdAndUpdate(
            project, 
            body, 
            { new: true, runValidators: true } // Added runValidators
        )
        
        if (!updatedProject) {
            return NextResponse.json(
                { error: "Project not found!" }, 
                { status: 404 }
            )
        }
        
        return NextResponse.json(
            updatedProject, // Return the object directly
            { status: 200 }
        )
    } catch (error) {
        console.error("PATCH Error:", error)
        return NextResponse.json(
            { error: "Failed to update project!" }, 
            { status: 500 }
        )
    }
}
