import { useState, useEffect } from 'react';

import { fetchCurrencyRates } from '../services';
import { Currency } from '../constants';

export const useCurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState(Currency.USD);
  const [toCurrency, setToCurrency] = useState(Currency.UAH);
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(0);
  const [activeInput, setActiveInput] = useState('from');

  const calculateConvertedAmount = (
    amount,
    fromCurrency,
    toCurrency,
    reverse = false
  ) => {
    if (!rates) return 0;

    const fromRate =
      fromCurrency === Currency.UAH
        ? 1
        : rates[`${Currency.UAH}${fromCurrency}`];
    const toRate =
      toCurrency === Currency.UAH ? 1 : rates[`${Currency.UAH}${toCurrency}`];

    if (!fromRate || !toRate) return 0;

    const result = reverse
      ? ((amount * fromRate) / toRate).toFixed(3)
      : ((amount * toRate) / fromRate).toFixed(3);

    return result;
  };

  const usdToUahBuy = (
    parseFloat(calculateConvertedAmount(1, Currency.USD, Currency.UAH)) - 0.25
  ).toFixed(2);
  const usdToUahSell = (
    parseFloat(calculateConvertedAmount(1, Currency.USD, Currency.UAH)) + 0.16
  ).toFixed(2);

  const eurToUahBuy = (
    parseFloat(calculateConvertedAmount(1, Currency.EUR, Currency.UAH)) - 0.37
  ).toFixed(2);
  const eurToUahSell = (
    parseFloat(calculateConvertedAmount(1, Currency.EUR, Currency.UAH)) + 0.23
  ).toFixed(2);

  useEffect(() => {
    const getRates = async () => {
      const data = await fetchCurrencyRates();
      if (data) {
        setRates(data);
      }
    };
    getRates();
  }, []);

  useEffect(() => {
    if (activeInput === 'from') {
      const convertedAmount = calculateConvertedAmount(
        amountFrom,
        fromCurrency,
        toCurrency
      );
      setAmountTo(convertedAmount);
    } else {
      const convertedAmount = calculateConvertedAmount(
        amountTo,
        fromCurrency,
        toCurrency,
        true
      );
      setAmountFrom(convertedAmount);
    }
  }, [fromCurrency, toCurrency, amountFrom, amountTo, activeInput, rates]);

  return {
    rates,
    fromCurrency,
    toCurrency,
    amountFrom,
    amountTo,
    usdToUahBuy,
    usdToUahSell,
    eurToUahBuy,
    eurToUahSell,
    setFromCurrency,
    setToCurrency,
    setAmountFrom,
    setAmountTo,
    setActiveInput,
    calculateConvertedAmount,
  };
};
