"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/ActionToolTip";

export const NavigationActions = () => {
    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a server">
                <button className="flex items-center group">
                    <div className="flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all 
                    overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <Plus className="group-hover:text-white transition text-emerald-500" size={25} />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
}