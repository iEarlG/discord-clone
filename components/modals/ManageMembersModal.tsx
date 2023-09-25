"use client";

import { useModalStore } from "@/hooks/useModalStore";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServerMembersAndProfile } from "@/types/type";

export const ManageMembersModal = () => {

    const { onOpen, isOpen, onClose, type, data } = useModalStore();
    const { server } = data as { server: ServerMembersAndProfile };
    
    const isModalOpen = isOpen && type === "Manage Members";

    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>  
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">Manage Members</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {server?.members?.length} Members
                </DialogDescription>
                <div className="p-6">
                    Members
                </div>
            </DialogContent>
        </Dialog>  
    );
}