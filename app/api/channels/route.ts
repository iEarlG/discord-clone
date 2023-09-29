import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const servedId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!servedId) {
            return new NextResponse("Missing Server ID", { status: 400 });
        }

        if (name === "general") {
            return new NextResponse("Name cannot be 'general'", { status: 400 });
        }
        
        const server = await db.server.update({
            where: {
                id: servedId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.OWNER, MemberRole.ADMIN],
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type
                    }
                }
            }
        });

        return NextResponse.json(server, { status: 201 });
    } catch (error) {
        console.error(error, "Channel POST ERROR");
        return new NextResponse("Internal Server Error", { status: 500 })
    };
}