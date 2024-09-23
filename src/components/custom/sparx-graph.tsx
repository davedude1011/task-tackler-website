"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { onRecieveMessage } from "~/app/dashboard/communication";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

export const description = "An interactive line chart";

const chartConfig = {
  sparxMaths: {
    label: "sparxMaths",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SparxGraph() {
  const [sparxData, setSparxData] = React.useState<
    { date: string; sparxMaths: number }[] | null
  >(null);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("sparxMaths");

  React.useEffect(() => {
    onRecieveMessage("sparxData", (stringifiedData) => {
      const parsedData = JSON.parse(stringifiedData) as Record<
        string,
        { question: string; submitAnswer: string; timestamp: number }
      >;

      // Create a map to store date counts
      const dateCountMap: Record<string, number> = {};

      // Loop through the parsed data and group by date
      Object.values(parsedData).forEach(({ timestamp }) => {
        // Check if the timestamp is valid
        if (
          typeof timestamp === "number" &&
          !isNaN(timestamp) &&
          timestamp > 0
        ) {
          const date = new Date(timestamp).toISOString().split("T")[0]; // Convert timestamp to YYYY-MM-DD format
          // @ts-expect-error uhh
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          dateCountMap[date] = (dateCountMap[date] || 0) + 1; // Count occurrences for each date
        }
      });

      // Convert the map to the desired format
      const formattedData = Object.entries(dateCountMap).map(
        ([date, count]) => ({
          date,
          sparxMaths: count,
        }),
      );

      // Set the formatted data in state
      setSparxData(formattedData);
    });
  }, []);

  const total = React.useMemo(
    () => ({
      sparxMaths: (sparxData ?? []).reduce(
        (acc, curr) => acc + curr.sparxMaths,
        0,
      ),
    }),
    [sparxData],
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row w-full">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sparx Maths</CardTitle>
          <CardDescription>Showing total sparx usage</CardDescription>
        </div>
        <div className="flex">
          {["sparxMaths"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={sparxData ?? []} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="sparxMaths"
                  labelFormatter={(value) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
