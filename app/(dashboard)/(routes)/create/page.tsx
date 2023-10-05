"use client"

import { MainInput } from "@/components/main-input";

const CreatePage = () => {
  return (
    <div>
      <div className="px-8">
        <MainInput />
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
      </div>
    </div>
      )
}

export default CreatePage;