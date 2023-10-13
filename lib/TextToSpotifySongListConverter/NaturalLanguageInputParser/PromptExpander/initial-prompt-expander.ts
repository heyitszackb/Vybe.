import { model } from "@/lib/TextToSpotifySongListConverter/globals";
import { PromptTemplate } from "langchain/prompts";
import { VybeError } from "../../types";
import handleModelCall from "@/lib/TextToSpotifySongListConverter/langchain-helpers";


export default async function initialPromptExpander(verifiedInitialPrompt: string): Promise<string | VybeError> {
    const instructions = "I want you to please describe how songs with the following " +
    "vibe/mood/setting/location would tonically sound in 1 paragraph:\n";

    const prompt = new PromptTemplate({
        template: "Answer the user query. {instructions}\n *{verifiedInitialPrompt}* ",
        inputVariables: ["instructions", "verifiedInitialPrompt"],
        });

    const input: string = await prompt.format({
        instructions: instructions,
        verifiedInitialPrompt: verifiedInitialPrompt,
    });

    return handleModelCall(input);
}