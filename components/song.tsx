// Types
import { VybeSong } from "@/lib/TextToSpotifySongListConverter/types";

// Components
import Image from "next/image";

// Hooks
import { useRef } from "react";

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
        <div 
        className="mb-4"
        onClick={handleClick}>
            <div 
            key={index} 
            className={`mb-4 relative overflow-hidden rounded-lg 
            ${isSelected ? 'border-4 border-purple-500' : ''} 
            transition-all duration-100`}
            onMouseEnter={() => handlePlayPreview(song.previewUrl)}
            onMouseLeave={handleStopPreview}>
                <div className="relative aspect-square">
                    <Image
                    alt={song.name}
                    fill
                    src={song.imageUrl}
                    className={"h-auto w-auto object-cover transition-all hover:scale-105"}
                    />
                </div>
            </div>
            <div className="mt-2"></div>
            <h3 className="font-medium truncate leading-none">
                {song.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate mt-1">
                {song.artists.join(", ")}
            </p>
        </div>
    )
}