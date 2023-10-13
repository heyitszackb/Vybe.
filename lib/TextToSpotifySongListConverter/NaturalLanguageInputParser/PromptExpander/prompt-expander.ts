import { VybeError } from "@/lib/TextToSpotifySongListConverter/types";
import initialPromptExpander from "./initial-prompt-expander";
import expandedPromptVerifier from "./expanded-prompt-verifier";

export default async function promptExpander(verifiedUserPrompt: string): Promise<string | VybeError> {
    const expandedPrompt = await initialPromptExpander(verifiedUserPrompt);
    if (expandedPrompt instanceof VybeError) {
        return expandedPrompt;
    }

    return await expandedPromptVerifier(expandedPrompt);
}