import dbConnect from "@/lib/db"
import Project from "../../../../../../models/Project";
import { NextResponse } from "next/server";
// api/project/[project]/rename
export async function PATCH(req, { params }) {
    try {
        const { project } = await params
        const { name } = await req.json()
        await dbConnect()
        if (!name) {
            return NextResponse.json(
                { success: false, message: "Name is required" },
                { status: 400 }
            );
        }
        const updated = await Project.findByIdAndUpdate(project, { name: name }, { new: true })
        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Project not found" },
                { status: 409 }
            );
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}