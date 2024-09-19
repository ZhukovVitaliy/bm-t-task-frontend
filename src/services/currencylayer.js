import axios from 'axios';
import { saveRatesToLocalStorage, getRatesFromLocalStorage } from '../helpers';

const { VITE_CURRENCY_API_KEY } = import.meta.env;
const API_URL = `http://api.currencylayer.com/live?access_key=${VITE_CURRENCY_API_KEY}&currencies=USD,EUR,PLN&source=UAH&format=1`;

export const fetchCurrencyRates = async () => {
  const localRates = getRatesFromLocalStorage();
  if (localRates) {
    return localRates;
  }

  try {
    const response = await axios.get(API_URL);
    if (response.data.success) {
      saveRatesToLocalStorage(response.data.quotes);
      return response.data.quotes;
    } else {
      console.error('Error receiving data from API:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('API request error:', error);
    return null;
  }
};
