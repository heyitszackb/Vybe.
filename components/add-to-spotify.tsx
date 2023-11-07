import React, { useState } from 'react';
import { PlusCircle } from "lucide-react"

// Hooks
import { useCreatePage } from '@/app/(dashboard)/(routes)/create/CreatePageContext';

// Utils
import { createPlaylist } from '@/lib/create-playlist';

const AddToSpotify = () => {
    const {
        songs,
        sdk,
        currentQuery
    } = useCreatePage();

    const handlePlusCircleClick = () => {
        createPlaylist(sdk, songs.map((song) => song.uri), "Vybe Playlist 2", `A playlist created by Vybe from ${currentQuery}`, true);
    }

    return (
        <div 
            className={`max-w-[75%] cursor-pointer relative bg-green-500 hover:bg-green-400 text-white hover:shadow-md py-2 px-4 rounded-3xl inline-block transition duration-100 overflow-hidden`}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            onClick={handlePlusCircleClick} // Add onClick event here
        >
            <div className="flex items-center justify-between">
                <div className="mr-2">Add all to Spotify</div>
                <div className="w-6 h-6">
                    <PlusCircle />
                </div>
            </div>
        </div>
    )
}

export default AddToSpotify;