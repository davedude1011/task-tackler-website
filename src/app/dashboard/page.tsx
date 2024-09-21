"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { getUserData } from "~/server/userData";
import { onRecieveMessage, sendMessage } from "./communication";

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
      {isRequiresSyncing ? (
        <div>
          <div>Click here to connect the chrome extension to this site</div>
          <Button
            variant={"outline"}
            onClick={() => {
              if (userData?.stripeId) {
                sendMessage("stripeId", userData.stripeId);
              }
            }}
            className={`${userData == null && "animate-pulse"}`}
          >
            Sync Extension
          </Button>
        </div>
      ) : (
        <div>Synced!</div>
      )}
    </div>
  );
}
