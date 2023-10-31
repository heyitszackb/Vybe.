import React, { useState } from 'react';
import { Undo2 } from "lucide-react"

// Hooks
import { useCreatePage } from '@/app/(dashboard)/(routes)/create/CreatePageContext';

const SelectMoreBubble = () => {
    const {
        currentQuery,
        setIsError,
        setCurrentQuery,
        setSongs,
    } = useCreatePage();

    const handleUndoClick = async () => {
        setIsError(false);
        setCurrentQuery('');
        setSongs([]);
    }

    return (
        <div 
            className="relative ml-4 bg-gray-200 hover:bg-gray-300 hover:shadow-md py-2 px-4 my-8 rounded-3xl inline-block transition duration-100"
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

export default SelectMoreBubble;