import { NextResponse } from "next/server";
import { v4 as uuidv4  } from "uuid";

import { currentProfile } from "@/utils/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized logged in", { status: 401 });
        }

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),   
                channels: {
                    create: [
                        { name: "general", profileId: profile.id }
                    ]
                },
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.OWNER }
                    ]
                }
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.error("SERVER POST", error);
        return (
            new NextResponse("An error occurred while creating the server.", { status: 500 })
        )
    }
}