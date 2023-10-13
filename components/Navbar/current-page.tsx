"use client";

// Components
import { usePathname } from "next/navigation"

// Constants
import { NAVBAR_PAGE_NAMES } from "@/components/Navbar/constants";

const CurrentPage = () => {
    const pathname: string = usePathname();
    const currentPageName: string | undefined = NAVBAR_PAGE_NAMES[pathname];

    return (
        <div>
            <h2 className="italic">{currentPageName}</h2>
        </div>
    )
}

export default CurrentPage;