import type { Songs, Song } from "@/app/types/types";
import { VybeError, SongAndArtist, VybeSong, SongsAndArtists } from "./types";
import naturalLanguageInputParser from "./NaturalLanguageInputParser/natural-language-input-parser";
import { initialSpotifyInfoFetcher } from "./SpotifyInfoFetcher/initial-spotify-info-fetcher";

export default async function textToSpotifySongListConverter(prompt: string): Promise<VybeSong[] | VybeError> {
  const data = await naturalLanguageInputParser(prompt);
  if (data instanceof VybeError) {
    console.log("HEY!",data);
  }
  console.log(data);

  // const data: SongsAndArtists = {
  //   songs: [
  //     {
  //       artist_name: "Frank Sinatra",
  //       song_name: "Fly Me to the Moon"
  //     },
  //     {
  //       artist_name: "The Dave Brubeck Quartet",
  //       song_name: "Take Five"
  //     },
  //     {
  //       artist_name: "Nina Simone",
  //       song_name: "Feeling Good"
  //     },
  //     {
  //       artist_name: "Stan Getz, João Gilberto, Astrud Gilberto",
  //       song_name: "The Girl from Ipanema"
  //     },
  //     {
  //       artist_name: "Chet Baker",
  //       song_name: "My Funny Valentine"
  //     },
  //     {
  //       artist_name: "Erroll Garner",
  //       song_name: "Misty"
  //     },
  //     {
  //       artist_name: "Nat King Cole",
  //       song_name: "Autumn Leaves"
  //     },
  //     {
  //       artist_name: "Miles Davis",
  //       song_name: "Blue in Green"
  //     },
  //     {
  //       artist_name: "Ella Fitzgerald, Louis Armstrong",
  //       song_name: "Summertime"
  //     },
  //     {
  //       artist_name: "Glenn Miller",
  //       song_name: "Moonlight Serenade"
  //     },
  //     {
  //       artist_name: "Thelonious Monk",
  //       song_name: "Round Midnight"
  //     },
  //     {
  //       artist_name: "Duke Ellington",
  //       song_name: "Take the 'A' Train"
  //     },
  //     {
  //       artist_name: "Herbie Hancock",
  //       song_name: "Cantaloupe Island"
  //     },
  //     {
  //       artist_name: "Duke Ellington, John Coltrane",
  //       song_name: "Satin Doll"
  //     },
  //     {
  //       artist_name: "Tony Bennett",
  //       song_name: "The Way You Look Tonight"
  //     }
  //   ]
  // };

  const songs = await initialSpotifyInfoFetcher(data as SongsAndArtists);
  if (songs instanceof VybeError) {
    console.log("HEY!",songs);
  }
  console.log(songs);




    // const songs: Songs  = [
    //     {
    //       artist: ["TobyMac"],
    //       song: "Help Is On The Way (Maybe Midnight)",
    //       preview_url: null,
    //       image: "https://i.scdn.co/image/ab67616d0000b273914938e4985b4bdbd7b9fefc",
    //     },
    //     {
    //       artist: ["TobyMac"],
    //       song: "Speak Life",
    //       preview_url: null,
    //       image: "https://i.scdn.co/image/ab67616d0000b27365829d58a159958643aa33c0",
    //     },
    //     {
    //       artist: ["TobyMac"],
    //       song: "I just need U.",
    //       preview_url: null,
    //       image: "https://i.scdn.co/image/ab67616d0000b273d844bf8d20303a5e82d1956d",
    //     },
    //     {
    //       artist: ["Rachael Lampa", "TobyMac"],
    //       song: "Perfectly Loved",
    //       preview_url: "https://p.scdn.co/mp3-preview/ade9ed2487f12933190a6309ba452b2acb5f7acc?cid=a5278cb9364849caa77fcbc7a01b8c92",
    //       image: "https://i.scdn.co/image/ab67616d0000b273ff0477477a3ebce38daeee8a",
    //     },
    //     {
    //       artist: ["Jordan Feliz", "Terrian", "TobyMac"],
    //       song: "Glorify (feat. Toby Mac & Terrian)",
    //       preview_url: "https://p.scdn.co/mp3-preview/59ddc0bc7564d7e1724c48aa7042e426d0e6ca9a?cid=a5278cb9364849caa77fcbc7a01b8c92",
    //       image: "https://i.scdn.co/image/ab67616d0000b2731f7f2bc8d544a19e9b30e3aa",
    //     }
    //   ];
    return songs;
}