import { Link, Outlet, useLoaderData } from '@remix-run/react';

import expensesStyles from '~/styles/expenses.css';

import ExpensesList from '../components/expenses/ExpensesList';
import { FaDownload, FaPlus } from 'react-icons/fa';
import { getExpenses } from '../data/expenses.server';

export default function Expenses() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

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
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No Expenses found</h1>
            <p>
              Start <Link to="add">add some </Link>today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}

export async function loader() {
  const expenses = await getExpenses();

  return expenses;

  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     {
  //       message: `Could not find any expenses.`,
  //     },
  //     { status: 404, statusText: 'No expenses found' }
  //   );
  // }
}

// export function ErrorBoundary() {
//   return <p>Error</p>;
// }
