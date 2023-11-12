import { DayCollect, DayTable, FinalCollect, MonthTable, ReduxDayTable, ReduxMonthTable } from "@/interfaces/CollectMoney"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  months: ReduxMonthTable[];
  day: ReduxDayTable[]
  dayCollect: DayCollect[]
  finalCollect: FinalCollect[]
}

const initialState: InitialState = {
  months: [],
  day: [],
  dayCollect: [],
  finalCollect: [],
}

const ConLai = function (TrangThai: string, DaThu: number, TienPhaiThu: number) {
  if (TrangThai === "Đã thu") {
    if (DaThu >= TienPhaiThu) {
      return 0
    } else {
      return TienPhaiThu - DaThu
    }
  } else {
    return 0
  }
}

const Du = function (TrangThai: string, DaThu: number, TienPhaiThu: number) {
  if (TrangThai === "Đã thu") {
    if (DaThu >= TienPhaiThu) {
      return DaThu - TienPhaiThu
    } else {
      return 0
    }
  } else {
    return 0
  }
}

export const main = createSlice({
  name: "main",
  initialState,
  reducers: {
    setMonthTable: (state, action: PayloadAction<MonthTable[]>) => {
      const data = action.payload
      if (data.length > 0) {
        state.months = data.map(item => {
          return {
            MaKios: item.MaKios,
            Thang: item.Thang,
            SoTienThu: item.TienPhaiThu,
            ConLai: 0,
            TienPhaiThu: item.TienPhaiThu,
            DayData: [],
            selectedDays: [],
          }
        })
      }
    },

    setDayTable: (state, action: PayloadAction<DayTable>) => {
      // Chuyển đổi dữ liệu từ DayTable sang ReduxDayTable
      const reduxDayTableData = action.payload.Data.map((dayData) => {
        const TienPhaiThu = dayData.DichVu.reduce((total, dv) => total + dv.Tien, 0);

        // Lấy danh sách tất cả các TenDichVu trong DichVu
        const allSelectedServices = dayData.DichVu.map((dv) => dv.TenDichVu);

        return {
          Ngay: dayData.Ngay,
          TienPhaiThu: TienPhaiThu,
          ThuDuoc: dayData.TrangThai === "Đã thu" ? dayData.DaThu : 0,
          ConLai: ConLai(dayData.TrangThai, dayData.TrangThai === "Đã thu" ? dayData.DaThu : 0, TienPhaiThu),
          Du: Du(dayData.TrangThai, dayData.TrangThai === "Đã thu" ? dayData.DaThu : 0, TienPhaiThu),
          TrangThai: dayData.TrangThai,
          DichVu: dayData.DichVu,
          SelectedService: allSelectedServices,
        };
      });

      state.day = reduxDayTableData;
    },

    // Thêm DayCollect cho tất cả các ngày trong tháng
    addDayCollectForAll: (state, action: PayloadAction<ReduxDayTable[]>) => {
      const data = action.payload;

      // Lọc ra các Ngay có TrangThai khác "Đã thu"
      const nonPaidDays = data.filter((dayData) => dayData.TrangThai !== "Đã thu");

      // Lặp qua các Ngay có TrangThai khác "Đã thu" và thêm vào state.dayCollect
      nonPaidDays.forEach((dayData) => {
        const selectedService =
          dayData.DichVu && dayData.DichVu.length > 0
            ? dayData.DichVu.map((dv) => dv.TenDichVu)
            : [];

        const dayCollectItem = {
          Ngay: dayData.Ngay,
          TongThu: dayData.TienPhaiThu,
          SelectedService: selectedService,
        };

        // Kiểm tra xem DayCollect đã tồn tại cho Ngay này chưa
        const existingDayCollect = state.dayCollect.find((item) => item.Ngay === dayCollectItem.Ngay);

        if (!existingDayCollect) {
          // Nếu chưa tồn tại, thêm mới
          state.dayCollect.push(dayCollectItem);
        }
      });

      // Cập nhật ThuDuoc, ConLai, và Du trong state.day dựa trên state.dayCollect
      state.day.forEach((day) => {
        if (day.TrangThai !== "Đã thu") {
          // Nếu `TrangThai` không phải "Đã thu", cập nhật lại các trường cần thiết
          const selectedService =
            day.DichVu && day.DichVu.length > 0
              ? day.DichVu.map((dv) => dv.TenDichVu)
              : [];

          const matchingData = data.find((item) => item.Ngay === day.Ngay);
          if (matchingData) {
            day.ThuDuoc = matchingData.TienPhaiThu;
            day.ConLai = ConLai(matchingData.TrangThai, matchingData.ThuDuoc, matchingData.TienPhaiThu);
            day.Du = Du(matchingData.TrangThai, matchingData.ThuDuoc, matchingData.TienPhaiThu);

            // Kiểm tra xem matchingData.SelectedService tồn tại
            day.SelectedService = selectedService;
          }
        }
      });
    },

    addOrUpdateDayCollectForSelected: (
      state,
      action: PayloadAction<{ selectedDays: string[]; data: ReduxDayTable[] }>
    ) => {
      const { selectedDays, data } = action.payload;

      // Tạo một Set chứa các Ngay trong selectedDays
      const selectedDaySet = new Set(selectedDays.map((day) => parseInt(day, 10)));

      // Lọc các DayCollect hiện có, chỉ giữ lại những ngay nằm trong selectedDaySet
      state.dayCollect = state.dayCollect.filter((item) => selectedDaySet.has(item.Ngay));
      // Tạo các DayCollect mới từ dữ liệu data cho các Ngay trong selectedDays
      const newDayCollect = data
        .filter((item) => selectedDaySet.has(item.Ngay))
        .map((item) => {
          // Thêm tất cả các tên dịch vụ trong DichVu của Ngay vào SelectedService
          const selectedService =
            item.DichVu && item.DichVu.length > 0
              ? item.DichVu.map((dv) => dv.TenDichVu)
              : [];

          return {
            Ngay: item.Ngay,
            TongThu: item.TienPhaiThu,
            SelectedService: selectedService,
          };
        });

      // Kết hợp các DayCollect mới với danh sách hiện có
      state.dayCollect = [...state.dayCollect, ...newDayCollect];

      // Cập nhật ThuDuoc, ConLai, và Du trong state.day dựa trên state.dayCollect
      state.day.forEach((day) => {
        if (selectedDaySet.has(day.Ngay)) {
          // Nếu `Ngay` thuộc `selectedDays`
          const matchingData = data.find((item) => item.Ngay === day.Ngay);
          if (matchingData) {
            day.ThuDuoc = matchingData.TienPhaiThu;
            day.ConLai = ConLai(matchingData.TrangThai, matchingData.ThuDuoc, matchingData.TienPhaiThu);
            day.Du = Du(matchingData.TrangThai, matchingData.ThuDuoc, matchingData.TienPhaiThu);
            // Thêm tất cả các tên dịch vụ trong DichVu của Ngay vào SelectedService
            day.SelectedService = matchingData.DichVu.map((dv) => dv.TenDichVu);
          }
        } else if (day.TrangThai !== "Đã thu") {
          // Nếu `Ngay` không thuộc `selectedDays` và có `TrangThai` khác "Đã thu"
          day.ThuDuoc = 0;
          day.ConLai = day.TienPhaiThu;
          day.Du = 0;
          // Nếu `Ngay` không thuộc `selectedDays`, SelectedService là mảng rỗng
          day.SelectedService = [];
        }
      });
    },

    // Thêm một DayCollect mới
    addDayCollect: (state, action: PayloadAction<DayCollect>) => {
      state.dayCollect.push(action.payload);
    },

    // Xóa DayCollect dựa trên Ngay
    removeDayCollectByDate: (state, action: PayloadAction<number>) => {
      state.dayCollect = state.dayCollect.filter((item) => item.Ngay !== action.payload);
    },

    // Cập nhật TongThu của DayCollect dựa trên checkValue
    updateTongThu: (state, action: PayloadAction<{ Ngay: number; newValue: number; checkValue: boolean }>) => {
      const { Ngay, newValue, checkValue } = action.payload;
      const dayCollectItem = state.dayCollect.find((item) => item.Ngay === Ngay);

      if (dayCollectItem) {
        if (checkValue) {
          // Nếu checkValue là true, thêm giá trị mới vào TongThu
          dayCollectItem.TongThu += newValue;
        } else {
          // Nếu checkValue là false, trừ giá trị mới khỏi TongThu
          dayCollectItem.TongThu -= newValue;
        }
      }
    },

    changeSelectedService: (
      state,
      action: PayloadAction<{ Ngay: number; selectedService: string[] }>
    ) => {
      const { Ngay, selectedService } = action.payload;

      // Lấy thông tin day từ state
      const dayItem = state.day.find((item) => item.Ngay === Ngay);
      let dayDichVu: {
        TenDichVu: string;
        Tien: number;
      }[] = []
      // Thay đổi SelectedService trong dayCollect
      const dayCollectItem = state.dayCollect.find((item) => item.Ngay === Ngay);
      if (dayCollectItem) {
        const oldSelectedService = dayCollectItem.SelectedService;

        // Cập nhật SelectedService mới
        dayCollectItem.SelectedService = selectedService;

        // Xác định dịch vụ bị xoá đi và dịch vụ mới được thêm vào
        const removedServices = oldSelectedService.filter((service) => !selectedService.includes(service));
        const addedServices = selectedService.filter((service) => !oldSelectedService.includes(service));

        // Nếu dayItem không tồn tại, lấy thông tin từ state.day
        dayDichVu = dayItem ? dayItem.DichVu : [];

        // Trừ ThuDuoc và TongThu cho dịch vụ bị xoá đi
        removedServices.forEach((removedService) => {
          const removedServiceData = dayDichVu.find((dv) => dv.TenDichVu === removedService);
          if (removedServiceData) {
            dayCollectItem.TongThu -= removedServiceData.Tien;
          }
        });

        // Cộng ThuDuoc và TongThu cho dịch vụ mới được thêm vào
        addedServices.forEach((addedService) => {
          const addedServiceData = dayDichVu.find((dv) => dv.TenDichVu === addedService);
          if (addedServiceData) {
            dayCollectItem.TongThu += addedServiceData.Tien;
          }
        });
      }

      // Thay đổi SelectedService trong day
      if (dayItem) {
        const oldSelectedService = dayItem.SelectedService;

        // Cập nhật SelectedService mới
        dayItem.SelectedService = selectedService;

        // Xác định dịch vụ bị xoá đi và dịch vụ mới được thêm vào
        const removedServices = oldSelectedService.filter((service) => !selectedService.includes(service));
        const addedServices = selectedService.filter((service) => !oldSelectedService.includes(service));

        // Trừ ThuDuoc cho dịch vụ bị xoá đi
        removedServices.forEach((removedService) => {
          const removedServiceData = dayDichVu.find((dv) => dv.TenDichVu === removedService);
          if (removedServiceData) {
            dayItem.ThuDuoc -= removedServiceData.Tien;
            dayItem.ConLai += removedServiceData.Tien;
          }
        });

        // Cộng ThuDuoc cho dịch vụ mới được thêm vào
        addedServices.forEach((addedService) => {
          const addedServiceData = dayDichVu.find((dv) => dv.TenDichVu === addedService);
          if (addedServiceData) {
            dayItem.ThuDuoc += addedServiceData.Tien;
            dayItem.ConLai -= addedServiceData.Tien;
          }
        });
      }
    },

    changeInput: (state, action: PayloadAction<{ Ngay: number; newValue: number }>) => {
      const { Ngay, newValue } = action.payload;
      const dayCollectItem = state.dayCollect.find((item) => item.Ngay === Ngay);

      if (dayCollectItem) {
        dayCollectItem.TongThu = +newValue
      }

      const dayItem = state.day.find((item) => item.Ngay === Ngay);
      if (dayItem) {
        dayItem.ThuDuoc = newValue
        dayItem.ConLai = dayItem.TienPhaiThu < newValue ? 0 : dayItem.TienPhaiThu - newValue
        dayItem.Du = dayItem.TienPhaiThu < newValue ? newValue - dayItem.TienPhaiThu : 0
      }
    },

    saveDayToMonth: (state, action: PayloadAction<{ month: string; kios: string; day: ReduxDayTable[]; selectedDays: string[] }>) => {
      const { month, kios, day, selectedDays } = action.payload;

      // Tìm index của tháng trong state.months
      const monthIndex = state.months.findIndex((item) => item.MaKios === kios && item.Thang === month);

      if (monthIndex !== -1) {
        // Tháng đã tồn tại, cập nhật dữ liệu
        state.months[monthIndex].DayData = state.months[monthIndex].DayData || [];

        state.months[monthIndex].DayData = day
        state.months[monthIndex].selectedDays = selectedDays
        // Tính toán lại tổng ThuDuoc của những ngày có TrangThai không phải "Đã thu"
        const totalThuDuoc = day
          .filter((dayItem) => dayItem.TrangThai !== "Đã thu")
          .reduce((total, dayItem) => total + dayItem.ThuDuoc, 0);

        // Cập nhật lại SoTienThu và ConLai
        state.months[monthIndex].SoTienThu = totalThuDuoc;

        // Lấy TienPhaiThu từ tháng
        const tienPhaiThu = state.months[monthIndex].TienPhaiThu;

        // Tính toán lại ConLai
        state.months[monthIndex].ConLai = tienPhaiThu - totalThuDuoc;
      }
    },

    addMonthCollectForAll: (state) => {
      // Lặp qua mỗi tháng trong state.months
      state.months.forEach((month) => {
        // Nếu có DayData
        if (month.DayData && month.DayData.length > 0) {

          // Cập nhật ThuDuoc của các ngày có TrangThai không phải "Đã thu"
          month.DayData.forEach((dayItem) => {
            if (dayItem.TrangThai !== "Đã thu") {
              dayItem.ThuDuoc = dayItem.TienPhaiThu;
              dayItem.ConLai = 0;
              dayItem.Du = 0;

              // SelectedService là tất cả các TenDichVu trong DichVu
              dayItem.SelectedService = dayItem.DichVu.map((dv) => dv.TenDichVu);
            }
          });

          // Tính tổng ThuDuoc của các ngày có TrangThai không phải "Đã thu"
          const totalThuDuoc = month.DayData
            .filter((dayItem) => dayItem.TrangThai !== "Đã thu")
            .reduce((total, dayItem) => total + dayItem.ThuDuoc, 0);

          // Cập nhật lại SoTienThu và ConLai
          month.SoTienThu = totalThuDuoc;
          month.ConLai = 0;
          month.selectedDays = "all";
        }
      });
    },

    addOrUpdateMonthCollectForSelected: (state, action: PayloadAction<{ selectedMonths: string[] }>) => {
      const { selectedMonths } = action.payload;

      // Lặp qua mỗi chuỗi selectedMonths
      selectedMonths.forEach((selectedMonth) => {
        // Tách chuỗi thành MaKios và Thang
        const [kios, month] = selectedMonth.split('@');

        // Tìm index của tháng trong state.months
        const monthIndex = state.months.findIndex((item) => item.MaKios === kios && item.Thang === month);

        // Kiểm tra xem có tìm thấy tháng không
        if (monthIndex !== -1) {
          const monthItem = state.months[monthIndex];

          // Nếu có DayData
          if (monthItem.DayData && monthItem.DayData.length > 0) {
            // Cập nhật ThuDuoc của các ngày có TrangThai không phải "Đã thu"
            monthItem.DayData.forEach((dayItem) => {
              if (dayItem.TrangThai !== "Đã thu") {
                dayItem.ThuDuoc = dayItem.TienPhaiThu;
                dayItem.ConLai = 0;
                dayItem.Du = 0;

                // SelectedService là tất cả các TenDichVu trong DichVu
                dayItem.SelectedService = dayItem.DichVu.map((dv) => dv.TenDichVu);
              }
            });

            // Tính tổng ThuDuoc của các ngày có TrangThai không phải "Đã thu"
            const totalThuDuoc = monthItem.DayData
              .filter((dayItem) => dayItem.TrangThai !== "Đã thu")
              .reduce((total, dayItem) => total + dayItem.ThuDuoc, 0);

            // Cập nhật lại SoTienThu và ConLai
            monthItem.SoTienThu = totalThuDuoc;
            monthItem.ConLai = 0;
            monthItem.selectedDays = "all";
          }
        }
      });
    },

  }
})

export const {
  setMonthTable,
  setDayTable,
  addDayCollectForAll,
  addDayCollect,
  removeDayCollectByDate,
  updateTongThu,
  addOrUpdateDayCollectForSelected,
  changeSelectedService,
  saveDayToMonth,
  changeInput,
  addMonthCollectForAll,
  addOrUpdateMonthCollectForSelected
} = main.actions
export default main.reducer