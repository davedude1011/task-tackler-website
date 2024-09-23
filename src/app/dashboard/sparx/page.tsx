"use client";

import { useEffect, useState } from "react";
import NavBar from "~/components/custom/nav-bar";
import { onRecieveMessage } from "../communication";
import { SparxGraph } from "~/components/custom/sparx-graph";

export default function Page() {
  const [sparxData, setSparxData] = useState(
    null as Record<string, { question: string; submitAnswer: string }> | null,
  );
  useEffect(() => {
    onRecieveMessage("sparxData", (stringifiedData) => {
      setSparxData(
        JSON.parse(stringifiedData) as Record<
          string,
          { question: string; submitAnswer: string }
        >,
      );
    });
  });
  return (
    <div className="w-full h-screen">
      <NavBar />
      <div className="w-full h-full mt-16">
        <SparxGraph />
        <div>
          {/*sparxData &&
            Object.keys(sparxData).map((key) => (
              <div key={key}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sparxData[key]?.question ?? "",
                  }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sparxData[key]?.submitAnswer ?? "",
                  }}
                ></div>
              </div>
            ))*/}
        </div>
      </div>
    </div>
  );
}
