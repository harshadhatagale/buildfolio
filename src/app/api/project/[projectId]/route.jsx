import dbConnect from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Project from "../../../../../models/Project";
import { NextResponse } from "next/server";
export async function DELETE(req, { params }) {
    const { projectId } = await params
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect()
        const deletedProject= await Project.findByIdAndDelete(projectId)

        if (!deletedProject) {
            return NextResponse.json({error: "Project not found!"}, {status: 404})
        }
        return NextResponse.json({message: "Project deleted successfully!"}, {status: 201})
    } catch (error) {
        return NextResponse.json({error: "Failed to delete project"}, {status: 501})
    }
}