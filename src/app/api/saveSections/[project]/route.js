import dbConnect from "@/lib/db";
import Project from "../../../../../models/Project";
import Section from "../../../../../models/Section";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { project } = params;
    const { sections } = await req.json();

    if (!sections || !Array.isArray(sections)) {
      return NextResponse.json(
        { success: false, error: "Sections data must be an array" },
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

    // ✅ Delete old sections for this project
    await Section.deleteMany({ projectId: project });

    // ✅ Prepare new sections for insertion
    const sectionsToInsert = sections.map((s) => {
      const id = s._id?.toString();
      if (id?.startsWith("temp-")) {
        const { _id, ...rest } = s;
        return { projectId: project, ...rest };
      }
      return { projectId: project, ...s };
    });

    // ✅ Insert all new sections
    const createdSections = await Section.insertMany(sectionsToInsert);

    // ✅ Update Project's sections array
    const sectionIds = createdSections.map((sec) => sec._id);
    await Project.findByIdAndUpdate(project, { sections: sectionIds });

    return NextResponse.json({
      success: true,
      message: "Sections saved successfully!",
      data: createdSections,
    });
  } catch (error) {
    console.error("Error saving sections:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save sections",
        details: error.message,
      },
      { status: 500 }
    );
  }
}