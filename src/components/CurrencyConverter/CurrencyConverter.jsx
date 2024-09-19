import { useCurrencyConverter } from '../../hooks';
import { Currency } from '../../constants';

import css from './CurrencyConverter.module.css';

export const CurrencyConverter = () => {
  const {
    fromCurrency,
    toCurrency,
    amountFrom,
    amountTo,
    setFromCurrency,
    setToCurrency,
    setAmountFrom,
    setAmountTo,
    setActiveInput,
  } = useCurrencyConverter();

  return (
    <div className={css.container}>
      <h2 className={css.header}>Currency converter</h2>

      <div className={css.result}>
        {amountTo} {toCurrency}
      </div>
      <div className={css.subtext}>
        Based on {amountFrom} {fromCurrency}
      </div>

      <div className={css.inputGroup}>
        <input
          className={css.input}
          type="number"
          value={amountFrom}
          onChange={e => {
            setAmountFrom(e.target.value);
            setActiveInput('from');
          }}
        />
        <select
          className={css.select}
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}
        >
          <option value={Currency.UAH}>UAH</option>
          <option value={Currency.USD}>USD</option>
          <option value={Currency.EUR}>EUR</option>
          <option value={Currency.PLN}>PLN</option>
        </select>
      </div>

      <div className={css.inputGroup}>
        <input
          className={css.input}
          type="number"
          value={amountTo}
          onChange={e => {
            setAmountTo(e.target.value);
            setActiveInput('to');
          }}
        />
        <select
          className={css.select}
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}
        >
          <option value={Currency.UAH}>UAH</option>
          <option value={Currency.USD}>USD</option>
          <option value={Currency.EUR}>EUR</option>
          <option value={Currency.PLN}>PLN</option>
        </select>
      </div>
    </div>
  );
};
