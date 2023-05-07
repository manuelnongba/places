import { Link, Outlet } from '@remix-run/react';

import expensesStyles from '~/styles/expenses.css';

import ExpensesList from '../components/expenses/ExpensesList';
import { FaDownload, FaPlus } from 'react-icons/fa';

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
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}
