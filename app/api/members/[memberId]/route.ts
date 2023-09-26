import { NextResponse } from "next/server";

import { currentProfile } from "@/utils/currentProfile";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}: {params: {memberId: string}}
) {
    try {
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!serverId) {
            return new NextResponse("Server ID is Missing", {status: 400});
        }

        if (!params.memberId) {
            return new NextResponse("Member ID is Missing", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error(error, "MEMBER ID DELETE ERROR");
        return new NextResponse("Internal Server Error", {status: 500});
    }
};

export async function PATCH(
    req: Request,
    {params}: {params: {memberId: string}}
) { 
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!serverId) {
            return new NextResponse("Server ID is Missing", {status: 400});
        }

        if (!params.memberId) {
            return new NextResponse("Member ID is Missing", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error(error, "MEMBER ID PATCH ERROR");
        return new NextResponse("Internal Server Error", {status: 500})
    };
};