import React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Badge } from "@/Components/ui/badge"
import { Input } from "@/Components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { IoIosArrowBack } from "react-icons/io"

import MainLayout from '@/Layouts/MainLayout'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog'
import { ICustomers } from '@/interfaces/Customer'
import AddCustomerForm from './AddCustomer'
import { setCustomers } from '@/redux/features/customers-slice'
import { useAppSelector } from '@/redux/store'
import { Link } from '@inertiajs/react'

export const customersData: ICustomers[] = [
  {
    HoTen: "Nguyen Van A",
    KhuVuc: "Khu A",
    Kios: ["Kios1", "Kios2"],
  },
  {
    HoTen: "Nguyen Van B",
    KhuVuc: "Khu A",
    Kios: ["Kios3", "Kios4"],
  },
];

export const columns: ColumnDef<ICustomers, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "HoTen",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Khách hàng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("HoTen")}</div>,
  },
  {
    accessorKey: "KhuVuc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Khu vực
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">{row.getValue("KhuVuc") ? row.getValue("KhuVuc") : "Không có"}</div>
      )
    },
  },
  {
    accessorKey: "Kios",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mặt bằng sử dụng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data: string[] = row.getValue("Kios")
      return (
        <div className="flex flex-row gap-3">
          {
            data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <div key={index}>
                    <Badge>{item}</Badge>
                  </div>
                )
              })
            ) : <span>Không có</span>
          }
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const kios = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(kios.HoTen)}
            >
              Copy kios ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View kios details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function CustomerPage() {
  const dispatch = useDispatch()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    const fetchApi = async () => {
      dispatch(setCustomers(customersData))
    }
    fetchApi()
  }, [])

  const data: ICustomers[] = useAppSelector(state => state.customersReducer.value)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <>
      <MainLayout>
        <div className='flex gap-3 items-center'>
          <Link
            href='/'
          >

            <Button
              size={"icon"}
              variant={"outline"}
              className='rounded-xl'
            >
              <IoIosArrowBack />
            </Button>
          </Link>

          <h2
            className='text-2xl font-semibold'
          >
            Danh sách khách hàng
          </h2>
        </div>

        <div className="w-full">
          <div className="flex flex-col md:flex-row gap-2 items-center py-4 w-full">
            <Input
              placeholder="Nhập tên khách hàng"
              value={(table.getColumn("HoTen")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("HoTen")?.setFilterValue(event.target.value)
              }
              className="max-w-full"
            />

            <div className='flex gap-3 justify-between items-center w-full md:w-fit'>
              <Select
                defaultValue={(table.getColumn("KhuVuc")?.getFilterValue() as string) ?? ""}
                onValueChange={(event) =>
                  table.getColumn("KhuVuc")?.setFilterValue(event)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn khu vực" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="khu a">khu a</SelectItem>
                  <SelectItem value="khu b">khu b</SelectItem>
                  <SelectItem value="khu c">khu c</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Cột <ChevronDown className="ml-2 h-4 w-4" />
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
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    Thêm khách hàng
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95%] rounded-xl max-h-[95%] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>Thêm khách hàng</DialogTitle>
                    <DialogDescription>
                      Nhập thông tin chi tiết khách hàng.
                    </DialogDescription>
                  </DialogHeader>
                  <AddCustomerForm />
                </DialogContent>
              </Dialog>
            </div>

          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Không có kết quả.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} trên{" "}
              {table.getFilteredRowModel().rows.length} hàng được chọn.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Quay lại
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Kế tiếp
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

