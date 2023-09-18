"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/ActionTooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItems = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const onServer = () => {
        router.push(`/servers/${id}`);
    }

    return ( 
       <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={onServer}
                className="group relative flex items-center"
            >
                <div className={cn("absolute w-[4px] left-0 bg-primary rounded-r-full transition-all",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-[36px]" : "h-[8px]"
                )} />

                <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group:hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]",
                )}>
                    <Image 
                        alt="Channel Image"
                        src={imageUrl}
                        fill
                    />
                </div>
            </button>
       </ActionTooltip>
    );
}