"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useProModal } from "@/hooks/use-pro-modal";

// Components
import CreateForm from "./CreateForm";
import CreateItems from "./CreateItems";

// Utils and Constants
import { formSchema, amountOptions, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


// Types
import { Songs, Song } from "@/app/types/types"; 

const CreatePageContent = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [songs, setSongs] = useState<Songs>([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  const formErrors = form.formState.errors;

  const isLoading = form.formState.isSubmitting;

interface FormValues {
    prompt: string;
    amount: string;
    resolution: string;
}

const onSubmit = async (values: FormValues) => {
    try {
      setSongs([]);
      const response = await axios.post("/api/create", values);

      setSongs(response.data);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      {/* ... Other components (Heading, etc.) */}
      <div className="px-4 lg:px-8">
        <div>
          <CreateForm
            form={form}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </div>
        {songs && <CreateItems songs={songs} isLoading={isLoading} />}
      </div>
    </div>
  );
};

export default CreatePageContent;