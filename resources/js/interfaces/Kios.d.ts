type KiosStatus = "Đang trống" | "Đang hoạt động"

export type IKios = {
  SoLo: string,
  KhuVuc: string
  DienTich: number,
  Gia: number,
  TrangThai: KiosStatus
}