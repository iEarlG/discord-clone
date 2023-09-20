"use client";

import { Plus } from "lucide-react";

import { useModalStore } from "@/hooks/useModalStore";

import { ActionTooltip } from "@/components/ActionTooltip";

export const NavigationActions = () => {
    const { onOpen } = useModalStore();
    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a Server">
                <button className="flex items-center group" onClick={() => onOpen("createServer")}>
                    <div className="flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all 
                    overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <Plus className="group-hover:text-white transition text-emerald-500" size={25} />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
}