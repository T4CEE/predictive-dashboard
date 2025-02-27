"use client"
import { BarChart3, Home, LineChart, PieChart, Settings, ShoppingCart, TrendingUp, Users, Zap } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  onDatasetChange: (dataset: string) => void
  selectedDataset: string
}

export default function DashboardSidebar({ onDatasetChange, selectedDataset }: DashboardSidebarProps) {
  const datasets = [
    { id: "sales", name: "Sales Forecast", icon: ShoppingCart },
    { id: "users", name: "User Growth", icon: Users },
    { id: "revenue", name: "Revenue Prediction", icon: TrendingUp },
    { id: "engagement", name: "User Engagement", icon: Zap },
  ]

  const visualizations = [
    { id: "line", name: "Line Charts", icon: LineChart },
    { id: "bar", name: "Bar Charts", icon: BarChart3 },
    { id: "pie", name: "Pie Charts", icon: PieChart },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          <div className="font-semibold text-lg">Predictor Dashboard</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={true}>
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Datasets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {datasets.map((dataset) => (
                <SidebarMenuItem key={dataset.id}>
                  <SidebarMenuButton
                    isActive={selectedDataset === dataset.id}
                    onClick={() => onDatasetChange(dataset.id)}
                  >
                    <dataset.icon />
                    <span>{dataset.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Visualizations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visualizations.map((viz) => (
                <SidebarMenuItem key={viz.id}>
                  <SidebarMenuButton>
                    <viz.icon />
                    <span>{viz.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Data Analyst</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

