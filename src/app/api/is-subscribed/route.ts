import { NextResponse } from 'next/server';
import { getSubscriptions } from '~/server/subscriptions';
import { isSubscriptionByPassed } from '~/server/userData';

export async function GET() {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  try {
    const subscription = await getSubscriptions("cus_QtB49bNvuhsFmA")
    const subscriptionByPass = await isSubscriptionByPassed("cus_QtB49bNvuhsFmA")
    return NextResponse.json(JSON.stringify({
      isSubscribed: subscription.length > 0 || subscriptionByPass
    }), {headers});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}