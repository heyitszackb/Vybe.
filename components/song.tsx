// Types
import { VybeSong } from "@/lib/TextToSpotifySongListConverter/types";

// Components
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { SquareAsterisk } from "lucide-react";
import { SkeletonSong } from "./skeleton-song";

// Hooks
import { useRef, useState } from "react";
import { useCreatePage } from "@/app/(dashboard)/(routes)/create/CreatePageContext";

// Utils
import { trimString } from "@/lib/utils";

interface SongProps {
    song: VybeSong;
    index: number;
    isSelected?: boolean;
    onSelect: (song: VybeSong) => void;
}


export const Song = ({
    song,
    index,
    isSelected,
    onSelect,
}: SongProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleClick = () => {
        onSelect(song);
    };

    const audioRef = useRef<HTMLAudioElement | null>(null); // Create a ref for the audio element

    const handlePlayPreview = (previewUrl: string) => {
        if (audioRef.current) {
            audioRef.current.pause(); // Pause any currently playing audio
            audioRef.current = null; // Reset the current audio element
        }
        audioRef.current = new Audio(previewUrl);
        audioRef.current.play();
    }

    const handleStopPreview = () => {
        if (audioRef.current) {
            audioRef.current.pause(); // Pause the audio when hovering out
        }
    }

    return (
        <>
             <div 
            //  className={`mb-4 ${isImageLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-100}`}
            className={`mb-4`}
             onClick={handleClick}
             >
                 <div 
                 key={index} 
                 className={`mb-4 relative overflow-hidden rounded-lg 
                 ${isSelected ? 'border-4 border-primary' : ''} 
                 transition-all duration-100`}
                 onMouseEnter={() => handlePlayPreview(song.previewUrl)}
                 onMouseLeave={handleStopPreview}>
                     <div className="relative aspect-square">
                        <Skeleton className="h-full w-full" />
                        <div className={`${isImageLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-1000` } >
                            <Image
                            alt={song.name}
                            fill
                            src={song.imageUrl}
                            className={`h-auto w-auto object-cover transition-all hover:scale-105 `}
                            onLoad={() => {
                                setIsImageLoaded(true);
                            }}
                            />
                        </div>
                     </div>
                 </div>
                 <div className="mt-2"></div>
                 <h3 className="font-medium truncate leading-none">
                     {song.name}
                 </h3>
                 <p className="flex items-center text-xs text-muted-foreground truncate leading-none mt-1">
                     {song.isExplicit ? <SquareAsterisk size={14} className="inline-block" /> : null}
                     {trimString(song.artists.join(", "), 18)}
                 </p>
             </div>
        </>

    )
}