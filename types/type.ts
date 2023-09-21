import { Member, Profile, Server } from "@prisma/client";

export type ServerMembersAndProfile = Server & {
    members: (Member & { profile: Profile })[];
};