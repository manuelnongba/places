import { json } from '@remix-run/node';
import Chart from '../components/expenses/Chart';
import ExpenseStatistics from '../components/expenses/ExpenseStatistics';
import { getExpenses } from '../data/expenses.server';
import { requireUserSession } from '../data/auth.server';
import { useLoaderData } from '@remix-run/react';

const DUMMY_EXPENSES = [
  {
    id: 'el',
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: 'el2',
    title: 'Second Expense',
    amount: 18.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'Could not load expenses for the requested analysis.' },
      {
        status: 404,
        statusText: 'Expenses not found',
      }
    );
  }

  return expenses; // return json(expenses);
}
