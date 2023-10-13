import { PromptTemplate } from "langchain/prompts";
import { VybeError } from "@/lib/TextToSpotifySongListConverter/types";
import { handleModelCall } from "@/lib/TextToSpotifySongListConverter/langchain-helpers";
import { StructuredOutputParser } from "langchain/output_parsers";
import type { SongsAndArtists } from "@/lib/TextToSpotifySongListConverter/types";
import { SongsSchema } from "@/lib/TextToSpotifySongListConverter/types";


export default async function unstructuredSongParser(unstructuredSongList: string): Promise<SongsAndArtists | VybeError> {
    const parser = StructuredOutputParser.fromZodSchema(SongsSchema);

    const prompt = new PromptTemplate({
        template: "Format the songs using the format.\n{format_instructions}\n{unstructuredSongList}",
        inputVariables: ["unstructuredSongList"],
        partialVariables: {"format_instructions": parser.getFormatInstructions()},
        });

    const input: string = await prompt.format({unstructuredSongList});


    const stringOutput = await handleModelCall(input);
    if (stringOutput instanceof VybeError) {
        return stringOutput;
    }
    let parsedOutput;

    try {
        parsedOutput = await parser.parse(stringOutput);
    } catch (e: any) {
        console.log("why, hello there!")
        return new VybeError(e.status, e.message, input);
    }

    return parsedOutput as SongsAndArtists;
}