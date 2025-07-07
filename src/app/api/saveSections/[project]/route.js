import dbConnect from "@/lib/db";
import Section from "../../../../../models/Section";
import { NextResponse } from "next/server";

export async function POST(req, {params}) {
    try {
        const {project}= await params; 
        const { sections } =await req.json();
        if (!sections || !Array.isArray(sections)) {
            return NextResponse.json(
                { success: false, error: "Sections data is required and must be an array" },
                { status: 400 }
            );
        }
        if (!project) {
            return NextResponse.json(
                { success: false, error: "Project ID is required" },
                { status: 400 }
            );
        }

        await dbConnect();
        
        await Section.deleteMany({ projectId: project });

        // Prepare new sections
        const sectionsToInsert = sections.map((s) => {
            const id = s._id?.toString();
            if (id?.startsWith("temp-")) {
                const { _id, ...rest } = s;
                return { projectId: project, ...rest };
            }
            return { projectId: project, ...s };
        });

        // Insert new sections
        const created = await Section.insertMany(sectionsToInsert);

        return NextResponse.json({ success: true, data: created });
    } catch (error) {
        console.error("Error saving sections:", error);
        return NextResponse.json(
            { 
                success: false, 
                error: error.message,
                details: error.errors || null
            },
            { status: 500 }
        );
    }
}