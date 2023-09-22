"use client";

import { Copy, RefreshCcw } from "lucide-react";

import { useModalStore } from "@/hooks/useModalStore";
import { useOrigin } from "@/hooks/useOrigin";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateInviteModal = () => {
    const origin = useOrigin();
    const { isOpen, onClose, type, data } = useModalStore();
    const { server } = data;

    const isModalOpen = isOpen && type === "Invite";
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>  
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">Invite Friends</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input 
                            className="bg-zinc-300/50 border-0 focus-visible:right-0 text-[#1D1D1D] focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button size="icon">
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button
                        variant="link"
                        size="sm"   
                        className="text-xs text-zinc-500 mt-4"
                    >
                        Generate new link
                        <RefreshCcw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>  
    );
}