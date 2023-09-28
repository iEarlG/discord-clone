"use client";

import { Channel, MemberRole, Server } from "@prisma/client";

interface ChannelSectionProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
};

export const ChannelSection = ({
    channel,
    server,
    role
}: ChannelSectionProps) => {
    return (
        <div>
            ServerChannelSection
        </div>
    )
};