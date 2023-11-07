
// Utils
import { PromptTemplate } from "langchain/prompts";
import { handleModelCall } from "@/lib/TextToSpotifySongListConverter/langchain-helpers";

// Types
import { GPTVersion, GPT_VERSIONS, VybeError } from "@/lib/TextToSpotifySongListConverter/types";


export default async function songListModifier(initialSongList: string, verifiedInitialPrompt: string, model: GPTVersion): Promise<string | VybeError> {
    const year: string = (model === GPT_VERSIONS.GPT3) ? "2021" : "2023";
    
    const prompt = new PromptTemplate({
        template: `Here are a few songs that are not quite what I am looking for: {initialSongList}

        As opposed to the songs above, can you please recommend 20 songs available on spotify as of ${year} that I could listen to that more accurately follow this mood/vibe/setting/location: {verifiedInitialPrompt}? 
        `,
        inputVariables: ["initialSongList","verifiedInitialPrompt"],
        });

    const input: string = await prompt.format({
        initialSongList: initialSongList,
        verifiedInitialPrompt: verifiedInitialPrompt,

    });

    return handleModelCall(input, model);
}