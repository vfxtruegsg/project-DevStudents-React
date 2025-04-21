const CurrencyTable = ({ currencyData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Purchase</th>
          <th>Sale</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>USD</td>
          <td>{currencyData.usd.purchase}</td>
          <td>{currencyData.usd.sale}</td>
        </tr>
        <tr>
          <td>EUR</td>
          <td>{currencyData.eur.purchase}</td>
          <td>{currencyData.eur.sale}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CurrencyTable;
