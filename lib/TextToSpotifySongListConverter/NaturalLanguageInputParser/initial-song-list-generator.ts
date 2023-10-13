import { model } from "@/lib/TextToSpotifySongListConverter/globals";
import { PromptTemplate } from "langchain/prompts";
import { VybeError } from "@/lib/TextToSpotifySongListConverter/types";
import { handleModelCall } from "@/lib/TextToSpotifySongListConverter/langchain-helpers";


export default async function initialSongListGenerator(expandedPrompt: string): Promise<string | VybeError> {
    const prompt = new PromptTemplate({
        template: `Answer the user query. You are in charge of listing songs to be added
        to a playlist that fits a vibe/mood/setting/location.
        Please list 15-20 songs (making sure to include the artist for every song) who's tonic qualities match the following vibe/mood/setting/location.
        please only list real songs that exist in spotify as of 2021. \n
        {expandedPrompt}\n`,
        inputVariables: ["expandedPrompt"],
        });

    const input: string = await prompt.format({
        expandedPrompt: expandedPrompt,
    });

    return handleModelCall(input);
}