"use client"

import { useEffect, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchPredictionData } from "@/lib/api"
import type { PredictionDataPoint } from "@/lib/types"

interface PredictionChartProps {
  dataset: string
  loading?: boolean
}

export default function PredictionChart({ dataset, loading = false }: PredictionChartProps) {
  const [data, setData] = useState<PredictionDataPoint[]>([])
  const [chartLoading, setChartLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setChartLoading(true)
      try {
        const predictionData = await fetchPredictionData(dataset)
        setData(predictionData)
      } catch (error) {
        console.error("Failed to load prediction data:", error)
      } finally {
        setChartLoading(false)
      }
    }

    loadData()
  }, [dataset])

  if (loading || chartLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
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
        <Legend />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 3 }}
          name="Historical"
        />
        <Line
          type="monotone"
          dataKey="predicted"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 3 }}
          name="Predicted"
        />
        <Line
          type="monotone"
          dataKey="upperBound"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={1}
          strokeDasharray="3 3"
          dot={false}
          name="Upper Bound"
        />
        <Line
          type="monotone"
          dataKey="lowerBound"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={1}
          strokeDasharray="3 3"
          dot={false}
          name="Lower Bound"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

