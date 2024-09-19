import { useCurrencyConverter } from '../../hooks';
import css from './BuySellCurrency.module.css';

export const BuySellCurrency = () => {
  const { usdToUahBuy, usdToUahSell, eurToUahBuy, eurToUahSell } =
    useCurrencyConverter();

  return (
    <div className={css.container}>
      <div className={css.currencyBlock}>
        <img src="usa-icon.svg" alt="usa-icon" />
        <span>
          {usdToUahBuy} / {usdToUahSell}
        </span>
      </div>
      <div className={css.currencyBlock}>
        <img src="eur-icon.svg" alt="eur-icon" />
        <span>
          {eurToUahBuy} / {eurToUahSell}
        </span>
      </div>
    </div>
  );
};
