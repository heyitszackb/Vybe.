import { VybeSong } from '@/lib/TextToSpotifySongListConverter/types';

// Types
import React, { createContext, useContext, useState } from 'react';

// Utils
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

type CreatePageContextType = {
  currentPage: number;
  loggedInUser: number | null;
  isLoading: boolean;
  currentQuery: string;
  isError: boolean;
  songs: VybeSong[];
  selectedSongs: VybeSong[];
  sdk: SpotifyApi;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setLoggedInUser: React.Dispatch<React.SetStateAction<number | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentQuery: React.Dispatch<React.SetStateAction<string>>;
  setSongs: React.Dispatch<React.SetStateAction<VybeSong[]>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSongs: React.Dispatch<React.SetStateAction<VybeSong[]>>;
};

const CreatePageContext = createContext<CreatePageContextType | undefined>(undefined);

export const CreatePageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [songs, setSongs] = useState<VybeSong[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedSongs, setSelectedSongs] = useState<VybeSong[]>([]);
  const sdk = SpotifyApi.withUserAuthorization("f00473afeb904a4aacb6cd9330966b0c", "http://localhost:3000/create",["user-read-private","user-read-email","playlist-modify-public","playlist-modify-private","user-read-playback-state"]);
  
  return (
    <CreatePageContext.Provider value={{
      currentPage,
      loggedInUser,
      isLoading,
      currentQuery,
      songs,
      isError,
      selectedSongs,
      sdk,
      setCurrentPage,
      setLoggedInUser,
      setIsLoading,
      setCurrentQuery,
      setSongs,
      setIsError,
      setSelectedSongs,
      }}>
      {children}
    </CreatePageContext.Provider>
  );
};

export const useCreatePage = () => {
  const context = useContext(CreatePageContext);
  if (context === undefined) {
    throw new Error('useCreatePage must be used within an CreatePageProvider');
  }
  return context;
};