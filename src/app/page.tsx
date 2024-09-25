"use client";

import { LuDownload } from "react-icons/lu";
import { Button } from "~/components/ui/button";
import { Spotlight } from "~/components/ui/spotlight";
import {
  BookCheckIcon,
  BookDown,
  BookMarkedIcon,
  BrainCircuit,
  Calculator,
  ChevronDown,
  CircleStop,
  Eye,
  FileSpreadsheet,
  Keyboard,
  Wind,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { GiBroom } from "react-icons/gi";
import Link from "next/link";
import NavBar from "~/components/custom/nav-bar";

export default function Page() {
  const featuresData = {
    "sparx-maths": [
      {
        icon: <BrainCircuit />,
        name: "Automatic Solutions",
      },
      {
        icon: <BookCheckIcon />,
        name: "Automated Bookwork Saving",
      },
      {
        icon: <Calculator />,
        name: "Built in Calculator",
      },
      {
        icon: <BookDown />,
        name: "Bookwork Filler",
      },
      {
        icon: <GiBroom />,
        name: "Cleaner Ui",
      },
    ],
    educake: [
      {
        icon: <BrainCircuit />,
        name: "Automatic Quiz Completion",
      },
      {
        icon: <Keyboard />,
        name: "Added keyboard shortcuts",
      },
    ],
    seneca: [
      {
        icon: <Eye />,
        name: "Input Answer peeking",
      },
    ],
    "know-it-all-ninja": [
      {
        icon: <BrainCircuit />,
        name: "Auto Answer Questions",
      },
      {
        icon: <Wind />,
        name: "Skip Tutorial",
      },
    ],
    bedrock: [
      {
        icon: <BookMarkedIcon />,
        name: "Built in Dictionary",
      },
      {
        icon: <CircleStop />,
        name: "Inline points Display",
      },
      {
        icon: <FileSpreadsheet />,
        name: "Editable userdata",
      },
    ],
  };

  return (
    <div className="h-screen w-screen overflow-auto relative">
      <NavBar />

      <div className="flex h-screen w-full items-center justify-center antialiased">
        <Spotlight className="absolute -top-40 left-0 z-10 md:-top-20 md:left-60" />
        <div className="flex flex-col gap-12">
          <div className="px-4 md:p-0">
            <div className="text-4xl text-center md:text-9xl font-bold">
              Task Tackler
            </div>
            <div className="text-sm text-center md:text-lg font-thin">
              Automating answers. Simplifying study. Tackling tasks.
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <Link
              href={
                "https://chromewebstore.google.com/detail/task-tackler/knmelikahkhldfnmafmlikolknhekkmp"
              }
            >
              <Button
                variant="default"
                className="flex flex-row items-center justify-center gap-4"
              >
                <LuDownload />
                <div>Download Extension</div>
              </Button>
            </Link>
            <Link href="https://github.com/davedude1011/taskTackler">
              <Button
                variant="outline"
                className="flex flex-row items-center justify-center gap-4"
              >
                <div>Github Repo</div>
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <ChevronDown className="animate-bounce" />
          </div>
        </div>
      </div>
      {/* PC UI: */}
      <div className="hidden md:flex bg-background z-20 h-fit min-h-screen w-full relative flex-col justify-center items-center gap-12">
        <div className="absolute inset-0 h-[100px] bg-gradient-to-b from-transparent to-background -translate-y-full"></div>
        <div className="text-4xl md:text-6xl font-bold">Key Features</div>
        <Tabs defaultValue="sparx-maths" className="flex flex-col items-center">
          <TabsList className="w-fit">
            <TabsTrigger value="sparx-maths">Sparx Maths</TabsTrigger>
            <TabsTrigger value="educake">Educake</TabsTrigger>
            <TabsTrigger value="seneca">Seneca</TabsTrigger>
            <TabsTrigger value="know-it-all-ninja">
              Know-it-all-ninja
            </TabsTrigger>
            <TabsTrigger value="bedrock">Bedrock</TabsTrigger>
          </TabsList>

          <TabsContent value="sparx-maths">
            <div className="flex flex-row flex-wrap p-12 gap-6 justify-center">
              {featuresData["sparx-maths"].map((featureData, index) => (
                <div
                  className="border p-6 rounded-md hover:rounded-[50px] transition-all flex-grow"
                  key={index}
                >
                  <div className="flex flex-row gap-2 items-center">
                    {featureData.icon}
                    <div className="text-2xl">{featureData.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="educake">
            <div className="flex flex-row flex-wrap p-12 gap-6 justify-center">
              {featuresData.educake.map((featureData, index) => (
                <div
                  className="border p-6 rounded-md hover:rounded-[50px] transition-all flex-grow"
                  key={index}
                >
                  <div className="flex flex-row gap-2 items-center">
                    {featureData.icon}
                    <div className="text-2xl">{featureData.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="seneca">
            <div className="flex flex-row flex-wrap p-12 gap-6 justify-center">
              {featuresData.seneca.map((featureData, index) => (
                <div
                  className="border p-6 rounded-md hover:rounded-[50px] transition-all flex-grow"
                  key={index}
                >
                  <div className="flex flex-row gap-2 items-center">
                    {featureData.icon}
                    <div className="text-2xl">{featureData.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="know-it-all-ninja">
            <div className="flex flex-row flex-wrap p-12 gap-6 justify-center">
              {featuresData["know-it-all-ninja"].map((featureData, index) => (
                <div
                  className="border p-6 rounded-md hover:rounded-[50px] transition-all flex-grow"
                  key={index}
                >
                  <div className="flex flex-row gap-2 items-center">
                    {featureData.icon}
                    <div className="text-2xl">{featureData.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="bedrock">
            <div className="flex flex-row flex-wrap p-12 gap-6 justify-center">
              {featuresData.bedrock.map((featureData, index) => (
                <div
                  className="border p-6 rounded-md hover:rounded-[50px] transition-all flex-grow"
                  key={index}
                >
                  <div className="flex flex-row gap-2 items-center">
                    {featureData.icon}
                    <div className="text-2xl">{featureData.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* MOBILE UI: */}
      <div className="md:hidden flex bg-background z-20 p-4 h-fit min-h-screen w-full relative flex-col justify-center items-center gap-12">
        <div className="text-4xl font-bold">Key Features</div>

        <div className="flex flex-col w-full gap-2">
          <div>Sparx Maths</div>
          {featuresData["sparx-maths"].map((featureData, index) => (
            <div className="border p-6 w-full rounded-md" key={index}>
              <div className="flex flex-row gap-2 items-center">
                {featureData.icon}
                <div className="flex-shrink">{featureData.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-2">
          <div>Educake</div>
          {featuresData.educake.map((featureData, index) => (
            <div className="border p-6 w-full rounded-md" key={index}>
              <div className="flex flex-row gap-2 items-center">
                {featureData.icon}
                <div className="flex-shrink">{featureData.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-2">
          <div>Seneca</div>
          {featuresData.seneca.map((featureData, index) => (
            <div className="border p-6 w-full rounded-md" key={index}>
              <div className="flex flex-row gap-2 items-center">
                {featureData.icon}
                <div className="flex-shrink">{featureData.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-2">
          <div>Know-It-All-Ninja</div>
          {featuresData["know-it-all-ninja"].map((featureData, index) => (
            <div className="border p-6 w-full rounded-md" key={index}>
              <div className="flex flex-row gap-2 items-center">
                {featureData.icon}
                <div className="flex-shrink">{featureData.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-2">
          <div>Bedrock</div>
          {featuresData.bedrock.map((featureData, index) => (
            <div className="border p-6 w-full rounded-md" key={index}>
              <div className="flex flex-row gap-2 items-center">
                {featureData.icon}
                <div className="flex-shrink">{featureData.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
