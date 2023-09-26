"use client";

import qs from "query-string";
import { useState } from "react";
import { MemberRole } from "@prisma/client";
import { Check, Crown, Loader2, MoreVertical, Shield, ShieldCheck, ShieldQuestion, Star, UserX2 } from "lucide-react";

import { ServerMembersAndProfile } from "@/types/type";
import { useModalStore } from "@/hooks/useModalStore";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, 
    DropdownMenuSubContent, DropdownMenuTrigger, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

import { UserAvatar } from "@/components/UserAvatar";
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconIdentifiers = {
    "OWNER": <Crown className="h-4 w-4 ml-2 text-yellow-600" />,
    "ADMIN": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-600" />,
    "MODERATOR": <Shield className="h-4 w-4 ml-2 text-cyan-600" />,
    "GUEST": <Star className="h-4 w-4 ml-2 text-green-600" />,
}

export const ManageMembersModal = () => {
    const router = useRouter();
    const { onOpen, isOpen, onClose, type, data } = useModalStore();
    const [LoadingID, setLoadingID] = useState("");

    const { server } = data as { server: ServerMembersAndProfile };
    
    const isModalOpen = isOpen && type === "Manage Members";

    const onKicked = async (memberId: string) => {
        try {
            setLoadingID(memberId);

            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id
                }
            });

            const response = await axios.delete(url);

            router.refresh();
            onOpen("Manage Members", { server: response.data });
        } catch (error) {
            console.log(error, "Manage Member Modal");
        } finally {
            setLoadingID("");
        }
    };

    const onRoleChanged = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingID(memberId);

            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,   
                }
            });

            const response = await axios.patch(url, { role });

            router.refresh();
            onOpen("Manage Members", { server: response.data });
        } catch (error) {
            console.log(error, "Manage Member Modal");
        } finally {
            setLoadingID("");
        }
    };

    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>  
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">Manage Members</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="flex items-center text-xs font-semibold gap-x-1">
                                    {member.profile.name}
                                    {roleIconIdentifiers[member.role]}
                                    {member.role}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {server.name}
                                </p>
                            </div>
                            {server.profileId !== member.profileId && LoadingID !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="h-4 w-4 text-zinc-500" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="h-4 w-4 mr-2" />
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem onClick={() => onRoleChanged(member.id, "ADMIN")}>
                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                            Admin
                                                            {member.role === "ADMIN" && (
                                                                <Check className="h-4 w-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChanged(member.id, "MODERATOR")}>
                                                            <Shield className="h-4 w-4 mr-2" />
                                                            Moderator
                                                            {member.role === "MODERATOR" && (
                                                                <Check className="h-4 w-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChanged(member.id, "GUEST")}>
                                                            <Star className="h-4 w-4 mr-2" />
                                                            Guest
                                                            {member.role === "GUEST" && (
                                                                <Check className="h-4 w-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onKicked(member.id)}>
                                                <UserX2 className="h-4 w-4 mr-2" />
                                                Kick Member
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                            {LoadingID === member.id && (
                                <Loader2 className="h-4 w-4 animate-spin text-zinc-500 ml-auto" />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>  
    );
}