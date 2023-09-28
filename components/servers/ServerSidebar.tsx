import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";

import { Crown, Hash, Mic, ShieldCheck, VenetianMask, Video } from "lucide-react";

import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import ServerHeader from "@/components/servers/ServerHeader";
import { ServerSearch } from "@/components/servers/ServerSearch";
import { ServerChannel } from "@/components/servers/ServerChannel";
import { ChannelSection } from "@/components/servers/ChannelSection";

interface ServerSidebarProps {
    serverId: string;
};

const channelIcons = {
    [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2" />,
    [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
    [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />
};

const roleIcons = {
    [MemberRole.OWNER]: <Crown className="h-4 w-4 mr-2 text-yellow-600" />,
    [MemberRole.ADMIN]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-600" />,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-cyan-600" />,
    [MemberRole.GUEST]: <VenetianMask className="h-4 w-4 mr-2 text-green-600" />,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return (
            redirect("/")
        );
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                }
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);

    if (!server) {
        return (
            redirect("/")
        );
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full w-full text-primary dark:bg-[#2B2D31] bg-[#F2F1F7]">
            <ServerHeader server={server} role={role} />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch 
                        data={[{
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: channelIcons[channel.type],
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: channelIcons[channel.type],
                            }))
                        },
                        {
                            label: "Video Channels",
                            type: "channel",
                            data: videoChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: channelIcons[channel.type],
                            }))
                        },
                        {
                            label: "Members",
                            type: "member",
                            data: members?.map((member) => ({
                                id: member.id,
                                name: member.profile.name,
                                icon: roleIcons[member.role],
                            }))
                        },
                    ]}
                    />
                </div>
                <Separator className="bg-zinc-500 dark:bg-zinc-700 rounded-md my-2" />  
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerChannel 
                            label="Text Channels"
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                        />
                        {textChannels.map((channel) => (
                            <ChannelSection 
                                key={channel.id}
                                channel={channel}
                                server={server}
                                role={role}
                            />
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}