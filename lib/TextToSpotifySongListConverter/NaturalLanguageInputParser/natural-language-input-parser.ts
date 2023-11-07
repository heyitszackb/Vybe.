
// Types
import { VybeError, SongAndArtist, SongsAndArtists, GPTVersion, GPT_VERSIONS } from "../types";

// Utils
import initialSongListGenerator from "./initial-song-list-generator";
import unstructuredSongParser from "./unstructured-song-parser";
import userPromptVerifier from "./user-prompt-verifier";
import promptExpander from "@/lib/TextToSpotifySongListConverter/NaturalLanguageInputParser/PromptExpander/prompt-expander";
import songListModifier from "./song-list-modifier";

// Constants
import { dummySongsAndArtists } from "@/lib/TextToSpotifySongListConverter/spotify-helpers";

export default async function naturalLanguageInputParser(userInput: string, model: GPTVersion): Promise<SongsAndArtists | VybeError> {
    if (model === GPT_VERSIONS.DUMMY) {
        return dummySongsAndArtists
    }

    const verifiedUserPrompt = await userPromptVerifier(userInput, model);
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

    const modifiedUnstructuredSongList = await songListModifier(unstructuredSongList, verifiedUserPrompt, model);
    if (modifiedUnstructuredSongList instanceof VybeError) {
        return modifiedUnstructuredSongList;
    }

    const structuredSongList = await unstructuredSongParser(modifiedUnstructuredSongList);
    if (structuredSongList instanceof VybeError) {
        return structuredSongList;
    }

    return structuredSongList as SongsAndArtists;
}