"use client";

import { useState } from "react";
import { Crown, Shield, ShieldCheck, Star } from "lucide-react";

import { ServerMembersAndProfile } from "@/types/type";
import { useModalStore } from "@/hooks/useModalStore";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { UserAvatar } from "@/components/UserAvatar";

const roleIconIdentifiers = {
    "OWNER": <Crown className="h-4 w-4 ml-2 text-yellow-600" />,
    "ADMIN": <Shield className="h-4 w-4 ml-2 text-indigo-600" />,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-cyan-600" />,
    "GUEST": <Star className="h-4 w-4 ml-2 text-green-600" />,
}

export const ManageMembersModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModalStore();
    const [LoadingID, setLoadingID] = useState("");

    const { server } = data as { server: ServerMembersAndProfile };
    
    const isModalOpen = isOpen && type === "Manage Members";

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
                                    Actions
                                </div>
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>  
    );
}