import React, { createContext, useContext, useState } from 'react';

type CreatePageContextType = {
  currentPage: number;
  loggedInUser: number | null;
  isLoading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setLoggedInUser: React.Dispatch<React.SetStateAction<number | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePageContext = createContext<CreatePageContextType | undefined>(undefined);

export const CreatePageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loggedInUser, setLoggedInUser] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <CreatePageContext.Provider value={{ currentPage, loggedInUser, isLoading, setCurrentPage, setLoggedInUser, setIsLoading }}>
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