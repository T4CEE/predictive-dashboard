import type { DatasetInfo, HistoricalDataPoint, Metric, PredictionDataPoint, TableDataItem } from "./types"

// Mock API functions that simulate fetching data from a backend

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchMetrics(dataset: string): Promise<Metric[]> {
  await delay(1000)

  const metrics: Record<string, Metric[]> = {
    sales: [
      { id: "total-sales", title: "Total Sales", value: "$124,592", change: 12.3, trend: "up" },
      { id: "avg-order", title: "Avg. Order Value", value: "$52.45", change: 3.8, trend: "up" },
      { id: "conversion", title: "Conversion Rate", value: "3.2%", change: -0.5, trend: "down" },
      { id: "customers", title: "New Customers", value: "1,429", change: 8.1, trend: "up" },
    ],
    users: [
      { id: "total-users", title: "Total Users", value: "32,594", change: 15.7, trend: "up" },
      { id: "active-users", title: "Active Users", value: "18,429", change: 4.2, trend: "up" },
      { id: "churn-rate", title: "Churn Rate", value: "2.8%", change: -1.3, trend: "up" },
      { id: "avg-session", title: "Avg. Session", value: "4.2 min", change: 0.3, trend: "neutral" },
    ],
    revenue: [
      { id: "total-revenue", title: "Total Revenue", value: "$892,345", change: 7.8, trend: "up" },
      { id: "mrr", title: "MRR", value: "$42,567", change: 5.3, trend: "up" },
      { id: "arpu", title: "ARPU", value: "$28.45", change: -2.1, trend: "down" },
      { id: "ltv", title: "Customer LTV", value: "$342", change: 3.5, trend: "up" },
    ],
    engagement: [
      { id: "dau", title: "Daily Active Users", value: "8,942", change: 6.7, trend: "up" },
      { id: "retention", title: "Retention Rate", value: "68%", change: 2.3, trend: "up" },
      { id: "avg-time", title: "Avg. Time on Site", value: "5.3 min", change: 8.1, trend: "up" },
      { id: "bounce-rate", title: "Bounce Rate", value: "32%", change: -4.2, trend: "up" },
    ],
  }

  return metrics[dataset] || []
}

export async function fetchDatasetInfo(dataset: string): Promise<DatasetInfo> {
  await delay(800)

  const info: Record<string, DatasetInfo> = {
    sales: {
      id: "sales",
      name: "Sales Forecast",
      description: "Historical sales data with monthly breakdown",
      lastUpdated: "2023-12-15",
    },
    users: {
      id: "users",
      name: "User Growth",
      description: "User acquisition and growth metrics",
      lastUpdated: "2023-12-18",
    },
    revenue: {
      id: "revenue",
      name: "Revenue Prediction",
      description: "Revenue trends and forecasting",
      lastUpdated: "2023-12-10",
    },
    engagement: {
      id: "engagement",
      name: "User Engagement",
      description: "User engagement and interaction metrics",
      lastUpdated: "2023-12-20",
    },
  }

  return info[dataset] || info.sales
}

export async function fetchHistoricalData(dataset: string): Promise<HistoricalDataPoint[]> {
  await delay(1200)

  // Generate 12 months of historical data
  const now = new Date()
  const data: HistoricalDataPoint[] = []

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()

    let baseValue = 0

    switch (dataset) {
      case "sales":
        baseValue = 80000 + Math.random() * 40000
        break
      case "users":
        baseValue = 25000 + Math.random() * 15000
        break
      case "revenue":
        baseValue = 650000 + Math.random() * 250000
        break
      case "engagement":
        baseValue = 7000 + Math.random() * 3000
        break
      default:
        baseValue = 50000 + Math.random() * 20000
    }

    // Add seasonality
    const seasonality = Math.sin((date.getMonth() / 11) * Math.PI) * 0.2
    const trend = i / 24 // Slight upward trend over time
    const value = baseValue * (1 + seasonality + trend)

    data.push({
      date: `${month} ${year}`,
      value: Math.round(value),
    })
  }

  return data
}

export async function fetchPredictionData(dataset: string): Promise<PredictionDataPoint[]> {
  await delay(1500)

  // Generate 6 months of historical + 6 months of prediction data
  const now = new Date()
  const data: PredictionDataPoint[] = []

  for (let i = 5; i >= -6; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()

    let baseValue = 0

    switch (dataset) {
      case "sales":
        baseValue = 80000 + Math.random() * 40000
        break
      case "users":
        baseValue = 25000 + Math.random() * 15000
        break
      case "revenue":
        baseValue = 650000 + Math.random() * 250000
        break
      case "engagement":
        baseValue = 7000 + Math.random() * 3000
        break
      default:
        baseValue = 50000 + Math.random() * 20000
    }

    // Add seasonality
    const seasonality = Math.sin(((date.getMonth() + 6) / 11) * Math.PI) * 0.2
    const trend = (5 - i) / 20 // Upward trend over time
    const randomFactor = Math.random() * 0.1 - 0.05

    const actualValue = i >= 0 ? Math.round(baseValue * (1 + seasonality + trend + randomFactor)) : null

    const predictedValue = i < 0 || i === 0 ? Math.round(baseValue * (1 + seasonality + trend)) : null

    const confidenceInterval = baseValue * 0.1 * (i < 0 ? Math.abs(i) / 6 + 1 : 1)

    data.push({
      date: `${month} ${year}`,
      actual: actualValue,
      predicted: predictedValue,
      upperBound: predictedValue ? predictedValue + confidenceInterval : null,
      lowerBound: predictedValue ? predictedValue - confidenceInterval : null,
    })
  }

  return data
}

export async function fetchTableData(dataset: string): Promise<TableDataItem[]> {
  await delay(1000)

  // Generate 20 rows of table data
  const now = new Date()
  const data: TableDataItem[] = []

  const categories: Record<string, string[]> = {
    sales: ["Online", "In-store", "Wholesale", "Marketplace"],
    users: ["Organic", "Referral", "Social", "Paid"],
    revenue: ["Subscriptions", "One-time", "Services", "Add-ons"],
    engagement: ["Mobile", "Desktop", "Tablet", "App"],
  }

  const currentCategories = categories[dataset] || categories.sales

  for (let i = 19; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    const formattedDate = date.toISOString().split("T")[0]

    let baseValue = 0

    switch (dataset) {
      case "sales":
        baseValue = 2000 + Math.random() * 3000
        break
      case "users":
        baseValue = 500 + Math.random() * 1000
        break
      case "revenue":
        baseValue = 15000 + Math.random() * 10000
        break
      case "engagement":
        baseValue = 300 + Math.random() * 500
        break
      default:
        baseValue = 1000 + Math.random() * 2000
    }

    const value = Math.round(baseValue)
    const prevValue = Math.round(baseValue * (0.8 + Math.random() * 0.4))
    const change = ((value - prevValue) / prevValue) * 100

    data.push({
      id: `row-${i}`,
      date: formattedDate,
      value,
      change: Number.parseFloat(change.toFixed(2)),
      category: currentCategories[Math.floor(Math.random() * currentCategories.length)],
    })
  }

  return data
}

