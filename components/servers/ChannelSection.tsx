"use client";

import { useParams, useRouter } from "next/navigation";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { cn } from "@/lib/utils";

import { Hash, Mic, Video } from "lucide-react";

interface ChannelSectionProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
};

const channelIcons = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video
};

export const ChannelSection = ({
    channel,
    server,
    role
}: ChannelSectionProps) => {
    const router = useRouter();
    const params = useParams();

    const Icon = channelIcons[channel.type];
    return (
        <button
            className={cn("flex items-center w-full gap-x-2 group px-2 py-2 mb-1 rounded-md hover:bg-zinc-500/10 dark:hover:bg-zinc-700/50 transition",
                params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
            onClick={() => {}}
        >
            <Icon className="flex-shrink-0 w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <p className={cn("line-clamp-1 font-semibold text-xs text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 capitalize",
                params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>
        </button>
    )
};