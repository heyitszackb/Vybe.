
// Utils
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import textToSpotifySongListConverter from "@/lib/TextToSpotifySongListConverter/text-to-spotify-song-list-converter";

// Types
import { VybeError, GPTVersion, GPT_VERSIONS } from "@/lib/TextToSpotifySongListConverter/types";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, userQuery } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }


        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial limit reached", { status: 403 })
        }


        await increaseApiLimit();
        const songs = await textToSpotifySongListConverter(prompt, GPT_VERSIONS.GPT3);
        if (songs instanceof VybeError) {
            return new NextResponse(songs.reason + songs.input, { status: parseInt(songs.errorCode)})
        }

        return NextResponse.json(songs)

    } catch (error) {
        return new NextResponse("Internal error", { status: 500})
    }
}