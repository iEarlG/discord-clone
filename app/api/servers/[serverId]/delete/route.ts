
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import { currentProfile } from "@/utils/currentProfile";

export async function DELETE(
    req: Request,
    { params }: {params: {serverId: string}}
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id,
            }
        });

        return NextResponse.json(server, { status: 200 });
        
    } catch (error) {
        console.log(error, "SERVER ID ERROR DELETE");

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}