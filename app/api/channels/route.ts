import { currentProfile } from "@/utils/currentProfile";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const profile = await currentProfile();


    } catch (error) {
        console.error(error, "Channel POST ERROR");
        return new NextResponse("Internal Server Error", { status: 500 })
    };
}