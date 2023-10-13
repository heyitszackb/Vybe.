import { z } from "zod";

export const Song = z.object({
  artist_name: z.string().min(1).describe("name of the artist"),
  song_name: z.string().min(1).describe("name of the song"),
});

export const SongList = z.object({
  songs: z.array(Song),
});

export const UserInput = z.object({
  is_valid_input: z.boolean().describe("True if acceptable, False if unacceptable"),
  reason: z.string().min(1).describe("short reason for decision"),
});

export const BooleanResponse = z.object({
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
