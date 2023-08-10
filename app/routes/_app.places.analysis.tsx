import { json } from '@remix-run/node';
import type { DataFunctionArgs } from '@remix-run/node';
import Chart from '../components/expenses/Chart';
import { getExpenses } from '../data/expenses.server';
import { requireUserSession } from '../data/auth.server';
import { useLoaderData } from '@remix-run/react';
import PlacesStatistics from '../components/expenses/PlacesStatistics';

// const DUMMY_EXPENSES = [
//   {
//     id: 'el',
//     title: 'First Expense',
//     amount: 12.99,
//     date: new Date().toISOString(),
//   },
//   {
//     id: 'el2',
//     title: 'Second Expense',
//     amount: 18.99,
//     date: new Date().toISOString(),
//   },
// ];

export default function PlacesAnalysisPage() {
  const places = useLoaderData();
  console.log(places);

  return (
    <main>
      <Chart places={places} />
      <PlacesStatistics places={places} />
    </main>
  );
}

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'Could not load budgets for the requested analysis.' },
      {
        status: 404,
        statusText: 'Budgets not found',
      }
    );
  }

  return expenses; // return json(expenses);
}
