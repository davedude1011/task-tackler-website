import { NextResponse } from 'next/server';
import { getSubscriptions } from '~/server/subscriptions';
import { isSubscriptionByPassed } from '~/server/userData';

export async function GET(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  const stripeId = await req.text();
  try {
    const subscription = await getSubscriptions(stripeId)
    const subscriptionByPass = await isSubscriptionByPassed(stripeId)
    return NextResponse.json(JSON.stringify({
      isSubscribed: subscription.length > 0 || subscriptionByPass
    }), {headers});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}