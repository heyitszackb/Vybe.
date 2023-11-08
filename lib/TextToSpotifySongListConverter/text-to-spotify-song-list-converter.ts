
// Types
import { VybeError, VybeSong, SongsAndArtists, GPTVersion, GPT_VERSIONS, SongAndArtist } from "./types";

// Utils
import naturalLanguageInputParser from "./NaturalLanguageInputParser/natural-language-input-parser";
import { initialSpotifyInfoFetcher } from "./SpotifyInfoFetcher/initial-spotify-info-fetcher";

export default async function textToSpotifySongListConverter(
  prompt: string,
  model: GPTVersion = GPT_VERSIONS.GPT3,
  currentSongsAndArtists: SongAndArtist[] = [],
  userQuery: string = "",
  ): Promise<VybeSong[] | VybeError> {

  let data: SongsAndArtists | VybeError;
  
  data = await naturalLanguageInputParser(prompt, currentSongsAndArtists, userQuery, model);
  if (data instanceof VybeError) {
    console.log(data);
  }
  console.log(data);

  const songs = await initialSpotifyInfoFetcher(data as SongsAndArtists);
  if (songs instanceof VybeError) {
    console.log(songs);
  }
  console.log(songs);

  return songs;
}