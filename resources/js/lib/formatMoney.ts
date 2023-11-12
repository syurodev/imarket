const useMoney = (money: number) => {
  return money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default useMoney