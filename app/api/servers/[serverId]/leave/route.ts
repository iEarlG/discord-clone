import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params: {serverId: string}}
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!params.serverId) {
            return new NextResponse("Server ID is nowhere to be found", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json(server);
        
    } catch (error) {
        console.error(error, "ServerID Leave Route Error");
        return new NextResponse("Internal Error", {status: 500});
    }  
};