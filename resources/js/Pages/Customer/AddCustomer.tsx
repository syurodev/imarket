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
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Textarea } from '@/Components/ui/textarea'
import { pushCustomer } from '@/redux/features/customers-slice'
import { DialogClose } from '@/Components/ui/dialog'

const AddCustomerForm: React.FC = () => {
  const dispatch = useDispatch()

  const CustomerSchema = z.object({
    MaKhachHang: z.string({ required_error: "Vui lòng nhập mã khách hàng." }),
    LoaiKhachHang: z.string({ required_error: "Vui lòng chọn loại khách hàng." }),
    HoTen: z.string({ required_error: "Vui lòng nhập tên khách hàng." }),
    MaSoThue: z.coerce.number().optional(),
    DiaChi: z.string({ required_error: "Vui lòng nhập địa chỉ liên hệ." }),
    DiaChiDKKD: z.string().optional(),
    Email: z.string().optional(),
    DienThoaiLienHe: z.coerce.number().optional(),
    DienThoaiSMS: z.coerce.number().optional(),
    LoaiGiayTo: z.string({ required_error: "Vui lòng chọn loại giấy tờ." }),
    SoGiayTo: z.coerce.number().min(1, "Vui lòng nhập số giấy tờ"),
    NgayCapGiayTo: z.string({ required_error: "Vui lòng chọn ngày cấp giấy tờ" }),
    NoiCap: z.string().min(1, { message: "Vui lòng nhập nơi cấp giấy tờ" }),
    GioiTinh: z.string({ required_error: "Vui lòng chọn giới tính" }),
    NgaySinh: z.string({ required_error: "Vui lòng chọn ngày sinh" }),
    DanToc: z.string().optional(),
    DiaChiHoaDon: z.string().optional(),
    HinhThucThanhToan: z.string().optional(),
    GhiChu: z.string().optional(),
  });


  const form = useForm<z.infer<typeof CustomerSchema>>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      LoaiKhachHang: "Cá nhân",
      Email: "",
      DanToc: "Kinh",
      GhiChu: "",
      LoaiGiayTo: "CMND/CCCD"
    },
  })

  function onSubmit(data: z.infer<typeof CustomerSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    dispatch(pushCustomer({
      HoTen: data.HoTen,
      KhuVuc: "",
      Kios: []
    }))
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          <div className='flex flex-col md:flex-row gap-3 items-baseline w-full'>
            <div className='flex flex-col gap-3 w-full'>
              {/* Mã khách hàng */}
              <FormField
                control={form.control}
                name="MaKhachHang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mã khách hàng
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tên khách hàng */}
              <FormField
                control={form.control}
                name="HoTen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tên khách hàng
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ngày sinh */}
              <FormField
                control={form.control}
                name="NgaySinh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ngày sinh
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='date'
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Loại khách hàng */}
              <FormField
                control={form.control}
                name="LoaiKhachHang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại khách hàng</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại khách hàng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cá nhân">Cá nhân</SelectItem>
                        <SelectItem value="Doanh nghiệp">Doanh nghiệp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mã số thuế */}
              <FormField
                control={form.control}
                name="MaSoThue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mã số thuế
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Địa chỉ liên hệ */}
              <FormField
                control={form.control}
                name="DiaChi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Địa chỉ liên hệ
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Địa chỉ ĐKKD */}
              <FormField
                control={form.control}
                name="DiaChiDKKD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Địa chỉ ĐKKD
                      {/* <span className='text-rose-500'>*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                      {/* <span className='text-rose-500'>*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Điện thoại liên hệ */}
              <FormField
                control={form.control}
                name="DienThoaiLienHe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Điện thoại liên hệ
                      {/* <span className='text-rose-500'>*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Điện thoại SMS */}
              <FormField
                control={form.control}
                name="DienThoaiSMS"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Điện thoại SMS
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col gap-3 w-full'>
              {/* Loại giấy tờ */}
              <FormField
                control={form.control}
                name="LoaiGiayTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Loại giấy tờ
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại giấy tờ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CMND/CCCD">CMND/CCCD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Số giấy tờ */}
              <FormField
                control={form.control}
                name="SoGiayTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Số giấy tờ
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ngày cấp giấy tờ */}
              <FormField
                control={form.control}
                name="NgayCapGiayTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ngày cấp giấy tờ
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='date'
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nơi cấp giấy tờ */}
              <FormField
                control={form.control}
                name="NoiCap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nơi cấp giấy tờ
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Giới tính */}
              <FormField
                control={form.control}
                name="GioiTinh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Giới tính
                      <span className='text-rose-500'>*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                        <SelectItem value="Khác">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dân tộc */}
              <FormField
                control={form.control}
                name="DanToc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Dân tộc
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Địa chỉ hoá đơn */}
              <FormField
                control={form.control}
                name="DiaChiHoaDon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Địa chỉ hoá đơn
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hình thức thanh toán */}
              <FormField
                control={form.control}
                name="HinhThucThanhToan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Hình thức thanh toán
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hình thức thanh toán" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                        <SelectItem value="Thanh toán">Thanh toán</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="GhiChu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập ghi chú khách hàng"
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

          <div className='flex flex-row justify-end gap-3'>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Đóng
              </Button>
            </DialogClose>
            <Button type="submit" className='min-w-[120px]'>Thêm</Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default AddCustomerForm