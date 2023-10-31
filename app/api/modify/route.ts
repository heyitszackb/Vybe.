// Types
import { VybeError } from "@/lib/TextToSpotifySongListConverter/types";

// Utils
import { urisToSuggestionsConverter } from "@/lib/UrisToSuggestionsConverter/uris-to-suggestions-converter";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { uris } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }


        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial limit reached", { status: 403 })
        }


        await increaseApiLimit();
        // Get the songs from the URIs and return VybeSong[] or VybeError
        for (let uri of uris) {
            console.log(uri);
        }
        
        const songs = await urisToSuggestionsConverter(uris); // Create this
        console.log(songs)

        if (songs instanceof VybeError) {
            return new NextResponse(songs.reason + songs.input, { status: parseInt(songs.errorCode)})
        }

        return NextResponse.json(songs)

    } catch (error) {
        return new NextResponse("Internal error", { status: 500})
    }
}