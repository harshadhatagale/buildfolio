import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Theme from "../../../../models/Theme";
import mongoose from "mongoose";

// POST - Create a new theme
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (!body.colors || typeof body.colors !== "object") {
      console.error("Invalid theme format:", body.colors);
      return NextResponse.json({ error: "Invalid theme format" }, { status: 400 });
    }
    
    const theme = await Theme.create({
      userId: body.userId,
      name: body.name || "Untitled theme",
      colors: body.colors
    });

    return NextResponse.json({ success: true, theme }, { status: 201 });
  } catch (error) {
    console.error("Error creating theme:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET - Get all themes of the user
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const themes = await Theme.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, themes });
  } catch (error) {
    console.error("Error fetching themes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
