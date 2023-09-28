"use client";

import { Plus, Settings } from "lucide-react";

import { ChannelType, MemberRole } from "@prisma/client";
import { ServerMembersAndProfile } from "@/types/type";
import { useModalStore } from "@/hooks/useModalStore";

import { ActionTooltip } from "@/components/ActionTooltip";

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
    const { onOpen } = useModalStore();
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button 
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        onClick={() => onOpen("Create Channel")}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN || MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Manage Members" side="top">
                    <button 
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        onClick={() => onOpen("Manage Members", { server })}
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
};