import React from 'react'
import { useDispatch } from "react-redux"
import toast from 'react-hot-toast'
import { AiOutlineSearch, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import { BiPlus } from "react-icons/bi"
import { Button, Input, Pagination, Popover, PopoverContent, PopoverTrigger, Selection, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'

import { useAppSelector } from '@/redux/store'
import axios from 'axios'
import { DayTable, MonthTable, ReduxMonthTable } from '@/interfaces/CollectMoney'
import useMoney from '@/lib/formatMoney'
import BigModal from '@/Components/Elememt/BigModal'
import DayTableComponent from './DayTable'
import { addMonthCollectForAll, addOrUpdateMonthCollectForSelected, changeMonthInput, saveMonth, setDayTable, setMonthTable } from '@/redux/features/main-slice'

const INITIAL_VISIBLE_COLUMNS = ["Kios", "Tháng", "Ngày", "Tiền phải thu", "Số tiền thu", "Còn lại"];

const fakeData: MonthTable[] = [
  {
    MaKios: "Kios1",
    Thang: "10/23",
    TienPhaiThu: 3000000
  },
  {
    MaKios: "Kios1",
    Thang: "11/23",
    TienPhaiThu: 3000000
  },
  {
    MaKios: "Kios2",
    Thang: "11/23",
    TienPhaiThu: 3000000
  }
]

const dayData: DayTable = {
  Kios: "Kios1",
  Thang: "11/2023",
  Data: [
    {
      "Ngay": 1,
      "TrangThai": 'Đã thu',
      "DaThu": 86703,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 65344
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 13726
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 7633
        }
      ]
    },
    {
      "Ngay": 2,
      "TrangThai": 'Đã thu',
      "DaThu": 86567,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 65127
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 14482
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 6958
        }
      ]
    },
    {
      "Ngay": 3,
      "TrangThai": 'Đã thu',
      "DaThu": 86567,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 68716
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 11543
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 8280
        }
      ]
    },
    {
      "Ngay": 4,
      "TrangThai": 'Đã thu',
      "DaThu": 88539,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 52364
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 14907
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 9432
        }
      ]
    },
    {
      "Ngay": 5,
      "TrangThai": 'Đã thu',
      "DaThu": 100000,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 68812
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12564
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 7371
        }
      ]
    },
    {
      "Ngay": 6,
      "TrangThai": 'Nợ',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 59903
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12819
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 5674
        }
      ]
    },
    {
      "Ngay": 7,
      "TrangThai": 'Nợ',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 62842
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12460
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 7895
        }
      ]
    },
    {
      "Ngay": 8,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 67689
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12746
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 8112
        }
      ]
    },
    {
      "Ngay": 9,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 57471
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 11935
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 6579
        }
      ]
    },
    {
      "Ngay": 10,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 68897
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 13164
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 8326
        }
      ]
    },
    {
      "Ngay": 11,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 53584
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 14688
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 6991
        }
      ]
    },
    {
      "Ngay": 12,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 61609
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 11623
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 8477
        }
      ]
    },
    {
      "Ngay": 13,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 63587
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12884
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 7305
        }
      ]
    },
    {
      "Ngay": 14,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 56015
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 14420
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 9445
        }
      ]
    },
    {
      "Ngay": 15,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 56415
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 13564
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 8080
        }
      ]
    },
    {
      "Ngay": 16,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 64126
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12047
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 9023
        }
      ]
    },
    {
      "Ngay": 17,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 62546
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12301
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 6420
        }
      ]
    },
    {
      "Ngay": 18,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 56422
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 13291
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 9669
        }
      ]
    },
    {
      "Ngay": 19,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 61728
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 10495
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 5272
        }
      ]
    },
    {
      "Ngay": 20,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 58074
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 14182
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 8285
        }
      ]
    },
    {
      "Ngay": 21,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 66379
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 13485
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 5988
        }
      ]
    },
    {
      "Ngay": 22,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 64235
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 13570
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 6929
        }
      ]
    },
    {
      "Ngay": 23,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 56127
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 13629
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 9826
        }
      ]
    },
    {
      "Ngay": 24,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 65348
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 11582
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 7654
        }
      ]
    },
    {
      "Ngay": 25,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 66492
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12658
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 6732
        }
      ]
    },
    {
      "Ngay": 26,
      "TrangThai": 'Chưa thu',
      "DaThu": 0,
      "DichVu": [
        {
          "TenDichVu": "Mặt bằng",
          "Tien": 67092
        },
        {
          "TenDichVu": "Bảo vệ",
          "Tien": 12794
        },
        {
          "TenDichVu": "Vệ sinh",
          "Tien": 8514
        }
      ]
    }
  ]
}

const monthTableColumns = [
  { name: "Kios", uid: "MaKios", sortable: true },
  { name: "Tháng", uid: "Thang", sortable: true },
  { name: "Ngày", uid: "Ngay" },
  { name: "Tiền phải thu", uid: "TienPhaiThu", sortable: true },
  { name: "Số tiền thu", uid: "SoTienThu" },
  { name: "Còn lại", uid: "ConLai" },
]

type IProps = {
  MaKhachHang: string
  onClose: () => void
}

