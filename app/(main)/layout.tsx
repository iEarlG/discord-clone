
import NavigationSidebar from "@/components/navigation/NavigationSidebar";

const MainLayout = async ({ children }: {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="h-full">
            <div className="h-full w-[72px] md:flex flex-col fixed hidden z-30 inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    );
}
 
export default MainLayout;