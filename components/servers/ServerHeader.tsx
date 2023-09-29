"use client";

import { MemberRole } from "@prisma/client";
import { ChevronDownIcon, LogOut, Plus, Settings, UserPlus, Users } from "lucide-react";

import { ServerMembersAndProfile } from "@/types/type";
import { useModalStore } from "@/hooks/useModalStore";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ServerHeaderProps {
    server: ServerMembersAndProfile;
    role?: MemberRole;
};

const ServerHeader: React.FC<ServerHeaderProps> = ({
    server,
    role,
}) => {
    const { onOpen } = useModalStore();

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
                {isOwner && isAdmin && isModerator || !isGuest && (
                    <DropdownMenuItem 
                        className="text-sm px-3 py-2 cursor-pointer"
                        onClick={() => onOpen("Create Channel", {server})}
                    >
                        Create Channel
                        <Plus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isOwner && isAdmin || !isModerator && !isGuest && (
                    <DropdownMenuItem 
                        className="text-sm px-3 py-2 cursor-pointer"
                        onClick={() => onOpen("Edit Server", {server})}
                    >
                        Server Settings
                        <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isOwner && isAdmin || !isModerator && !isGuest && (
                    <DropdownMenuItem 
                        className="text-sm px-3 py-2 cursor-pointer"
                        onClick={() => onOpen("Manage Members", { server })}
                    >
                        Manage Members
                        <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isOwner && isAdmin && isModerator && isGuest || (
                    <DropdownMenuItem 
                        className="text-indigo-600 dark:text-indigo-400 text-sm px-3 py-2 cursor-pointer"
                        onClick={() => onOpen("Invite", { server })}
                    >
                        Invite People
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isOwner && isAdmin || (
                    <DropdownMenuSeparator />
                )}
                {isOwner && (
                    <DropdownMenuItem 
                        className="text-rose-700 dark:text-rose-500 text-sm px-3 py-2 cursor-pointer"
                        onClick={() => onOpen("Delete Server", { server })}
                    >
                        Delete Server
                        <LogOut className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && isModerator && isGuest || !isOwner && (
                    <DropdownMenuItem 
                        className="text-rose-700 dark:text-rose-500 text-sm px-3 py-2 cursor-pointer"
                        onClick={() => onOpen("Leave Server", { server })}
                    >
                        Leave Server
                        <LogOut className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ServerHeader;