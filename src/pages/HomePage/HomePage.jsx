import { CurrencyConverter } from '../../components/CurrencyConverter/CurrencyConverter';
import DocumentTitle from '../../components/DocumentTitle';

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <CurrencyConverter />
    </>
  );
}
