import { useMemo } from 'react';
import type { PlacesInterface, PlacesProps } from '~/routes/_app.places';

function calculateSummaryStatistics(places: PlacesInterface[]) {
  const amounts = places.map((place: PlacesInterface) => +place.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  const sum = places.reduce(
    (prevVal: number, curVal: PlacesInterface) => curVal.amount + prevVal,
    0
  );
  const mean: number = sum / places.length;

  return { minAmount, maxAmount, sum, mean };
}

function PlacesStatistics({ places }: PlacesProps) {
  const { minAmount, maxAmount, sum, mean } = useMemo(
    () => calculateSummaryStatistics(places),
    [places]
  );

  return (
    <section>
      <h2>Summary Statistics</h2>
      <dl id="place-statistics">
        <div>
          <dt>Total</dt>
          <dd>¢{sum.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Average</dt>
          <dd>¢{mean.toFixed(2)}</dd>
        </div>
        <div>
          <dt> Min. Amount</dt>
          <dd>¢{minAmount.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Max. Amount</dt>
          <dd>¢{maxAmount.toFixed(2)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default PlacesStatistics;
