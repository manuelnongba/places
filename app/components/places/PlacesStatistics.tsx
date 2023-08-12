import { useMemo } from 'react';
import { PlacesInterfaces } from '~/routes/_app.places';

function calculateSummaryStatistics(places: string[]) {
  const amounts = places.map((place: any) => +place.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  const sum = places.reduce(
    (prevVal: any, curVal: any) => curVal.amount + prevVal,
    0
  );
  const mean = sum / places.length;

  return { minAmount, maxAmount, sum, mean };
}

function PlacesStatistics({ places }: any) {
  const { minAmount, maxAmount, sum, mean } = useMemo(
    () => calculateSummaryStatistics(places),
    [places]
  );

  return (
    <section>
      <h2>Summary Statistics</h2>
      <dl id="expense-statistics">
        <div>
          <dt>Total</dt>
          <dd>${sum.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Average</dt>
          <dd>${mean.toFixed(2)}</dd>
        </div>
        <div>
          <dt> Min. Amount</dt>
          <dd>${minAmount.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Max. Amount</dt>
          <dd>${maxAmount.toFixed(2)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default PlacesStatistics;