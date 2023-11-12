import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import toast from 'react-hot-toast'
import { BsThreeDotsVertical } from "react-icons/bs"
import { AiOutlineSearch, AiOutlineEdit } from "react-icons/ai"
import { Button, Checkbox, CheckboxGroup, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Popover, PopoverContent, PopoverTrigger, Selection, SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

import { useAppSelector } from '@/redux/store'
import axios from 'axios'
import { DayCollect, DayTable, ReduxDayTable, ReduxMonthTable } from '@/interfaces/CollectMoney'
import useMoney from '@/lib/formatMoney'
import { addDayCollectForAll, addOrUpdateDayCollectForSelected, changeInput, changeSelectedService, saveDayToMonth, setDayTable } from '@/redux/features/main-slice'
import { capitalize } from '@/lib/capitalize'

const INITIAL_VISIBLE_COLUMNS = ["Ngày", "Dịch vụ", "Trạng thái", "Tiền phải thu", "Thu", "Còn lại"];

const monthTableColumns = [
  { name: "Ngày", uid: "Ngay", sortable: true },
  { name: "Dịch vụ", uid: "DichVu" },
  { name: "Trạng thái", uid: "TrangThai", sortable: true },
  { name: "Tiền phải thu", uid: "TienPhaiThu", sortable: true },
  { name: "Thu", uid: "Thu" },
  { name: "Còn lại", uid: "Con" },
  { name: "Dư", uid: "Du" },
]

const statusOptions = [
  { name: "Đã thu", uid: "Đã thu" },
  { name: "Nợ", uid: "Nợ" },
  { name: "Chưa thu", uid: "Chưa thu" },
];

type IProps = {
  kiosSelected: string
  monthSelected: string
  onClose: () => void;
}

const DayTableComponent: React.FC<IProps> = ({
  kiosSelected,
  monthSelected,
  onClose
}) => {
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(1);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(31);
  const [filterValue, setFilterValue] = React.useState<number>();
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "Ngay",
    direction: "ascending",
  });
  const [dayTableData, setDayTableData] = React.useState<ReduxDayTable[]>([]);

  const dayTable: ReduxDayTable[] = useAppSelector(state => state.mainReducer.day)
  const monthsData: ReduxMonthTable[] = useAppSelector(state => state.mainReducer.months)

  useEffect(() => {
    const monthIndex = monthsData.findIndex((item) => item.MaKios === kiosSelected && item.Thang === monthSelected);

    if (monthsData[monthIndex].DayData.length > 0) {
      setDayTableData(monthsData[monthIndex].DayData)
      setSelectedKeys(monthsData[monthIndex].selectedDays === "all" ? "all" : new Set(monthsData[monthIndex].selectedDays))
    } else {
      setDayTableData(dayTable)
    }
  }, [])

  useEffect(() => {
    setDayTableData(dayTable)
  }, [dayTable])

  const getDaysWithStatusDaThu = (data: ReduxDayTable[]) => {
    // Sử dụng phương thức `filter` để lọc các mục có TrangThai === 'Đã thu'
    const filteredDays = data.filter((day) => day.TrangThai === 'Đã thu');

    // Sau đó, lấy mảng Ngay từ các mục đã lọc
    const daysWithDaThuStatus = filteredDays.map((day) => day.Ngay.toString());

    return daysWithDaThuStatus;
  };

  React.useEffect(() => {
    if (dayTableData.length > 0) {
      if (selectedKeys === "all") {
        dispatch(addDayCollectForAll(dayTableData))
      } else {
        const days = Array.from(selectedKeys)
        dispatch(addOrUpdateDayCollectForSelected({
          selectedDays: days as string[],
          data: dayTableData
        }))
      }
    }
  }, [Array.from(selectedKeys).length, dayTableData.length])

  const columns = monthTableColumns
  const pages = Math.ceil(dayTableData.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredDay = [...dayTableData];

    if (hasSearchFilter) {
      filteredDay = filteredDay.filter((destination) =>
        // destination?.Ngay.includes(filterValue),
        destination?.Ngay === filterValue,
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredDay = filteredDay.filter((day) =>
        Array.from(statusFilter).includes(day.TrangThai),
      );
    }
    return filteredDay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayTableData, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: ReduxDayTable, b: ReduxDayTable) => {
      const first = a[sortDescriptor.column as keyof ReduxDayTable];
      const second = b[sortDescriptor.column as keyof ReduxDayTable];
      const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items, selectedKeys]);

  const renderCell = React.useCallback((day: ReduxDayTable, columnKey: React.Key): React.ReactNode => {
    const cellValue = day[columnKey as keyof ReduxDayTable];
    switch (columnKey) {
      case "Ngay":
        return (
          <div >
            <p className="font-semibold text-small capitalize">{day.Ngay}</p>
          </div>
        );
      case "DichVu":
        return (
          <div className='flex items-center gap-3'>
            <p className={`font-semibold text-small capitalize`}>
              {
                day.SelectedService.length > 0 ? (
                  day.SelectedService.map(service => (
                    <span key={service} className='px-1'>{service}</span>
                  ))
                ) : (
                  <span>Không có</span>
                )
              }
            </p>

            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button
                  isIconOnly
                  size='sm'
                  radius='full'
                  variant='ghost'
                  className='border-none'
                  isDisabled={day.TrangThai === "Đã thu"}
                >
                  <AiOutlineEdit />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='p-3'
              >
                <CheckboxGroup
                  label="Chọn dịch vụ"
                  color="success"
                  value={day.SelectedService}
                  onValueChange={(value) => dispatch(changeSelectedService({
                    Ngay: day.Ngay,
                    selectedService: value
                  }))}
                >
                  {
                    day.DichVu.length > 0 && day.DichVu.map((dv) => {
                      return (
                        <Checkbox
                          value={dv.TenDichVu}
                        >
                          {dv.TenDichVu}
                        </Checkbox>
                      )
                    })
                  }
                </CheckboxGroup>
              </PopoverContent>
            </Popover>
          </div>
        );
      case "TrangThai":
        return (
          <Chip className="font-semibold capitalize min-w-[50px] text-center" color={day.TrangThai === "Đã thu" ? "success" : day.TrangThai === "Nợ" ? "danger" : "secondary"} size="sm" variant="solid">
            {day.TrangThai}
          </Chip>
        );
      case "TienPhaiThu":
        return (
          <div >
            <p className="font-semibold text-small capitalize">{useMoney(day.TienPhaiThu)}</p>
          </div>
        );
      case "Thu":
        return (
          <div className='flex items-center gap-3'>
            <p className={`font-semibold text-small capitalize ${day.ThuDuoc > 0 && "text-success"}`}>
              {useMoney(day.ThuDuoc)}
            </p>

            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button
                  isIconOnly
                  size='sm'
                  radius='full'
                  variant='ghost'
                  className='border-none'
                  isDisabled={day.TrangThai === "Đã thu"}
                >
                  <AiOutlineEdit />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='p-3 min-w-[250px]'
              >
                <Input
                  isDisabled={day.TrangThai === "Đã thu"}
                  label="Số tiền thu được"
                  variant='bordered'
                  value={day.ThuDuoc.toString()}
                  type='number'
                  onChange={e => dispatch(changeInput({
                    Ngay: day.Ngay,
                    newValue: +e.target.value
                  }))}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      case "Con":
        return (
          <div >
            {/* TODO:Tiền còn lại */}
            <p className={`font-semibold text-small capitalize ${day.ConLai > 0 && "text-warning"}`}>{useMoney(day.ConLai)}</p>
          </div>
        );
      case "Du":
        return (
          <div >
            {/* TODO:Tiền còn lại */}
            <p className="font-semibold text-small capitalize">{useMoney(day.Du)}</p>
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

  const onSearchChange = React.useCallback((value?: number) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue(0);
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 items-end">
          <Input
            isClearable
            type='number'
            classNames={{
              base: "w-full",
              inputWrapper: "border-1",
            }}
            placeholder="Nhập ngày muốn tìm"
            size="sm"
            startContent={<AiOutlineSearch className="text-default-300" />}
            value={filterValue?.toString()}
            variant="bordered"
            onClear={() => setFilterValue(0)}
            onValueChange={value => onSearchChange(+value)}
          />

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<BsThreeDotsVertical className="text-small" />}
                  variant="flat"
                >
                  Trạng thái
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
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">{dayTableData.length} ngày</span>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    dayTableData.length,
    hasSearchFilter,
  ]);

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
      wrapper: ["max-h-[500px]", "max-w-full"],
      th: ["text-default-500", "border-b", "border-divider"],
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
      <Table
        isCompact
        // isStriped
        aria-label="Bảng ngày"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        color='default'
        isHeaderSticky
        sortDescriptor={sortDescriptor}
        disabledKeys={getDaysWithStatusDaThu(dayTableData)}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
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
        <TableBody emptyContent={"Không tìm thấy ngày thu"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.Ngay} >
              {(columnKey) => <TableCell>{
                renderCell(item, columnKey)
              }</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className='flex gap-3 w-full justify-end items-center'>
        <Button
          onPress={() => {
            onClose()
          }}
        >
          Đóng
        </Button>

        <Button
          color='success'
          onPress={() => {
            const days = Array.from(selectedKeys)
            dispatch(saveDayToMonth({
              day: dayTableData,
              month: monthSelected,
              kios: kiosSelected,
              selectedDays: days as string[]
            }))
            toast.success("Lưu dữ liệu thành công")
            onClose()
          }}
        >
          Lưu
        </Button>
      </div>
    </>
  )
}

export default React.memo(DayTableComponent)