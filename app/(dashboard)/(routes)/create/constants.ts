import * as z from "zod";

const VybeSong = z.object({
    name: z.string(),
    uri: z.string(),
    artists: z.array(z.string()),
    previewUrl: z.string(),
    albumName: z.string(),
    imageUrl: z.string(),
    isExplicit: z.boolean(),
    genres: z.array(z.string()),
    spotifyUrl: z.string(),
  });

export const initialFetchSchema = z.object({
    prompt: z.string().min(0, {
        message: "Prompt is required",
    }),
    currentSongs: z.array(VybeSong),
    amount: z.string().min(1),
    resolution: z.string().min(1),
})

export const amountOptions = [
    {
        value: "1",
        label: "1 Photo",
    },
    {
        value: "2",
        label: "2 Photo",
    },
    {
        value: "3",
        label: "3 Photo",
    },
    {
        value: "4",
        label: "4 Photo",
    },
    {
        value: "5",
        label: "5 Photo",
    }
]

export const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256",
    },
    {
        value: "512x512",
        label: "512x512",
    },
    {
        value: "1024x1024",
        label: "1024x1024",
    },
]