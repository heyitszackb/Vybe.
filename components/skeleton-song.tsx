// Types
import { VybeSong } from "@/lib/TextToSpotifySongListConverter/types";

// Components
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { SquareAsterisk } from "lucide-react";

// Hooks
import { useRef, useState } from "react";
import { useCreatePage } from "@/app/(dashboard)/(routes)/create/CreatePageContext";

// Utils
import { trimString } from "@/lib/utils";



export const SkeletonSong = () => {

    return (
        <div 
        className={`mb-4 transition-all duration-100}`}
        >
            <div 
            className={`mb-4 relative overflow-hidden rounded-lg 
            transition-all duration-100`}>
                <div className=" relative aspect-square">
                    <Skeleton className="h-full w-full" />
                </div>
            </div>
            <div className="mt-2"></div>
            <h3 className="font-medium truncate leading-none">
                <Skeleton className="h-4 w-full" />
            </h3>
            <p className="flex items-center text-xs text-muted-foreground truncate leading-none mt-1">
                <Skeleton className="h-4 w-3/4" />
            </p>
        </div>
    )
}