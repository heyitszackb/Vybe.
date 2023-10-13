import { VybeError, SongsAndArtists } from "../types";
import initialSongListGenerator from "./initial-song-list-generator";
import unstructuredSongParser from "./unstructured-song-parser";
import userPromptVerifier from "./user-prompt-verifier";
import promptExpander from "@/lib/TextToSpotifySongListConverter/NaturalLanguageInputParser/PromptExpander/prompt-expander";

export default async function naturalLanguageInputParser(userInput: string): Promise<SongsAndArtists | VybeError> {
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

    return structuredSongList;
}