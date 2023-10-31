import { z } from "zod";

export const SongSchema = z.object({
  artists: z.array(z.string().min(1)).nonempty().describe("list of artists"),
  song_name: z.string().min(1).describe("name of the song"),
});

export const SongsSchema = z.object({
  songs: z.array(SongSchema),
});

export const UserInputSchema = z.object({
  is_valid_input: z.boolean().describe("True if acceptable, False if unacceptable"),
  reason: z.string().min(1).describe("short reason for decision"),
});

export const BooleanResponseSchema = z.object({
  is_valid_input: z.boolean().describe(
    "True if the general sentiment of the USER_RESPONSE is Yes, False if No"
  ),
});


interface VybeError {
  errorCode: string; 
  reason: string; // short reason for error (for the developer)
  input: string; // the input that caused the error
}

class VybeError {
    constructor(errorCode: string, reason: string, input: string) {
      this.errorCode = errorCode;
      this.reason = reason;
      this.input = input;
    }
}

export { VybeError };

export type SongAndArtist = {
  artists: string[];
  song_name: string;
};

export type SongsAndArtists = {
  songs: SongAndArtist[];
};

interface VybeSong {
  name: string;
  uri: string;
  artists: string[];
  previewUrl: string;
  albumName: string;
  imageUrl: string;
  isExplicit: boolean;
  genres: string[];
  spotifyUrl: string;
};

// export type VybeSong = {
//   name: string;
//   uri: string;
//   artists: string[];
//   previewUrl: string | null;
//   albumName: string;
//   imageUrl: string;
//   isExplicit: boolean;
//   genres: string[];
//   spotifyUrl: string;
// };

export type VybeSongs = {
  songs: VybeSong[];
};

class VybeSong {
  name: string;
  uri: string;
  artists: string[];
  previewUrl: string;
  albumName: string;
  imageUrl: string;
  isExplicit: boolean;
  genres: string[];
  spotifyUrl: string;

  constructor(
      name: string,
      uri: string,
      artists: string[],
      previewUrl: string,
      albumName: string,
      imageUrl: string,
      isExplicit: boolean,
      genres: string[],
      spotifyUrl: string
  ) {
      this.name = name;
      this.uri = uri;
      this.artists = artists;
      this.previewUrl = previewUrl;
      this.albumName = albumName;
      this.imageUrl = imageUrl;
      this.isExplicit = isExplicit;
      this.genres = genres;
      this.spotifyUrl = spotifyUrl;
  }
}

export { VybeSong };