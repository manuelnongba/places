import { Outlet } from '@remix-run/react';
import expensesStyles from '~/styles/expenses.css';
import BudgetHeader from '../components/navigation/BugdetHeader';

export default function BudgetAppLayout() {
  return (
    <>
      <BudgetHeader />
      <Outlet />
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}
