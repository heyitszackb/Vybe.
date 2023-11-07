
// Utils
import { PromptTemplate } from "langchain/prompts";
import { handleModelCall } from "@/lib/TextToSpotifySongListConverter/langchain-helpers";

// Types
import { VybeError, GPTVersion, GPT_VERSIONS } from "@/lib/TextToSpotifySongListConverter/types";

export default async function initialSongListGenerator(expandedPrompt: string, model: GPTVersion = GPT_VERSIONS.GPT3): Promise<string | VybeError> {
    const year = (model === GPT_VERSIONS.GPT3) ? "2021" : "2023";
    const prompt = new PromptTemplate({
        template: `Answer the user query. You are in charge of listing songs to be added
        to a playlist that fits a vibe/mood/setting/location.
        Please list 15-20 songs (making sure to include the artist for every song) who's tonic qualities match the following vibe/mood/setting/location.
        please only list real songs that exist in spotify as of ${year}. \n
        Please only list the songs and the artists and no explanation.
        {expandedPrompt}\n`,
        inputVariables: ["expandedPrompt"],
        });

    const input: string = await prompt.format({
        expandedPrompt: expandedPrompt,
    });

    return handleModelCall(input, model);
}