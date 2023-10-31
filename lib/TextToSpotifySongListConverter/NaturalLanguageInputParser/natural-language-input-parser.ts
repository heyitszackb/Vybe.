
// Types
import { VybeError, SongAndArtist, SongsAndArtists } from "../types";

// Utils
import initialSongListGenerator from "./initial-song-list-generator";
import unstructuredSongParser from "./unstructured-song-parser";
import userPromptVerifier from "./user-prompt-verifier";
import promptExpander from "@/lib/TextToSpotifySongListConverter/NaturalLanguageInputParser/PromptExpander/prompt-expander";

// Constants
import { USE_DUMMY_DATA } from "@/constants";
import { dummySongsAndArtists } from "@/lib/TextToSpotifySongListConverter/spotify-helpers";

export default async function naturalLanguageInputParser(userInput: string): Promise<SongsAndArtists | VybeError> {
    if (USE_DUMMY_DATA) {
        return dummySongsAndArtists
    }

    const verifiedUserPrompt = await userPromptVerifier(userInput);
    if (verifiedUserPrompt instanceof VybeError) {
        return verifiedUserPrompt;
    }
    const expandedPrompt = await promptExpander(verifiedUserPrompt);
    if (expandedPrompt instanceof VybeError) {
        return expandedPrompt;
    }

    const unstructuredSongList = await initialSongListGenerator(expandedPrompt);
    if (unstructuredSongList instanceof VybeError) {
        return unstructuredSongList;
    }

    const structuredSongList = await unstructuredSongParser(unstructuredSongList);
    if (structuredSongList instanceof VybeError) {
        return structuredSongList;
    }

    return structuredSongList as SongsAndArtists;
}