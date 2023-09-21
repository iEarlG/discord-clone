"use client";

import { MemberRole } from "@prisma/client";
import { ChevronDownIcon, Plus, Settings, UserPlus, Users, XOctagon } from "lucide-react";

import { ServerMembersAndProfile } from "@/types/type";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ServerHeaderProps {
    server: ServerMembersAndProfile;
    role?: MemberRole;
};

const ServerHeader: React.FC<ServerHeaderProps> = ({
    server,
    role,
}) => {
    const isOwner = role === MemberRole.OWNER;
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = role === MemberRole.MODERATOR;
    const isGuest = role === MemberRole.GUEST;
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-full h-12 flex items-center text-md font-semibold px-3 border-neutral-200 dark:border-neutral-800 
                border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDownIcon className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-[#191413] dark:text-neutral-400 space-y-[2px]">
                {isAdmin || isModerator || isOwner && (
                    <DropdownMenuItem className="text-sm px-3 py-2 cursor-pointer">
                        Create Channel
                        <Plus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin || isOwner && (
                    <DropdownMenuItem className="text-sm px-3 py-2 cursor-pointer">
                        Server Settings
                        <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin || isOwner && (
                    <DropdownMenuItem className="text-sm px-3 py-2 cursor-pointer">
                        Manage Members
                        <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin || isModerator || isGuest || isOwner && (
                    <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 text-sm px-3 py-2 cursor-pointer">
                        Invite People
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isOwner && (
                    <DropdownMenuSeparator />
                )}
                {isOwner && (
                    <DropdownMenuItem className="text-rose-700 dark:text-rose-500 text-sm px-3 py-2 cursor-pointer">
                        Delete Server
                        <XOctagon className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator || isGuest && (
                    <DropdownMenuItem className="text-rose-700 dark:text-rose-500 text-sm px-3 py-2 cursor-pointer">
                        Leave Server
                        <XOctagon className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ServerHeader;