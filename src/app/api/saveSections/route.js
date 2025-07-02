import dbConnect from "@/lib/db";
import Section from "../../../../../models/Section";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { projectId, sections } = await req.json();
        console.log(projectId)
        await dbConnect();
        await Section.deleteMany({ projectId: projectId });

        const created = await Section.insertMany(
            sections.map((s) => {
                const id = s._id?.toString();
                if (id?.startsWith("temp-")) {
                    const { _id, ...rest } = s;
                    return { projectId: projectId, ...rest };
                } else {
                    return { projectId: projectId, ...s };
                }
            })
        );

        return NextResponse.json({ success: true, data: created });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
