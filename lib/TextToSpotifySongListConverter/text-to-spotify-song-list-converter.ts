import type { Songs, Song } from "@/app/types/types";
import { VybeError } from "./types";
import naturalLanguageInputParser from "./NaturalLanguageInputParser/natural-language-input-parser";

export default async function textToSpotifySongListConverter(prompt: string) {
  const data = await naturalLanguageInputParser(prompt);
  if (data instanceof VybeError) {
    console.log("HEY!",data);
  }
  console.log(data);

    const songs: Songs  = [
        {
          artist: ["TobyMac"],
          song: "Help Is On The Way (Maybe Midnight)",
          preview_url: null,
          image: "https://i.scdn.co/image/ab67616d0000b273914938e4985b4bdbd7b9fefc",
        },
        {
          artist: ["TobyMac"],
          song: "Speak Life",
          preview_url: null,
          image: "https://i.scdn.co/image/ab67616d0000b27365829d58a159958643aa33c0",
        },
        {
          artist: ["TobyMac"],
          song: "I just need U.",
          preview_url: null,
          image: "https://i.scdn.co/image/ab67616d0000b273d844bf8d20303a5e82d1956d",
        },
        {
          artist: ["Rachael Lampa", "TobyMac"],
          song: "Perfectly Loved",
          preview_url: "https://p.scdn.co/mp3-preview/ade9ed2487f12933190a6309ba452b2acb5f7acc?cid=a5278cb9364849caa77fcbc7a01b8c92",
          image: "https://i.scdn.co/image/ab67616d0000b273ff0477477a3ebce38daeee8a",
        },
        {
          artist: ["Jordan Feliz", "Terrian", "TobyMac"],
          song: "Glorify (feat. Toby Mac & Terrian)",
          preview_url: "https://p.scdn.co/mp3-preview/59ddc0bc7564d7e1724c48aa7042e426d0e6ca9a?cid=a5278cb9364849caa77fcbc7a01b8c92",
          image: "https://i.scdn.co/image/ab67616d0000b2731f7f2bc8d544a19e9b30e3aa",
        }
      ];
    return songs;
}