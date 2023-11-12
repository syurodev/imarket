import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { toast } from '@/Components/ui/use-toast'
import { useDispatch } from 'react-redux'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"
import Checkbox from '@/Components/Checkbox'
import useMoney from '@/lib/formatMoney'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Textarea } from '@/Components/ui/textarea'
import { pushKios } from '@/redux/features/kios-slice'
import { KiosStatus } from '@/interfaces/Kios'
import { DialogClose } from '@/Components/ui/dialog'

const items = [
  {
    id: "1",
    date: "01/11/2023",
    MatBang: 60000,
    BV: 10000,
    VS: 10000
  },
] as const
const congNo = [
  {
    MaNo: 1,
    NgayNo: '2023-10-31',
    TienNo: 62500
  },
  {
    MaNo: 2,
    NgayNo: '2023-10-30',
    TienNo: 62500
  },
  {
    MaNo: 3,
    NgayNo: '2023-10-29',
    TienNo: 62500
  },
] as const

const AddKiosForm: React.FC = () => {
  const dispatch = useDispatch()


  const KiosSchema = z.object({
    soLo: z.string().min(1, { message: "Vui lòng nhập số lô." }),
    tienThueHangThang: z.coerce.number().min(0, { message: "Tiền thuê hàng tháng phải lớn hơn hoặc bằng 0." }),
    cho: z.string(),
    khuVuc: z.string(),
    maLoDayDu: z.string(),
    trangThaiMatBang: z.string(),
    quyCach: z.string(),
    dienTich: z.coerce.number(),
    chieuSau: z.coerce.number(),
    matTien: z.coerce.number(),
    loaiMatBang: z.string().min(1, { message: "Vui lòng chọn loại mặt bằng" }),
    tienMatBang: z.coerce.number(),
    tienVeSinh: z.coerce.number(),
    tienBaoVe: z.coerce.number(),
    ghiChu: z.string(),
  });


  const form = useForm<z.infer<typeof KiosSchema>>({
    resolver: zodResolver(KiosSchema),
    defaultValues: {
      soLo: "",
      cho: "",
      khuVuc: "",
      maLoDayDu: "",
      trangThaiMatBang: "Đang trống",
      quyCach: "",
      dienTich: 0,
      chieuSau: 0,
      matTien: 0,
      loaiMatBang: "",
      tienMatBang: 0,
      tienVeSinh: 0,
      tienBaoVe: 0,
      ghiChu: "",
    },
  })

  function onSubmit(data: z.infer<typeof KiosSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    dispatch(pushKios({
      SoLo: data.soLo,
      KhuVuc: data.khuVuc,
      DienTich: data.dienTich,
      Gia: data.matTien,
      TrangThai: data.trangThaiMatBang as KiosStatus,
    }))
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3' >
          <div className='flex flex-col md:flex-row gap-3 items-baseline'>
            <div className='flex flex-col gap-3 w-full'>
              {/* Chợ */}
              <FormField
                control={form.control}
                name="cho"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chợ</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn chợ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Chợ 1">Chợ 1</SelectItem>
                        <SelectItem value="Chợ 2">Chợ 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Số lô */}
              <FormField
                control={form.control}
                name="soLo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Số lô
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Khu vực */}
              <FormField
                control={form.control}
                name="khuVuc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khu vực</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn khu vực" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Khu vực A">Khu vực A</SelectItem>
                        <SelectItem value="Khu vực B">Khu vực B</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Số lô đầy đủ */}
              <FormField
                control={form.control}
                name="maLoDayDu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mã lô đầy đủ
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Trạng thái mặt bằng */}
              <FormField
                control={form.control}
                name="trangThaiMatBang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái mặt bằng</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái mặt bằng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Đang trống">Đang trống</SelectItem>
                        <SelectItem value="Đang hoạt động">Đang hoạt động</SelectItem>
                        <SelectItem value="Đang tạm ngưng">Đang tạm ngưng</SelectItem>
                        <SelectItem value="Đang sửa chữa">Đang sửa chữa</SelectItem>
                        <SelectItem value="Đang giữ chổ">Đang giữ chổ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quy cách */}
              <FormField
                control={form.control}
                name="quyCach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quy cách
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Diện tích */}
              <FormField
                control={form.control}
                name="dienTich"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Diện tích
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Chiều sâu */}
              <FormField
                control={form.control}
                name="chieuSau"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Chiều sâu
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Mặt tiền */}
              <FormField
                control={form.control}
                name="matTien"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mặt tiền
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col gap-3 w-full'>
              {/* Loại mặt bằng */}
              <FormField
                control={form.control}
                name="loaiMatBang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex'>
                      Loại mặt bằng
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại mặt bằng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cố định">Cố định</SelectItem>
                        <SelectItem value="Hàng rong">Hàng rong</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tiền thuê hằng tháng */}
              <FormField
                control={form.control}
                name="tienThueHangThang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex justify-between items-center'>
                      <div>
                        <span>
                          Tiền thuê hằng tháng
                        </span>
                        <span className='text-rose-500'>*</span>
                      </div>
                      <span
                        className='text-moneyColor font-semibold'
                      >
                        {useMoney(+form.control._formValues.tienThueHangThang || 0)}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Tiền mặt bằng */}
              <FormField
                control={form.control}
                name="tienMatBang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex justify-between items-center'>
                      Tiền mặt bằng
                      <span
                        className='text-moneyColor font-semibold'
                      >
                        {useMoney(+form.control._formValues.tienMatBang || 0)}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Tiền vệ sinh */}
              <FormField
                control={form.control}
                name="tienVeSinh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex justify-between items-center'>
                      Tiền vệ sinh
                      <span
                        className='text-moneyColor font-semibold'
                      >
                        {useMoney(+form.control._formValues.tienVeSinh || 0)}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Tiền bảo vệ đêm */}
              <FormField
                control={form.control}
                name="tienBaoVe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex justify-between items-center'>
                      Tiền bảo vệ đêm
                      <span
                        className='text-moneyColor font-semibold'
                      >
                        {useMoney(+form.control._formValues.tienBaoVe || 0)}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ghiChu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập ghi chú mặt bằng"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex flex-row justify-end items-center gap-3'>
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Đóng
              </Button>
            </DialogClose>
            <Button type="submit" className='min-w-[120px] '>Thêm</Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default AddKiosForm