
// Components
import { Song } from "@/components/song";
import FadeIn from "react-fade-in";
import { ScrollArea } from "@/components/ui/scroll-area";

// Hooks
import { useState } from "react";
import { useCreatePage } from "@/app/(dashboard)/(routes)/create/CreatePageContext";

// Types
import { VybeSong } from "@/lib/TextToSpotifySongListConverter/types";

interface SongGridProps {
    songs: VybeSong[];
  }

export const SongGrid = ({ songs }: SongGridProps) => {
    const {
        selectedSongs,
        setSelectedSongs,
    } = useCreatePage();

    const handleSongSelect = (selectedSong: VybeSong) => {
      if (selectedSongs.includes(selectedSong)) {
        setSelectedSongs(selectedSongs.filter(song => song !== selectedSong));
      } else {
        if (selectedSongs.length < 5) {
          setSelectedSongs([...selectedSongs, selectedSong]);
        }
      }
    };


    return (
        <div>
          <ScrollArea className="h-[500px] rounded-md">
            <FadeIn delay={100} transitionDuration={600} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {songs.map((song, i) => (
                      <Song
                          song={song}
                          index={i}
                          isSelected={selectedSongs.includes(song)}
                          onSelect={handleSongSelect}
                          />
                  ))}
              </FadeIn>
          </ScrollArea>
        </div>
    )
}