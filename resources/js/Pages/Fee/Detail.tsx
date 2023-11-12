import React from 'react'
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'

import useMoney from '@/lib/formatMoney'
import { setCollectMoneyDetail } from '@/redux/features/collect-money-detail-slice'
import { useAppSelector } from '@/redux/store'
import { ThuNo } from '@/interfaces/CollectMoney'
import { Accordion, AccordionItem, Button, Checkbox, CheckboxGroup, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  MaKhachHang: string
}

const Detail: React.FC<IProps> = ({ isOpen, onClose, onOpenChange, MaKhachHang }) => {
  const dispatch = useDispatch()
  const [tongTien, setTongTien] = React.useState<number>(0)
  const [thuNgay, setThuNgay] = React.useState<string[]>([]);
  const [thuNo, setThuNo] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`http://localhost:8000/api/thongtinkhachhang/${MaKhachHang}`)
      if (res.status === 200) {
        dispatch(setCollectMoneyDetail(res.data))
      }
    }
    fetchApi()
  }, [isOpen])

  const PaymentSchema = z.object({
    SoTienThuDuoc: z.number().refine((value) => value >= 0, {
      message: 'Vui lòng cung cấp số tiền thu được hợp lệ.',
    }),
    NoKyQuy: z.number().refine((value) => value >= 0, {
      message: 'Vui lòng cung cấp số tiền thu được hợp lệ.',
    }).optional(),
    NoThangTruoc: z.number().refine((value) => value >= 0, {
      message: 'Vui lòng cung cấp số tiền thu được hợp lệ.',
    }).optional(),
    NgayThanhToan: z.array(z.string()).refine((value) => value.length > 0, {
      message: 'Vui lòng chọn ít nhất một ngày trả.',
    }),
  });

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
  })

  function onSubmit(data: z.infer<typeof PaymentSchema>) {
    console.log(data)
  }

  console.log(thuNgay)
  console.log(thuNo)

  const items: ThuNo | null = useAppSelector(state => state.collectMoneyDetailReducer.value)


  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      size="5xl"
      placement="bottom"
      backdrop="blur"
      isKeyboardDismissDisabled
      classNames={{
        base: "!max-w-[98%] !h-[95%] mx-2 !mb-0 !absolute !bottom-0 !rounded-b-none !overflow-auto"
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          },
          exit: {
            y: 20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        }
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Thu phí ngày
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                {
                  items && items.KhuVuc.Kios && items.KhuVuc.Kios.length > 0 && (
                    <CheckboxGroup
                      label="Chọn kios thu"
                      color="primary"
                      value={thuNgay}
                      onValueChange={setThuNgay}
                    >
                      {
                        items.KhuVuc.Kios.map((kios, index) => {
                          return (
                            <Checkbox key={kios.MaThu} value={kios.MaThu}>{kios.ThuNgay.MatBang}</Checkbox>
                          )
                        })
                      }
                    </CheckboxGroup>
                  )
                }

                {

                  items && items?.KhuVuc?.CongNo && items?.KhuVuc?.CongNo.length > 0 && <Accordion
                    variant="splitted"
                    selectionMode="multiple"
                  >
                    {
                      items?.KhuVuc?.CongNo.map((no, index) => {
                        return (
                          <AccordionItem
                            key={no.Ngay}
                            aria-label={`Nợ ngày ${no.Ngay}`}
                            title={`Nợ ngày ${no.Ngay}`}
                          >
                            <CheckboxGroup
                              label="Chọn kios thu nợ"
                              color="primary"
                              value={thuNo}
                              onValueChange={setThuNo}
                              isInvalid={!!errors.NgayThanhToan}
                              errorMessage={errors.NgayThanhToan?.message}
                            >
                              {
                                no.ChiTiet && no.ChiTiet.length > 0 && no.ChiTiet.map((chitiet, index) => {
                                  return (
                                    <Checkbox key={chitiet.MaNo} value={chitiet.MaNo}>{chitiet.TienNo.MatBang}</Checkbox>
                                  )
                                })
                              }

                            </CheckboxGroup>
                          </AccordionItem>
                        )
                      })
                    }
                  </Accordion>
                }

                <Input
                  isRequired
                  type="number"
                  label="Số tiền thu được"
                  placeholder="Nhập số tiền thu được"
                  {...register("SoTienThuDuoc")}
                  isInvalid={!!errors.SoTienThuDuoc}
                  errorMessage={errors.SoTienThuDuoc?.message}
                />

                {
                  items && items.KhuVuc && items.KhuVuc.NoKyQuy && (
                    <Input
                      type="number"
                      label="Nợ ký quỷ"
                      placeholder="Nhập nợ ký quỷ"
                      {...register("NoKyQuy")}
                      isInvalid={!!errors.NoKyQuy}
                      errorMessage={errors.NoKyQuy?.message}
                    />
                  )
                }

                {
                  items && items.KhuVuc && items.KhuVuc.NoThangTruoc && (
                    <Input
                      type="number"
                      label="Nợ tháng trước"
                      placeholder="Nhập nợ tháng trước"
                      {...register("NoThangTruoc")}
                      isInvalid={!!errors.NoThangTruoc}
                      errorMessage={errors.NoThangTruoc?.message}
                    />
                  )
                }

                <div className='flex flex-row justify-end gap-3'>
                  <Button variant={"bordered"} className='min-w-[120px]' onClick={() => onClose()}>Đóng</Button>
                  <Button type="submit" color='success'>Thu</Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default Detail