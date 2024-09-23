"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { getUserData } from "~/server/userData";
import { onRecieveMessage, sendMessage } from "./communication";
import NavBar from "~/components/custom/nav-bar";
import { SparxGraph } from "~/components/custom/sparx-graph";
import { Switch } from "~/components/ui/switch";

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

  const baseValues = {
    sparxSaveBookworks: true,
    sparxInjectBookworks: true,
    sparxAddChatbot: true,
    sparxAddDesmos: true,
    sparxAddSolution: true,
    sparxCleanHomescreen: true,

    educakeAddChatbot: true,
    educakeAddAutoComplete: true,

    senecaAddInputFilling: true,
  };
  const [settingsData, setSettingsData] =
    useState<Record<string, boolean>>(baseValues);

  useEffect(() => {
    getUserData()
      .then((response) => setUserData(response ?? null))
      .catch((error) => console.log(error));

    onRecieveMessage("chromeExtensionSynced", (_) => {
      setIsRequiresSyncing(false);
    });
    onRecieveMessage("settingsValues", (stringifiedData) => {
      const parsedData = JSON.parse(stringifiedData ?? "{}") as Record<
        string,
        boolean
      >;

      setSettingsData(parsedData);
      console.log(parsedData);
    });
    onRecieveMessage("reloadPage", (_) => {
      window.location.reload();
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

                  sendMessage("setFullSettings", JSON.stringify(baseValues));
                }}
                className={`${userData == null && "animate-pulse"}`}
              >
                Link Extension
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-16 w-full h-fit flex flex-col p-12 gap-6">
            <div className="flex flex-row flex-wrap gap-6">
              <div className="border rounded-md flex flex-col gap-4 p-4 flex-grow">
                <div className="text-2xl font-bold">Sparx Maths</div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.sparxSaveBookworks}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "sparxSaveBookworks",
                          newSettingsValue: !settingsData.sparxSaveBookworks,
                        }),
                      );
                    }}
                  />
                  <div>Save Bookworks</div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.sparxInjectBookworks}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "sparxInjectBookworks",
                          newSettingsValue: !settingsData.sparxInjectBookworks,
                        }),
                      );
                    }}
                  />
                  <div>Autofill Bookworks</div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.sparxAddChatbot}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "sparxAddChatbot",
                          newSettingsValue: !settingsData.sparxAddChatbot,
                        }),
                      );
                    }}
                  />
                  <div>Add Chatbot</div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.sparxAddDesmos}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "sparxAddDesmos",
                          newSettingsValue: !settingsData.sparxAddDesmos,
                        }),
                      );
                    }}
                  />
                  <div>Add Calculator</div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.sparxAddSolution}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "sparxAddSolution",
                          newSettingsValue: !settingsData.sparxAddSolution,
                        }),
                      );
                    }}
                  />
                  <div>Add Solution Button</div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.sparxCleanHomescreen}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "sparxCleanHomescreen",
                          newSettingsValue: !settingsData.sparxCleanHomescreen,
                        }),
                      );
                    }}
                  />
                  <div>Clean Homescreen</div>
                </div>
              </div>
              <div className="border rounded-md flex flex-col gap-4 p-4 flex-grow">
                <div className="text-2xl font-bold">Educake</div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.educakeAddChatbot}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "educakeAddChatbot",
                          newSettingsValue: !settingsData.educakeAddChatbot,
                        }),
                      );
                    }}
                  />
                  <div>Add Chatbot</div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.educakeAddAutoComplete}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "educakeAddAutoComplete",
                          newSettingsValue:
                            !settingsData.educakeAddAutoComplete,
                        }),
                      );
                    }}
                  />
                  <div>Add Autocomplete Button</div>
                </div>
              </div>
              <div className="border rounded-md flex flex-col gap-4 p-4 flex-grow">
                <div className="text-2xl font-bold">Seneca</div>
                <div className="flex flex-row gap-4 items-center">
                  <Switch
                    checked={settingsData.senecaAddInputFilling}
                    onClick={() => {
                      sendMessage(
                        "settingsUpdate",
                        JSON.stringify({
                          settingsKey: "senecaAddInputFilling",
                          newSettingsValue: !settingsData.senecaAddInputFilling,
                        }),
                      );
                    }}
                  />
                  <div>Auto-fill Inputs</div>
                </div>
              </div>
              <div className="border rounded-md flex flex-col gap-4 p-4 flex-grow">
                <div>Other Options</div>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    sendMessage("refreshSubscriptionData", "true");
                  }}
                  className="w-full"
                >
                  Refresh Premium
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    sendMessage("clearStripeId", "true");
                  }}
                  className="w-full"
                >
                  Disconnect Chrome Extension
                </Button>
              </div>
            </div>

            <SparxGraph />
          </div>
        )}
      </div>
    </div>
  );
}
