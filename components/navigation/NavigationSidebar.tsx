
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";

import { NavigationActions } from "@/components/navigation/NavigationActions";

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
        </div>
    );
}
 
export default NavigationSidebar;