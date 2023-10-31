import { model } from "@/lib/TextToSpotifySongListConverter/globals";
import { PromptTemplate } from "langchain/prompts";
import { VybeError } from "../../types";
import { handleModelCall } from "@/lib/TextToSpotifySongListConverter/langchain-helpers";
import { StructuredOutputParser } from "langchain/output_parsers";
import { BooleanResponseSchema } from "@/lib/TextToSpotifySongListConverter/types";


export default async function expandedPromptVerifier(expandedPrompt: string): Promise<string | VybeError> {
    const template = `Does the following text between the dashes describe the tonic qualities or the mood/vibe of a song?
    --------------
    {expandedPrompt}
    --------------

    YOUR ONLY TASK: respond with 'yes' if the text above between the dashes meets all of the following requirements:
    1. text MUST describe the tonic qualities or the mood/vibe of a song
    2. text MUST be at LEAST several sentences in length.
    3. text MUST be detailed

    otherwise, respond with 'no'. Briefly with the reason for your decision.`

    let prompt = new PromptTemplate({
        template: template,
        inputVariables: ["expandedPrompt"],
        });

    const input: string = await prompt.format({
        expandedPrompt: expandedPrompt,
    });

    const yesOrNoOrError = await handleModelCall(input);
    if (yesOrNoOrError instanceof VybeError) {
        return yesOrNoOrError;
    }

    // Here, yesOrNoOrError is a string of either 'yes' or 'no'
    const parser = StructuredOutputParser.fromZodSchema(BooleanResponseSchema);

    let prompt2 = new PromptTemplate({
        template: "Answer the user query.\n{formatInstructions}\n USER_RESPONSE: [{response}]\n",
        inputVariables: ["response"],
        partialVariables: {"formatInstructions": parser.getFormatInstructions()},
    });


    const input2: string = await prompt2.format({
        response: yesOrNoOrError,
    });

    const output = await handleModelCall(input2);
    if (output instanceof VybeError) {
        return output;
    }

    let stringOutput = output as unknown as string;
    let parsedOutput;

    try {
        parsedOutput = await parser.parse(stringOutput);
    } catch (e: any) {
        return new VybeError(e.status, e.message, input);
    }

    if (!parsedOutput.is_valid_input) {
        return new VybeError("400", "Expanded prompt does not make semantic sense for this application", expandedPrompt);
    }

    return expandedPrompt;
}