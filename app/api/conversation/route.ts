import { auth } from "@clerk/nextjs"
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            console.log("need userID")
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!openai.apiKey) {
            console.log("need key")
            return new NextResponse("OpenAI API Key not configured", { status: 500 })
        }

        if (!messages) {
            console.log("need messages")
            return new NextResponse("Messages are required", { status: 400 })
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages
        });
        console.log("LOGGED!",response.choices[0].message);

        return NextResponse.json(response.choices[0].message)

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500})
    }
}
