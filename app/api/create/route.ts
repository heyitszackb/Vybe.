import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import textToSpotifySongListConverter from "@/lib/TextToSpotifySongListConverter/text-to-spotify-song-list-converter";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }


        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial limit reached", { status: 403 })
        }


        await increaseApiLimit();
        const songData = await textToSpotifySongListConverter(prompt);

        return NextResponse.json(songData)

    } catch (error) {
        return new NextResponse("Internal error", { status: 500})
    }
}