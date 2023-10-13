import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: { userId: userId}
        })

        if (userSubscription && userSubscription.stripeCustomerId) {
            // redirect to billing view page if user already has a subscription
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Vybe. Pro",
                            description: "Vybe. Pro subscription",
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId: userId
            },
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}