import { initialProfile } from "@/lib/InitialProfile";

const SightPage = async () => {
    const profile = await initialProfile();
    
    return ( 
        <div>Create server: </div>
    );
}
 
export default SightPage;