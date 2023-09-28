"use client";

import { ChannelType, MemberRole } from "@prisma/client";

import { ServerMembersAndProfile } from "@/types/type";
import { ActionTooltip } from "@/components/ActionTooltip";
import { Plus } from "lucide-react";

interface ServerChannelProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerMembersAndProfile;
};

export const ServerChannel = ({
    label,
    role,
    sectionType,
    channelType,
    server
}: ServerChannelProps) => {
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
};