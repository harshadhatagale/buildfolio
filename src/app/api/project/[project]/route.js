import dbConnect from "@/lib/db"
import Project from "../../../../../models/Project"
import { NextResponse } from "next/server"

export async function DELETE(req, {params}){
    const {project}= await params
    try
    {
        await dbConnect()
        const deletedProject= await Project.findByIdAndDelete(project)
        if(!deletedProject)
        {
            return NextResponse.json({error: "Project not found !"}, {status: 404})
        }
        return NextResponse.json({message: "Project deleted succesfully !"}, {status: 200})
    }
    catch(error)
    {
        return NextResponse.json({error: "Failed to delete project !"}, {status: 501})
    }
}