import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { textToSpotifySongListConverter } from "@/lib/TextToSpotifySongListConverter/text-to-spotify-song-list-converter";
import initialPromptExpander from "@/lib/TextToSpotifySongListConverter/NaturalLanguageInputParser/PromptExpander/initial-prompt-expander";

export async function GET(
    req: Request,
) {
    try {
        // const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        const res = await initialPromptExpander(prompt);
        console.log(res)

        return NextResponse.json(res)

    } catch (error: any) {
        return new NextResponse(error.message, { status: 500})
    }
}