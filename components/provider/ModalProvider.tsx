"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/CreateServerModal";
import { CreateInviteModal } from "@/components/modals/CreateInviteModal";
import { EditServerModal } from "@/components/modals/EditServerModal";
import { ManageMembersModal } from "@/components/modals/ManageMembersModal";
import { CreateChannelModal } from "@/components/modals/CreateChannelModal";
import { LeaveServerModal } from "@/components/modals/LeaveServerModal";

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
            <ManageMembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
        </>
    );
}