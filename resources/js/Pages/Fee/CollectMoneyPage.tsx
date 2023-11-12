import React from 'react'
import axios from 'axios'
import { IoIosArrowBack } from "react-icons/io"
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { PiPhoneCallBold } from "react-icons/pi"
import { LiaIdCardSolid } from "react-icons/lia"
import { BiSquareRounded, BiUser } from "react-icons/bi"

import MainLayout from '@/Layouts/MainLayout'
import { formatDate } from '@/lib/formatDate'
import { setCollectMoney } from '@/redux/features/collect-money-slice'
import { useAppSelector } from '@/redux/store'
import { Button, Card, CardBody, CardHeader, Divider, Input, Link, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import BigModal from '@/Components/Elememt/BigModal'
import MonthTableComponent from './MonthTable'

export default function CollectMoneyPage() {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [userSelected, setUserSelected] = React.useState<string>("")
  const currentDate = new Date

  React.useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get("http://localhost:8000/api/danhsachkhachhang")
      if (res.status === 200) {
        dispatch(setCollectMoney(res.data))
      }
    }
    fetchApi()
  }, [])

  const data = useAppSelector(state => state.collectMoneyReducer.value)

  return (
    <>
      <MainLayout>
        <div
          className='flex flex-col gap-4'
        >
          <div className='flex gap-3 items-center'>
            <Link
              href='/'
            >

              <Button
                isIconOnly
                radius='lg'
              >
                <IoIosArrowBack />
              </Button>
            </Link>

            <h2
              className='text-2xl font-semibold'
            >
              {`Danh sách thu ngày ${formatDate(currentDate.toISOString())}`}
            </h2>
          </div>

          <div className='flex flex-row gap-3 justify-between items-center w-full'>
            <Input placeholder='Nhập tên khách hàng, SĐT, CCCD' />

            <Select
              label="Chọn khu vực"
              placeholder="Chọn khu vực"
              className="max-w-xs"
              defaultSelectedKeys={["all"]}
            >
              <SelectItem key={"all"} value={"all"}>
                Tất cả
              </SelectItem>
              <SelectItem key={"Khu A"} value={"Khu A"}>
                Khu A
              </SelectItem>
              <SelectItem key={"Khu B"} value={"Khu B"}>
                Khu B
              </SelectItem>
            </Select>
          </div>

          <div
            className='grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          >
            {
              data && data.length > 0 ? data.map((item, index) => {
                return (
                  <motion.div
                    key={item.MaKhachHang}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3, delay: index / 10 }}
                  >
                    <Card
                      isPressable
                      onPress={() => {
                        setUserSelected(item.MaKhachHang)
                        onOpen()
                      }}
                      className='w-full'
                    >
                      <CardHeader>
                        <div className='flex flex-row items-center justify-between w-full'>
                          <h3 className='text-xl font-semibold'>
                            {item.HoTen}
                          </h3>

                          {/* <Chip color="primary">
                            {useMoney(item.TienNgay || 0)}
                          </Chip> */}
                        </div>
                      </CardHeader>
                      <Divider />
                      <CardBody>
                        <p className='flex flex-row items-center gap-3'>
                          <span className='font-semibold flex gap-1 items-center'>
                            <BiUser />
                            Mã khách hàng:
                          </span>
                          <span>
                            {item.MaKhachHang}
                          </span>
                        </p>

                        <p className='flex flex-row items-center gap-3'>
                          <span className='font-semibold flex gap-1 items-center'>
                            <PiPhoneCallBold /> Số điện thoại:
                          </span>
                          <span>
                            {/* {item.KhuVuc.TenKhuVuc} */}
                            0934248312
                          </span>
                        </p>

                        <p className='flex flex-row items-center gap-3'>
                          <span className='font-semibold flex gap-1 items-center'>
                            <LiaIdCardSolid />
                            CMND/CCCD:
                          </span>
                          <span>
                            {/* {item.KhuVuc.TenKhuVuc} */}
                            31234124124124
                          </span>
                        </p>

                        <p className='flex flex-row items-center gap-3'>
                          <span className='font-semibold flex gap-1 items-center'>
                            <BiSquareRounded />
                            Khu vực:
                          </span>
                          <span>
                            {item.KhuVuc.TenKhuVuc}
                          </span>
                        </p>

                        {/* {
                          item.KhuVuc.Kios.length > 0 && item.KhuVuc.Kios.map((kiosItem) => {
                            return (
                              <div key={kiosItem.MaKios} className='flex gap-3'>
                                <span className='flex flex-row items-center gap-3'>
                                  <span className='font-semibold'>
                                    Mã kios:
                                  </span>
                                  <span>
                                    {kiosItem.MaKios}
                                  </span>
                                </span>

                                <span className='flex flex-row items-center gap-3'>
                                  <span className='font-semibold'>
                                    Ngành hàng:
                                  </span>
                                  <span>
                                    {kiosItem.NganhHang}
                                  </span>
                                </span>
                              </div>
                            )
                          })
                        } */}
                      </CardBody>
                    </Card>

                  </motion.div>
                )
              }) : (
                <p>Không có danh sách thu</p>
              )
            }
          </div>
        </div>
      </MainLayout>

      {isOpen && (
        <BigModal
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        >
          <MonthTableComponent MaKhachHang={userSelected} />
        </BigModal>
        // <Detail isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} MaKhachHang={userSelected} />
      )}
    </>
  )
}
