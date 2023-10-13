"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import  Sidebar  from "@/components/sidebar"
import { useEffect, useState } from "react"
import { 
    Sheet, 
    SheetTrigger, 
    SheetContent } from "@/components/ui/sheet"

interface MobileSidebarProps {
    apiLimitCount: number;
}


const MobileSidebar = (
    { apiLimitCount = 0 }: MobileSidebarProps
) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null
    
    return(
        <Sheet>
            <SheetTrigger>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu size={32}/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;