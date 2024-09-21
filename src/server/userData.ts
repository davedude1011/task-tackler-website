"use server"

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "./db";
import { userData } from "./db/schema";
import { eq, or } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function createUser() {
    const user = auth()
    if (user?.userId) {
        const moreUserData = await clerkClient().users.getUser(user.userId)

        const userExists = await getUserData()
        if (!userExists) {
            const customer = await stripe.customers.create({
                name: moreUserData.fullName??"",
                email: moreUserData.primaryEmailAddress?.emailAddress??"",
                metadata: {
                    userId: user.userId
                }
            })
            await db.insert(userData).values({
                clerkId: user.userId,
                stripeId: customer.id
            })
        }
    }
}
export async function getUserData(stripeId?: string) {
    const user = auth()
    console.log(user?.userId)
    if (user?.userId || stripeId) {
        const data = await db.select().from(userData).where(
            or(
                eq(userData.clerkId, user.userId??""),
                eq(userData.stripeId, stripeId??"")
            )
        )
        return data[0]
    }
}
export async function isSubscriptionByPassed(stripeId?: string): Promise<boolean> {
    const userData = await getUserData(stripeId)
    if (userData) {
        return userData.paymentByPass ?? false
    }
    return false
}