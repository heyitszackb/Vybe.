"use client";

// Components
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

// Types
import { Songs, Song } from "@/app/types/types";
import { VybeSong } from "@/lib/TextToSpotifySongListConverter/types";

interface CreateItemsProps {
    songs: VybeSong[];
    isLoading: boolean;
  }


const CreateItems: React.FC<CreateItemsProps> = ({ songs, isLoading }) => {
    return (
        <div className="space-y-4 mt-4">
        {isLoading && (
            <div className="p-20">
            <Loader />
            </div>
        )}
        {songs.length === 0 && !isLoading && <Empty label="No songs found." />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {songs.map((song, i) => (
            <Card key={i} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                <Image alt="Image" fill src={song.imageUrl} />
                </div>
                <CardFooter className="p-2">
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => { if (song.previewUrl) window.open(song.previewUrl)}}
                >
                    <Download className="h-4 w-4 mr-2" />
                    {song.name + " by " + song.artists[0]}
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
    </div>
  );
};

export default CreateItems;