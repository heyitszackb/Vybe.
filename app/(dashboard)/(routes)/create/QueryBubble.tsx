import React, { useState } from 'react';
import { Undo2 } from "lucide-react"
import './QueryBubble.css';

// Hooks
import { useCreatePage } from './CreatePageContext';

const QueryBubble = () => {
    const {
        currentQuery,
        setIsError,
        setCurrentQuery,
        setSongs,
        setSelectedSongs,
    } = useCreatePage();

    const handleUndoClick = async () => {
        setIsError(false);
        setCurrentQuery('');
        setSongs([]);
        setSelectedSongs([]);
    }

    return (
        <div 
            className="relative bg-gray-200 hover:bg-gray-300 hover:shadow-md py-2 px-4 my-8 rounded-3xl inline-block transition duration-100"
        >
            <div className={"flex items-center"}>
                <div className="mr-2">{currentQuery}</div>
                <div className="w-6 h-6">
                    <Undo2 className="cursor-pointer" onClick={() => handleUndoClick()}/>
                </div>
            </div>
        </div>
    )
}

export default QueryBubble;