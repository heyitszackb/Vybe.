import { VybeError } from "./types";
import { model, model4} from "./globals";

export async function handleModelCall(input: string, useGpt4: boolean = false): Promise<string | VybeError> {
    try {
        let res: string;
        if (useGpt4) {
            res = await model4.call(input)
        } else {
            res = await model.call(input);
        }
        return res;
    } catch (e: any) {
        return new VybeError(e.status, e.message, input);
    }
}