import dbConnect from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import Section from "../../../../../../models/Section";

export async function GET(req, { params }) {
    const { projectId } = await params
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await dbConnect()
        const sectionData = await Section.find({ projectId: projectId })
        if (!sectionData) {
            return NextResponse.json({ error: "Sections not found !" }, { status: 401 })
        }
        return NextResponse.json({ sections: sectionData }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `Error in fetching sections: ${error}` }, { status: 501 })
    }
}

export async function POST(req, { params }) {
    const { projectId } = await params
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await req.json()
        const { type, content } = body
        await dbConnect()
        const sectionCount = await Section.countDocuments({ projectId: projectId })
        const newSection = await Section({
            projectId: projectId,
            type: type,
            order: sectionCount,
            content: content
        })
        await newSection.save()
        return NextResponse.json({ section: newSection }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: `Error in fetching sections: ${error}` }, { status: 501 })
    }
}