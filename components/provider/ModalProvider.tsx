"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/CreateServerModal";
import { CreateInviteModal } from "@/components/modals/CreateInviteModal";
import { EditServerModal } from "@/components/modals/EditServerModal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    
    return (
        <>
            <CreateServerModal />
            <CreateInviteModal />
            <EditServerModal />
        </>
    );
}