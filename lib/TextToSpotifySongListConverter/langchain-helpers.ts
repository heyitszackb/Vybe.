import { VybeError } from "./types";
import { model } from "./globals";

export default async function handleModelCall(input: string): Promise<string | VybeError> {
    try {
        const res: string = await model.call(input);
        return res;
    } catch (e: any) {
        return new VybeError(e.status, e.message, input);
    }
}