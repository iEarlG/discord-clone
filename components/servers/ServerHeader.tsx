"use client";

import { MemberRole } from "@prisma/client";

import { ServerMembersAndProfile } from "@/types/type";

interface ServerHeaderProps {
    server: ServerMembersAndProfile;
    role?: MemberRole;
};

const ServerHeader: React.FC<ServerHeaderProps> = ({
    server,
    role,
}) => {
    return ( 
        <div>ServerHeader</div>
    );
}

export default ServerHeader;