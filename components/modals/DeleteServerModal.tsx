"use client";

import axios from "axios";
import { useState } from "react";

import { useModalStore } from "@/hooks/useModalStore";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModalStore();
    const { server } = data;

    const [isLoading, setIsLoading] = useState(false);
    
    const isModalOpen = isOpen && type === "Delete Server";

    const onDeleteServer = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/servers/${server?.id}/delete`);

            onClose();
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error, "Delete Server Modal Error");
        } finally {
            setIsLoading(false);
        }
    };

    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>  
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">Delete <span className="text-cyan-500">
                        {server?.name}</span> Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete this server? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button 
                            variant="ghost"
                            onClick={() => onClose()} 
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive"
                            onClick={() => onDeleteServer()}
                            disabled={isLoading}
                        >
                            Delete Server
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>  
    );
}