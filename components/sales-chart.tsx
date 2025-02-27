"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchHistoricalData } from "@/lib/api";
import type { HistoricalDataPoint } from "@/lib/types";

interface SalesChartProps {
  dataset: string;
  loading?: boolean;
}

export default function SalesChart({
  dataset,
  loading = false,
}: SalesChartProps) {
  const [data, setData] = useState<HistoricalDataPoint[]>([]);
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setChartLoading(true);
      try {
        const historicalData = await fetchHistoricalData(dataset);
        setData(historicalData);
      } catch (error) {
        console.error("Failed to load historical data:", error);
      } finally {
        setChartLoading(false);
      }
    };

    loadData();
  }, [dataset]);

  if (loading || chartLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#888"
          strokeOpacity={0.2}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: "#888", strokeOpacity: 0.2 }}
          axisLine={{ stroke: "#888", strokeOpacity: 0.2 }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: "#888", strokeOpacity: 0.2 }}
          axisLine={{ stroke: "#888", strokeOpacity: 0.2 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
