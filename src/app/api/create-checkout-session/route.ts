// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getUserData } from '~/server/userData';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
const YOUR_DOMAIN = process.env.DOMAIN ?? "";

export async function POST(req: Request) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const priceId = await req.text();

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        customer: (await getUserData())?.stripeId??"",
        success_url: `${YOUR_DOMAIN}/premium/success`,
        cancel_url: `${YOUR_DOMAIN}/premium`,
        automatic_tax: { enabled: true },
        customer_update: {
          address: 'auto', // Automatically save the address entered during Checkout
          shipping: 'auto', // Automatically save the shipping address entered during Checkout
        },
    });
  
    return new NextResponse(
      JSON.stringify({ url: session.url }),
      { headers }
    );
  }