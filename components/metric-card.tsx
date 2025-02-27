import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface MetricCardProps {
  title?: string
  value?: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
  loading?: boolean
}

export default function MetricCard({ title, value, change, trend, loading = false }: MetricCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20 mb-1" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className="flex items-center text-xs mt-1">
            {trend === "up" ? (
              <ArrowUpIcon className="mr-1 h-4 w-4 text-emerald-500" />
            ) : trend === "down" ? (
              <ArrowDownIcon className="mr-1 h-4 w-4 text-rose-500" />
            ) : null}
            <span
              className={
                trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-muted-foreground"
              }
            >
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-muted-foreground ml-1">from previous period</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}

