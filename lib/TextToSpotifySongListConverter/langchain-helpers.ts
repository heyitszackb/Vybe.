import { VybeError, GPTVersion, GPT_VERSIONS } from "./types";
import { gpt3_5, gpt4 } from "./globals";

export async function handleModelCall(input: string, model: GPTVersion = GPT_VERSIONS.GPT3): Promise<string | VybeError> {
    try {
        let res: string;
        if (model === GPT_VERSIONS.GPT4) {
            res = await gpt4.call(input)
        } else  {
            res = await gpt3_5.call(input);
        }
        return res;
    } catch (e: any) {
        return new VybeError(e.status, e.message, input);
    }
}