import { Outlet } from '@remix-run/react';

import expensesStyles from '~/styles/expenses.css';
import ExpensesList from '../components/expenses/ExpensesList';

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

export default function Expenses() {
  return (
    <>
      <Outlet />
      <main>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}
