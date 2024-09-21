import { NextResponse } from 'next/server';
import { getSubscriptions } from '~/server/subscriptions';
import { isSubscriptionByPassed } from '~/server/userData';

export async function POST(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  const stripeId = await req.text().then(id => id.replace(/"/g, '').trim());

  const subscription = await getSubscriptions(stripeId)
  const isSubscribed = subscription.length > 0
  const subscriptionByPass = await isSubscriptionByPassed(stripeId)
  
  return new NextResponse(
    JSON.stringify({ isSubscribed: (isSubscribed || subscriptionByPass) }),
    { headers }
  );
}