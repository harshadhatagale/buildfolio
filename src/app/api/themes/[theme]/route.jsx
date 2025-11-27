import Theme from "../../../../../models/Theme";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
export async function GET(req, {params}) {
  try {
    await dbConnect();
    const { theme } = await params;
    if (!theme) {
      return NextResponse.json({ error: "Theme ID is required" }, { status: 400 });
    }
    const data = await Theme.findById({ _id: theme.toString() })
    return NextResponse.json({ success: true, theme: data });
  } catch (error) {
    console.error("Error fetching theme:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