const MonthTableComponent: React.FC<IProps> = ({ MaKhachHang, onClose }) => {
  const dispatch = useDispatch()
  const { isOpen: isOpenDayTable, onOpen: onOpenDayTable, onOpenChange: onOpenChangeDayTable, onClose: onCloseDayTable } = useDisclosure();
  const [page, setPage] = React.useState(1);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10); const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "Thang",
    direction: "ascending",
  });
  const [kiosSelected, setKiosSelected] = React.useState("")
  const [monthSelected, setMonthSelected] = React.useState("")

  React.useEffect(() => {
    const fetchApi = async () => {
      // const res = await axios()
      // if (res.status === 200) {
      // } else {
      //   toast.error(res.message)
      // }
      dispatch(setMonthTable(fakeData))
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const monthTableData: ReduxMonthTable[] = useAppSelector(state => state.mainReducer.months)
  const columns = monthTableColumns
  const pages = Math.ceil(monthTableData.length / rowsPerPage);

  React.useEffect(() => {
    if (monthTableData.length > 0) {
      if (selectedKeys === "all") {
        dispatch(addMonthCollectForAll())
      }
      else {
        const months = Array.from(selectedKeys)
        dispatch(addOrUpdateMonthCollectForSelected({
          selectedMonths: months as string[]
        }))
      }
    }
  }, [selectedKeys, monthTableData.length])

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredMonths = [...monthTableData];

    if (hasSearchFilter) {
      filteredMonths = filteredMonths.filter((month) =>
        month?.MaKios.includes(filterValue),
      );
    }
    return filteredMonths;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthTableData, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: ReduxMonthTable, b: ReduxMonthTable) => {
      const first = a[sortDescriptor.column as keyof ReduxMonthTable];
      const second = b[sortDescriptor.column as keyof ReduxMonthTable];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleDayDetail = async (kios: string, month: string) => {
    // const data = await axios.get()
    setKiosSelected(kios)
    setMonthSelected(month)
    dispatch(setDayTable(dayData))
    onOpenDayTable()
  }

  const renderCell = React.useCallback((month: ReduxMonthTable, columnKey: React.Key): React.ReactNode => {
    const cellValue = month[columnKey as keyof ReduxMonthTable];
    switch (columnKey) {
      case "MaKios":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{month.MaKios}</p>
          </div>
        );
      case "Thang":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{month.Thang}</p>
          </div>
        );
      case "Ngay":
        return (
          <Button
            variant='ghost'
            isIconOnly
            radius='full'
            onPress={() => handleDayDetail(month.MaKios, month.Thang)}
          >
            <BiPlus className="text-xl" />
          </Button>
        );
      case "TienPhaiThu":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{useMoney(month.TienPhaiThu)}</p>
          </div>
        );
      case "SoTienThu":
        return (
          <div className='flex items-center gap-3'>
            <p className={`font-semibold text-small capitalize ${month.SoTienThu > 0 && "text-success"}`}>
              {useMoney(month.SoTienThu)}
            </p>

            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button
                  isIconOnly
                  size='sm'
                  radius='full'
                  variant='ghost'
                  className='border-none'
                >
                  <AiOutlineEdit />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='p-3 min-w-[250px]'
              >
                <Input
                  label="Số tiền thu được"
                  variant='bordered'
                  value={month.SoTienThu.toString()}
                  type='number'
                  onChange={e => dispatch(changeMonthInput({
                    Month: `${month.MaKios}@${month.Thang}`,
                    newValue: +e.target.value
                  }))}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      case "ConLai":
        return (
          <div>
            <p className="font-semibold text-small capitalize">{useMoney(month.ConLai)}</p>
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
          <Input
            isClearable
            classNames={{
              base: "w-full",
              inputWrapper: "border-1",
            }}
            placeholder="Nhập tên địa điểm muốn tìm"
            size="sm"
            startContent={<AiOutlineSearch className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Hiện có {monthTableData.length} Kios cần thu</span>
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
    monthTableData.length,
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

  const handleSave = () => {
    const months = Array.from(selectedKeys)
    dispatch(saveMonth({
      selectedMonths: months as string[]
    }))
    const result = useAppSelector(state => state.mainReducer.finalCollect)
    console.log(result)
    toast.success("Thu thành công")
    onClose()
  }

  return (
    <>
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
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
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
        <TableBody emptyContent={"Không tìm thấy địa điểm"} items={sortedItems}>
          {(item) => (
            <TableRow key={`${item.MaKios}@${item.Thang}`} >
              {(columnKey) => <TableCell>{
                renderCell(item, columnKey)
              }</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className='w-full flex items-center justify-end gap-3'>
        <Button
          onPress={() => onClose()}
        >
          Đóng
        </Button>
        <Button
          color='success'
          onPress={handleSave}
        >
          Lưu
        </Button>
      </div>

      {
        isOpenDayTable && (
          <BigModal
            isOpen={isOpenDayTable}
            onClose={onCloseDayTable}
            onOpenChange={onOpenChangeDayTable}
            height='!h-[95%]'
            title={`Danh sách ${monthSelected} - ${kiosSelected}`}
          >
            <DayTableComponent
              kiosSelected={kiosSelected}
              monthSelected={monthSelected}
              onClose={onCloseDayTable}
            />
          </BigModal>
        )
      }
    </>
  )
}

export default MonthTableComponent