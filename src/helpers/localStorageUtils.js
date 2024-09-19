export const saveRatesToLocalStorage = rates => {
  const timestamp = new Date().getTime();
  const data = { rates, timestamp };
  localStorage.setItem('currencyRates', JSON.stringify(data));
};

export const getRatesFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('currencyRates'));
  if (data) {
    const now = new Date().getTime();
    const threeHours = 3 * 60 * 60 * 1000;
    if (now - data.timestamp < threeHours) {
      return data.rates;
    } else {
      localStorage.removeItem('currencyRates');
    }
  }
  return null;
};
