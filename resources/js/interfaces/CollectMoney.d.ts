export type CollectMoney = {
  MaKhachHang: string,
  HoTen: string,
  TienNgay: number,
  KhuVuc: {
    Kios: {
      MaKios: string,
      NganhHang: string
    }[]
    MaKhuVuc: string
    TenKhuVuc: string
  },
  MaHopDong: string,
}

type NguonThu = {
  MatBang: number;
  BV: number;
  VS: number;
}

type ThuNo = {
  MaKhachHang: string;
  HoTen: string;
  KhuVuc: {
    MaKhuVuc: string;
    TenKhuVuc: string;
    NoKyQuy?: number;
    NoThangTruoc?: number;
    Kios: {
      MaKios: string;
      NganhHang: string;
      MaThu: string;
      ThuNgay: NguonThu;
    }[];
    CongNo?: {
      Ngay: string,
      ChiTiet: {
        MaKios: string;
        MaNo: string;
        TienNo: NguonThu;
      }[]
    }[];
  };
};

type IFeeTable = {}

type MonthTable = {
  MaKios: string;
  Thang: string;
  TienPhaiThu: number;
}

type ReduxMonthTable = {
  MaKios: string;
  Thang: string;
  TienPhaiThu: number;
  SoTienThu: number;
  ConLai: number;
  DayData: ReduxDayTable[]
  selectedDays: string[] | "all";
}

type DayTable = {
  Kios: string;
  Thang: string;
  Data: {
    Ngay: number;
    TrangThai: "Đã thu" | "Nợ" | "Chưa thu"
    DaThu: number
    DichVu: {
      TenDichVu: string,
      Tien: number
    }[]
  }[]
}

type ReduxDayTable = {
  Ngay: number;
  TienPhaiThu: number;
  TrangThai: "Đã thu" | "Nợ" | "Chưa thu";
  ThuDuoc: number;
  ConLai: number;
  Du: number;
  DichVu: {
    TenDichVu: string;
    Tien: number;
  }[];
  SelectedService: string[]
}

type FinalCollect = {
  MaKios: string,
  Thang: string,
  TongThu: number,
}

type DayCollect = {
  Ngay: number,
  TongThu: number
  SelectedService: string[]
}