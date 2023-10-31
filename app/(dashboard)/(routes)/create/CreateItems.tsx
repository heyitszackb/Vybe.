"use client";

// Components
import { Card, CardFooter } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { PromptError } from "@/components/prompt-error";
import { SongGrid } from "@/components/song-grid";

// Types
import { Songs, Song } from "@/app/types/types";
import { VybeSong } from "@/lib/TextToSpotifySongListConverter/types";

// Hooks
import { useCreatePage } from "./CreatePageContext";


const CreateItems = () => {
    const {
        songs,
        isLoading,
        isError,
    } = useCreatePage();

    return (
        <div className="space-y-4"> 
        {isError && <PromptError imageUrl="/promptError.png" label="Hey, we don't feel comfortable creating a playlist from that prompt. Go ahead and try something else!"/>}
        {isLoading && (
            <div className="p-20">
            <Loader />
            </div>
        )}
        {songs.length === 0 && !isLoading && !isError && <Empty label="Enter a vybe above to get started!" />}
        <SongGrid songs={songs} />
    </div>
  );
};

export default CreateItems;