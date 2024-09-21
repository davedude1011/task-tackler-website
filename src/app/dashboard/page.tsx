"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { getUserData } from "~/server/userData";
import { onRecieveMessage, sendMessage } from "./communication";
import NavBar from "~/components/custom/nav-bar";

export default function Page() {
  const [userData, setUserData] = useState(
    null as {
      id: number;
      stripeId: string | null;
      clerkId: string | null;
      paymentByPass: boolean | null;
      createdAt: Date;
      updatedAt: Date | null;
    } | null,
  );
  const [isRequiresSyncing, setIsRequiresSyncing] = useState(true);
  useEffect(() => {
    getUserData()
      .then((response) => setUserData(response ?? null))
      .catch((error) => console.log(error));

    onRecieveMessage("chromeExtensionSynced", (_) => {
      setIsRequiresSyncing(false);
    });
  }, []);
  return (
    <div>
      <NavBar />
      <div className="w-full h-screen">
        {isRequiresSyncing ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col">
              <div>Click here to link your extension.</div>
              <Button
                variant={"outline"}
                onClick={() => {
                  if (userData?.stripeId) {
                    sendMessage("stripeId", userData.stripeId);
                  }
                  sendMessage("refreshSubscriptionData", "true");
                }}
                className={`${userData == null && "animate-pulse"}`}
              >
                Link Extension
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-16 w-full h-fit">
            <div className="w-fit">
              <div>Premium not working?</div>
              <Button
                variant={"outline"}
                onClick={() => {
                  sendMessage("refreshSubscriptionData", "true");
                }}
                className="w-full"
              >
                Refresh Premium
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
