"use server"

import Stripe from "stripe"
import { getUserData } from "./userData";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function getSubscriptions(stripeId?: string) {
    const customerId = stripeId ?? (await getUserData())?.stripeId;
    console.log(customerId)
    const subscriptions = await stripe.subscriptions.list({
        // @ts-expect-error uhh
        customer: customerId,
        expand: ['data.items.data.price'], // Optional: Expand price details if needed
      });
    const data = subscriptions?.data
    console.log(data)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data
}
export async function getSubscriptionId(): Promise<string> {
    const subscriptions = await getSubscriptions()
    const id = subscriptions[0]?.id
    // @ts-expect-error uhh
    return id
}

export async function deleteSubscription() {
    const deletion = await stripe.subscriptions.cancel(await getSubscriptionId())

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deletion
}