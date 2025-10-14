import dbConnect from "@/lib/db"
import Project from "../../../../../models/Project"
import { NextResponse } from "next/server"

export async function GET(req, {params}) {

    try {
        const { project } = await params
        await dbConnect()
        const myproject = await Project.findById(project)
        if (!myproject) {
            return NextResponse.json({ error: "Project not found !" }, { status: 404 })
        }
        return NextResponse.json({ myproject }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch project !" }, { status: 501 })
    }
}

export async function POST(request, { params }) {
    const { userId, name, urlSlug } = await request.json();

    try {
        await dbConnect();
        const existingURLSlug = await Project.find({ urlSlug: urlSlug })
        if (!existingURLSlug) {
            const newProject = await Project({ userId: userId, name: name, theme: "", urlSlug: urlSlug });
            await newProject.save();
            return NextResponse.json({ message: "Project created Successfully!" }, { status: 201 });
        }
        else {
            return NextResponse.json({ message: "URL slug is not available !" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", error }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { project } = await params
    try {
        await dbConnect()
        const deletedProject = await Project.findByIdAndDelete(project)
        if (!deletedProject) {
            return NextResponse.json({ error: "Project not found !" }, { status: 404 })
        }
        return NextResponse.json({ message: "Project deleted succesfully !" }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to delete project !" }, { status: 501 })
    }
}

export async function PATCH(req, { params }) {
    const { project } = await params // Removed unnecessary await
    const body = await req.json()
    try {
        await dbConnect()
        const updatedProject = await Project.findByIdAndUpdate(
            project,
            body,
            { new: true }
        )
        if (!updatedProject) {
            return NextResponse.json(
                { error: "Project not found!" },
                { status: 404 }
            )
        }
        return NextResponse.json(
            {
                message: "Project updated successfully!",
                project: updatedProject
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update project!" + error },
            { status: 500 },
        )
    }
}
