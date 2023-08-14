import ChartBar from './ChartBar';

function Chart({ places }: any) {
  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  for (const place of places) {
    const budgetMonth: number = new Date(place.date).getMonth(); // starting at 0 => January => 0
    chartDataPoints[budgetMonth].value += place.amount;
  }

  const dataPointValues: number[] = chartDataPoints.map(
    (dataPoint) => dataPoint.value
  );
  const totalMaximum: number = Math.max(...dataPointValues);

  return (
    <section>
      <h2>Monthly Budget</h2>
      <ol className="chart">
        {chartDataPoints.map((dataPoint) => (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMaximum}
            label={dataPoint.label}
          />
        ))}
      </ol>
    </section>
  );
}

export default Chart;
