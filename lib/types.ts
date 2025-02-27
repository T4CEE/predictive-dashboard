export interface Metric {
  id: string
  title: string
  value: string | number
  change: number
  trend: "up" | "down" | "neutral"
}

export interface DatasetInfo {
  id: string
  name: string
  description: string
  lastUpdated: string
}

export interface HistoricalDataPoint {
  date: string
  value: number
}

export interface PredictionDataPoint {
  date: string
  actual: number
  predicted: number
  upperBound: number
  lowerBound: number
}

export interface TableDataItem {
  id: string
  date: string
  value: number
  change: number
  category: string
}

