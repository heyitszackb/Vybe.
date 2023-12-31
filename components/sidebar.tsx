"use client";
import React, { CSSProperties } from 'react';

// Components
import { FreeCounter } from "@/components/free-counter";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
    LayoutDashboard,
    MessageSquare,
    ImageIcon,
    VideoIcon,
    Settings,
    Music,
    Code,
    PlusSquare,
} from "lucide-react";

// Hooks
import { usePathname } from "next/navigation"

// Utils
import { cn } from "@/lib/utils";

const montserrat = Montserrat({weight: "600", subsets: ["latin"]})

const routes = [
    {
    label: "Create",
    icon: PlusSquare,
    href: "/create",
    color: "text-sky-500",
    },
    {
    label: "My Vybes.",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    },
    {
    label: "Explore",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    },
    {
    label: "Friends",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    },
    {
    label: "-------",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    },
    {
    label: "-------",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    },
    {
    label: "-------",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    },
    {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    },
]

interface SidebarProps {
    apiLimitCount: number;
}

const Sidebar = ({
    apiLimitCount = 0,
}: SidebarProps) => {
    const headingStyles: CSSProperties = {
        background: 'linear-gradient(to right, #CEAFEB 4%, #EFDFB4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="logo" src="/logo.png"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)} style={headingStyles}>
                        Vybe.
                        </h1> 
                </Link>
                <div className="space-y-1">
                    {routes.map((route, i) => (
                        <Link 
                            href={route.href}
                            key={i}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.href ? "text-white bg-white/10 " : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter 
                apiLimitCount={apiLimitCount}
            />
        </div>
    )
}

export default Sidebar;