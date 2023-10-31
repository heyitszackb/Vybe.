"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useProModal } from "@/hooks/use-pro-modal";
import { useCreatePage } from "./CreatePageContext";

// Components
import CreateForm from "./CreateForm";
import CreateItems from "./CreateItems";
import QueryBubble from "./QueryBubble";

// Utils and Constants
import { initialFetchSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const CreatePageContent = () => {
  const {
    songs,
    currentQuery,
    selectedSongs,
    setCurrentQuery,
    setSongs,
    setIsError,
    setIsLoading,
    setSelectedSongs,
  } = useCreatePage();

  const proModal = useProModal();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(initialFetchSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

interface FormValues {
    prompt: string;
    amount: string;
    resolution: string;
}

const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      setCurrentQuery('');
      setIsError(false);
      setSongs([]);
      setCurrentQuery(values.prompt);
      const response = await axios.post("/api/create", values);

      setSongs(response.data);

      form.reset();
    } catch (error: any) {
      setIsError(true)
      if (error?.response?.status === 403) { // TODO change to more specific error
        proModal.onOpen();
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const onSubmitModify = async (values: FormValues) => {
    try {
      setSelectedSongs([]);
      setIsLoading(true);
      setCurrentQuery('');
      setIsError(false);
      setSongs([]);
      setCurrentQuery(`More like ${selectedSongs.map((song) => `${song.name} by ${song.artists[0]}`).join(", ")}`);
      const response = await axios.post("/api/modify", {
        uris: selectedSongs.map((song) => song.uri.split(':').pop()!),
      });

      setSongs(response.data);

      form.reset();
    } catch (error: any) {
      console.log(error)
      setIsError(true)
      if (error?.response?.status === 403) { // TODO change to more specific error
        proModal.onOpen();
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };



  return (
    <div>
      <div className="px-4 lg:px-8">
        <div>
          <CreateForm
            form={form}
            onSubmit={selectedSongs.length > 0 ? onSubmitModify : onSubmit}
          />
        </div>
        {currentQuery && <QueryBubble />}
        {/* {currentQuery && <SelectMoreBubble />} */}
        <div>{selectedSongs.length}</div>
        {songs && <CreateItems />}
      </div>
    </div>
  );
};

export default CreatePageContent;