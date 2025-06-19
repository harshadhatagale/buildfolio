
import dbConnect from "@/lib/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
export async function GET(request, { params }) {
    const { user } = await params;
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const clerkUser = await currentUser()
    if (userId !== user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    try {
        await dbConnect();

        const userData = await User.findOne({ email: clerkUser.emailAddresses[0]?.emailAddress });
        if (!userData) {
            const newUser = new User({
                userId: userId,
                name: clerkUser.fullName || "Anonymous",
                email: clerkUser.emailAddresses[0]?.emailAddress
            })

            await newUser.save();
            return NextResponse.json(newUser, { status: 201 });
        }

        return NextResponse.json(userData, { status: 201 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}