// Components
import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "@/components/mobile-sidebar"


// Utils
import { getApiLimitCount } from "@/lib/api-limit"

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();

    return (
        <div className="flex items-center justify-between p-8">
            <MobileSidebar apiLimitCount={apiLimitCount}/>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Vybe</h1>
                <h2 className="italic">Create New</h2>
            </div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default Navbar;