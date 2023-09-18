
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/ui/toggleMode";
import { NavigationActions } from "@/components/navigation/NavigationActions";
import { NavigationItems } from "@/components/navigation/NavigationItems";

const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    }); 

    return ( 
        <div className="flex flex-col items-center h-full w-full space-y-4 text-primary dark:bg-[#1E1F22] py-3">
            <NavigationActions />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItems id={server.id} name={server.name} imageUrl={server.imageUrl} />
                    </div>
                ))}
            </ScrollArea>
            <div className="flex flex-col items-center gap-y-4 pb-3 mt-auto">
                <ModeToggle />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-[43px] w-[43px]"
                        }
                    }}
                />
            </div>
        </div>
    );
}
 
export default NavigationSidebar;