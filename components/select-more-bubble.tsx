import React, { useState } from 'react';
import { Search } from "lucide-react"

// Hooks
import { useCreatePage } from '@/app/(dashboard)/(routes)/create/CreatePageContext';

const SelectMoreBubble = () => {
    const {
        selectedSongs,
        setIsError,
        setCurrentQuery,
        setSongs,
    } = useCreatePage();

    if (selectedSongs.length === 0) {
        return null; // Don't render anything if there are no selected songs
    }

    return (
        <div 
        className={`max-w-[75%] cursor-pointer relative bg-primary hover:bg-primary/80 text-primary-foreground hover:shadow-md py-2 px-4 rounded-3xl inline-block transition duration-100 overflow-hidden`}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
        {/* <div className={`inline-block cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 relative hover:shadow-md py-2 px-4 rounded-3xl items-center transition duration-100 ${selectedSongs.length > 0 ? 'opacity-100 block' : 'opacity-0 hidden'}`}> */}
            <div className="flex items-center justify-between">
                <div className="mr-2">More Like Selected</div>
                <div className="w-6 h-6">
                    <Search onClick={() => handleUndoClick()} />
                </div>
            </div>
        </div>
    )
}

export default SelectMoreBubble;