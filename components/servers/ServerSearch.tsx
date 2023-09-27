"use client";

import { Search } from "lucide-react";

interface ServerSearchProps {
    data: {
        label: string;
        type: "channel" | "member";
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
};

export const ServerSearch = ({
    data
}: ServerSearchProps) => {
    return (
        <>
            <button 
                className="flex items-center w-full group px-2 py-2 rounded-md gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
            >   
            <Search className="w-4 h-4 text-zinc-50 dark:text-zinc-400" />
                <p className="font-semibold text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Search
                </p>
                <kbd className="inline-flex items-center h-5 pointer-events-none select-none gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs">Ctrl</span>K
                </kbd>
            </button>
        </>
    )
};