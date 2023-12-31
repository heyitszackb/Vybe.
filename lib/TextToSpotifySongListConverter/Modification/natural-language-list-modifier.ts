// Given a list of songs and artists, modify the list according to the prompt.

// Utils
import { PromptTemplate } from "langchain/prompts";
import { handleModelCall } from "@/lib/TextToSpotifySongListConverter/langchain-helpers";

// Types
import { VybeError, GPTVersion, GPT_VERSIONS, SongAndArtist } from "@/lib/TextToSpotifySongListConverter/types";

export default async function naturalLanguageListModifier(
    verifiedInitialPrompt: string,
    songsAndArtists: SongAndArtist[],
    userQuery: string,
    model: GPTVersion = GPT_VERSIONS.GPT3
    ): Promise<string | VybeError> {

    if  (songsAndArtists.length === 0) {
        return new VybeError("400","You cannot modify a list with no songs", userQuery);
    }

    let currentSongsAndArtists = "";
    for (const songAndArtist of songsAndArtists) {
        currentSongsAndArtists += `${songAndArtist.song_name} by ${songAndArtist.artists[0]}\n`;
    }

    const year = (model === GPT_VERSIONS.GPT3) ? "2021" : "2023";

    let input: string;

    const prompt = new PromptTemplate({
        template: `You are an AI in charge of listing songs to be added to a playlist that fits a vibe/mood/setting/location.

        You will be given the INITIAL PROMPT and an INITIAL SONG LIST, as well as a USER QUERY. You must generate a list of NEW songs that fit the USER QUERY, given the INITIAL PROMPT and INITIAL SONG LIST.

        The following songs were generated by an AI from the INITIAL PROMPT: [{verifiedInitialPrompt}]

        INITIAL SONG LIST: {currentSongsAndArtists}

        USER QUERY (with reference to the above songs): {userQuery}

        Please list 15-20 songs that relate to the INITIAL PROMPT, that follow the USER QUERY, and are also being different from the INITIAL SONG LIST.

        Please only list real songs that exist in spotify as of ${year}. \n
        Please only list the songs and the artists of your song reccomendations with no explanation.`,
        inputVariables: ["verifiedInitialPrompt","currentSongsAndArtists","userQuery"],
    });

    input = await prompt.format({
        verifiedInitialPrompt,
        currentSongsAndArtists,
        userQuery,
    });

    return handleModelCall(input, model);
}