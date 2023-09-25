import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: {params: {serverId: string}}
) {
    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                name,
                imageUrl,
            }
        });

        return NextResponse.json(server, { status: 200 });
        
    } catch (error) {
        console.log(error, "SERVER ID ERROR PATCH");

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}