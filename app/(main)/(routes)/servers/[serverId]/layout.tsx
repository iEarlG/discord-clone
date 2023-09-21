
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";

import { ServerSidebar } from "@/components/servers/ServerSidebar";

const ServerIDLayout = async ({ children, params, }: 
    { 
        children: React.ReactNode,
        params: { serverId: string }
    }) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn;
    };

    const server = db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (!server) {
        return redirect("/");
    }

    return ( 
        <div className="h-full">
            <div className="h-full w-60 md:flex flex-col fixed hidden z-20 inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    );
}
 
export default ServerIDLayout;