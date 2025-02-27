"use client"

import { useEffect, useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchTableData } from "@/lib/api"
import type { TableDataItem } from "@/lib/types"

interface DataTableProps {
  dataset: string
  loading?: boolean
}

export default function DataTable({ dataset, loading = false }: DataTableProps) {
  const [data, setData] = useState<TableDataItem[]>([])
  const [tableLoading, setTableLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    const loadData = async () => {
      setTableLoading(true)
      try {
        const tableData = await fetchTableData(dataset)
        setData(tableData)
      } catch (error) {
        console.error("Failed to load table data:", error)
      } finally {
        setTableLoading(false)
      }
    }

    loadData()
  }, [dataset])

  const columns: ColumnDef<TableDataItem>[] = [
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "value",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Value
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const value = Number.parseFloat(row.getValue("value"))
        return <div className="font-medium">{value.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "change",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Change
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const change = Number.parseFloat(row.getValue("change"))
        return (
          <div className={change > 0 ? "text-emerald-500" : change < 0 ? "text-rose-500" : ""}>
            {change > 0 ? "+" : ""}
            {change.toFixed(2)}%
          </div>
        )
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  if (loading || tableLoading) {
    return (
      <div className="w-full space-y-3">
        <div className="flex items-center py-4 gap-2">
          <Skeleton className="h-9 w-[250px]" />
          <Skeleton className="h-9 w-[100px] ml-auto" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((column, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[70px]" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input placeholder="Filter data..." className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

