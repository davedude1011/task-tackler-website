"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Check, Smile, TicketCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckoutButton from "~/components/custom/checkout-button";
import NavBar from "~/components/custom/nav-bar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { TextHoverEffect } from "~/components/ui/text-hover-effect";
import { getSubscriptions } from "~/server/subscriptions";
import { isSubscriptionByPassed } from "~/server/userData";

export default function Page() {
  const [subscriptions, setSubscriptions] = useState(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    null as Record<string, any>[] | null,
  );
  const [isPaymentByPass, setIsPaymentByPass] = useState(false);
  useEffect(() => {
    isSubscriptionByPassed()
      .then((response) => {
        if (response) {
          setIsPaymentByPass(response);
        } else {
          getSubscriptions()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            .then((response) => setSubscriptions(response))
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const pricePlanMap = {
    monthly: {
      priceId: "price_1Q1Odq2KfOlLBh4IdlmUHjvA",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      subscribed:
        // @ts-expect-error uhh
        subscriptions?.filter(
          (subscriptionData) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            subscriptionData.items.data[0].price.id ==
            "price_1Q1Odq2KfOlLBh4IdlmUHjvA",
        ).length > 0,
    },
    yearly: {
      priceId: "price_1Q1Odq2KfOlLBh4IJrJxmDiZ",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      subscribed:
        // @ts-expect-error uhh
        subscriptions?.filter(
          (subscriptionData) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            subscriptionData.items.data[0].price.id ==
            "price_1Q1Odq2KfOlLBh4IJrJxmDiZ",
        ).length > 0,
    },
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
      <TextHoverEffect text={"Task-Tackler +"} />
      <NavBar />
      <SignedOut>
        <SignInButton>
          <Button value={"outline"} className="z-20">
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {isPaymentByPass ? (
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex flex-row gap-6 text-3xl md:text-6xl items-center leading-0">
                You have a free pass <TicketCheck size={48} />
              </div>
              <div className="flex flex-row gap-2 items-center font-thin">
                <Smile size={18} /> Enjoy your permenant free memborship
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-center">
              <Link href={"/"}>
                <Button variant={"outline"}>Home</Button>
              </Link>
              <Link href={"/dashboard"}>
                <Button variant={"default"}>Dashboard</Button>
              </Link>
              <Link href={"/docs"}>
                <Button variant={"outline"}>Docs</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 items-center py-20 md:py-0">
            <div className="flex flex-col gap-6 p-6 rounded-md border w-full md:w-fit opacity-75 hover:opacity-100 hover:rotate-1 transition-all z-20 bg-background">
              <div className="flex flex-row gap-12 justify-between">
                <div className="text-4xl">Monthly Plan</div>
              </div>
              <div className="flex flex-row items-end">
                <div className="text-2xl leading-none">£2.89</div>
                <div className="text-xs">/month</div>
              </div>
              <CheckoutButton
                isBuy={!pricePlanMap.monthly.subscribed}
                disabled={pricePlanMap.yearly.subscribed}
                priceId={pricePlanMap.monthly.priceId}
                loading={!subscriptions}
              />
              <div className="text-sm flex flex-col gap-4 font-thin">
                {[
                  "Sparx Maths",
                  "Educake",
                  "Bedrock",
                  "Know-It-All-Ninja",
                  "Seneca",
                ].map((siteName) => (
                  <div
                    key={siteName}
                    className="flex flex-row gap-2 items-center"
                  >
                    <Check />
                    <div>Built-In Chatbot for {siteName}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 p-6 rounded-md border w-full md:w-fit opacity-50 hover:opacity-100 hover:rotate-1 transition-all z-20 bg-background">
              <div className="flex flex-row gap-12 justify-between">
                <div className="text-4xl">Yearly Plan</div>
                <Badge>Cheaper</Badge>
              </div>
              <div className="flex flex-row items-end">
                <div className="text-2xl leading-none">£30</div>
                <div className="text-xs">/year</div>
              </div>
              <CheckoutButton
                isBuy={!pricePlanMap.yearly.subscribed}
                disabled={pricePlanMap.monthly.subscribed}
                priceId={pricePlanMap.yearly.priceId}
                loading={!subscriptions}
              />
              <div className="text-sm flex flex-col gap-4 font-thin">
                {[
                  "Sparx Maths",
                  "Educake",
                  "Bedrock",
                  "Know-It-All-Ninja",
                  "Seneca",
                ].map((siteName) => (
                  <div
                    key={siteName}
                    className="flex flex-row gap-2 items-center"
                  >
                    <Check />
                    <div>Built-In Chatbot for {siteName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </SignedIn>
    </div>
  );
}
