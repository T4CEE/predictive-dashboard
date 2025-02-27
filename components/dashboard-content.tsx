"use client"

import { useEffect, useState } from "react"
import { Calendar, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import MetricCard from "@/components/metric-card"
import SalesChart from "@/components/sales-chart"
import PredictionChart from "@/components/prediction-chart"
import DataTable from "@/components/data-table"
import { fetchDatasetInfo, fetchMetrics } from "@/lib/api"
import type { DatasetInfo, Metric } from "@/lib/types"

interface DashboardContentProps {
  dataset: string
}

export default function DashboardContent({ dataset }: DashboardContentProps) {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const metricsData = await fetchMetrics(dataset)
        const info = await fetchDatasetInfo(dataset)
        setMetrics(metricsData)
        setDatasetInfo(info)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [dataset])

  const datasetTitles: Record<string, string> = {
    sales: "Sales Forecast",
    users: "User Growth Prediction",
    revenue: "Revenue Prediction",
    engagement: "User Engagement Analysis",
  }

  return (
    <SidebarInset>
      <div className="flex h-full flex-col">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-6">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-semibold">{datasetTitles[dataset] || "Dashboard"}</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Calendar className="h-4 w-4" />
                <span>Last 30 days</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {loading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => <MetricCard key={i} loading={true} />)
                : metrics.map((metric) => (
                    <MetricCard
                      key={metric.id}
                      title={metric.title}
                      value={metric.value}
                      change={metric.change}
                      trend={metric.trend}
                      loading={loading}
                    />
                  ))}
            </div>

            <Tabs defaultValue="overview">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="predictions">Predictions</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                  <Button size="sm">Run Prediction</Button>
                </div>
              </div>

              <TabsContent value="overview" className="mt-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Data</CardTitle>
                    <CardDescription>{datasetInfo?.description || "Historical data analysis"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <SalesChart dataset={dataset} loading={loading} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="predictions" className="mt-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Predictive Analysis</CardTitle>
                    <CardDescription>AI-powered forecast for the next 12 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <PredictionChart dataset={dataset} loading={loading} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Raw Data</CardTitle>
                    <CardDescription>View and analyze the underlying data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable dataset={dataset} loading={loading} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarInset>
  )
}

