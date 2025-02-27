"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardContent from "@/components/dashboard-content"

export default function Dashboard() {
  const [selectedDataset, setSelectedDataset] = useState("sales")

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-muted/40">
        <DashboardSidebar onDatasetChange={setSelectedDataset} selectedDataset={selectedDataset} />
        <DashboardContent dataset={selectedDataset} />
      </div>
    </SidebarProvider>
  )
}

