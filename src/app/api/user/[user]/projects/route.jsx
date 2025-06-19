import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Project from "../../../../../../models/Project";


export async function GET(request, { params }) {
    const { user } = await params;
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await dbConnect();
        const projects = await Project.find({ userId: user });
        return NextResponse.json(projects, { status: 201 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    const { user } = await params;
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const clerkUser = await currentUser()
    try {
        await dbConnect();
        const newProject = await Project({userId: user, name: "Untitled Project", theme: "#fff" });
        await newProject.save();
        return NextResponse.json({message:"Project created Successfully!"}, { status: 201 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}