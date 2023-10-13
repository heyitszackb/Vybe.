"use client"

import { CreatePageProvider } from './CreatePageContext';
import { MainInput } from "@/components/Create/MainInput/main-input";
import CreatePageContent from "./CreatePageContent";

const CreatePage = () => {
  return (
    <CreatePageProvider>
      <CreatePageContent />
    </CreatePageProvider>
      )
}

export default CreatePage;