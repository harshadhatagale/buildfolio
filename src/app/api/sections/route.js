import dbConnect from "@/lib/db";
import Section from "../../../../models/Section";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        const { projectId } = await req.json();
        if (!projectId) {
            return NextResponse.json(
                { success: false, error: "Project ID is required" },
                { status: 400 }
            );
        }
        await dbConnect();
        const sections = await Section.find({ projectId: projectId }).sort({
            order: 1,
        });

        return NextResponse.json({ success: true, data: sections });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
