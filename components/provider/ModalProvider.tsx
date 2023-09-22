"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/CreateServerModal";
import { CreateInviteModal } from "@/components/modals/CreateInviteModal";

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
        </>
    );
}