import React from 'react'
import { useDispatch } from "react-redux"
import toast from 'react-hot-toast'
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Selection, SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { BsThreeDotsVertical } from "react-icons/bs"

import { useAppSelector } from '@/redux/store'
import axios from 'axios'
import { CustomerTable } from '@/interfaces/CollectMoney'
import BigModal from '@/Components/Elememt/BigModal'
import { setCustomers } from '@/redux/features/customers-slice'
import MainLayout from '@/Layouts/MainLayout'
import MonthTableComponent from './MonthTable'
import { capitalize } from '@/lib/capitalize'

const INITIAL_VISIBLE_COLUMNS = ["Mã khách hàng", "Tên khách hàng", "Khu vực", "CMND/CCCD", "Số điện thoại", "Thao tác"];

const customerTableColumns = [
  { name: "Mã khách hàng", uid: "MaKhachHang", sortable: true },
  { name: "Tên khách hàng", uid: "HoTen", sortable: true },
  { name: "Khu vực", uid: "KhuVuc", sortable: true },
  { name: "CMND/CCCD", uid: "CCCD", sortable: true },
  { name: "Số điện thoại", uid: "SDT", sortable: true },
  { name: "Thao tác", uid: "action" },
]

const khuVuc = [
  {
    name: "Khu A",
  },
  {
    name: "Khu Nhà Bạc",
  },
]

const searchFilterList = [
  {
    name: "Tên khách hàng",
    value: "HoTen"
  },
  {
    name: "Mã khách hàng",
    value: "MaKhachHang"
  },
  {
    name: "CMND/CCCD",
    value: "CCCD"
  },
  {
    name: "Số điện thoại",
    value: "SDT"
  },
]

export default function CollectMoneyPage() {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [userSelected, setUserSelected] = React.useState<string>("")
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "MaKhachHang",
    direction: "ascending",
  });
  const [searchFilter, setSearchFilter] = React.useState<Selection>(new Set(["HoTen"]));

  React.useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get("http://localhost:8000/api/danhsachkhachhang")
      if (res.status === 200) {
        dispatch(setCustomers(res.data))
      }
    }
    fetchApi()
  }, [])

  const customerData: CustomerTable[] = useAppSelector(state => state.customerReducer.value)
  const columns = customerTableColumns
  const pages = Math.ceil(customerData.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCustomer = [...customerData];

    if (hasSearchFilter) {
      filteredCustomer = filteredCustomer.filter((customer) => {
        if (Array.from(searchFilter)[0] === "HoTen") {
          return customer?.HoTen.includes(filterValue)
        } else if (Array.from(searchFilter)[0] === "MaKhachHang") {
          return customer?.MaKhachHang.includes(filterValue)
        } else if (Array.from(searchFilter)[0] === "CCCD") {
          return customer?.CCCD.includes(filterValue)
        } else if (Array.from(searchFilter)[0] === "SDT") {
          return customer?.SDT.includes(filterValue)
        }
      });
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== khuVuc.length) {
      filteredCustomer = filteredCustomer.filter((customer) =>
        Array.from(statusFilter).includes(customer.KhuVuc),
      );
    }

    return filteredCustomer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData, filterValue, statusFilter, searchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: CustomerTable, b: CustomerTable) => {
      const first = a[sortDescriptor.column as keyof CustomerTable];
      const second = b[sortDescriptor.column as keyof CustomerTable];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((customer: CustomerTable, columnKey: React.Key): React.ReactNode => {
    const cellValue = customer[columnKey as keyof CustomerTable];
    switch (columnKey) {
      case "MaKhachHang":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{customer.MaKhachHang}</p>
          </div>
        );
      case "HoTen":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{customer.HoTen}</p>
          </div>
        );
      case "KhuVuc":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{customer.KhuVuc}</p>
          </div>
        );
      case "CCCD":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{customer.CCCD}</p>
          </div>
        );
      case "SDT":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{customer.SDT}</p>
          </div>
        );
      case "action":
        return (
          <div>
            <Button
              size='sm'
              variant='ghost'
              className='border-none'
              isIconOnly
              radius='full'
              onPress={() => {
                setUserSelected(customer.MaKhachHang)
                onOpen()
              }}
            >
              <AiOutlineEye className="text-lg" />
            </Button>
          </div>
        );
      default:
        return <></>;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Select
            label="Bộ lọc tìm kiếm"
            placeholder="Chọn bộ lọc"
            selectedKeys={searchFilter}
            size='sm'
            className="max-w-xs"
            onSelectionChange={setSearchFilter}
          >
            {searchFilterList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            isClearable
            classNames={{
              base: "w-full",
              inputWrapper: "border-1",
            }}
            placeholder="Nhập nội dung tìm kiếm"
            size="sm"
            startContent={<AiOutlineSearch className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="w-full flex items-center justify-end gap-3">
          <Dropdown>
            <DropdownTrigger>
              <Button
                endContent={<BsThreeDotsVertical className="text-small" />}
                variant="flat"
              >
                Khu Vực
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {khuVuc.map((KV) => (
                <DropdownItem key={KV.name} className="capitalize">
                  {capitalize(KV.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Hiện có {customerData.length} khách hàng</span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    customerData.length,
    hasSearchFilter,
    searchFilter
  ])

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        {/* <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "Đã chọn tất cả"
            : `${selectedKeys.size} trên ${items.length} được chọn`}
        </span> */}
      </div>
    );
  }, [page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-full"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <>
      <MainLayout>
        <Table
          isCompact
          isStriped
          aria-label="Bảng tháng"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          checkboxesProps={{
            classNames: {
              wrapper: "after:bg-foreground after:text-background text-background",
            },
          }}
          classNames={classNames}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"Không tìm thấy khách hàng"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.MaKhachHang} >
                {(columnKey) => <TableCell>{
                  renderCell(item, columnKey)
                }</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </MainLayout>

      {isOpen && (
        <BigModal
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        >
          <MonthTableComponent MaKhachHang={userSelected} onClose={onClose} />
        </BigModal>
        // <Detail isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} MaKhachHang={userSelected} />
      )}
    </>
  )
}
