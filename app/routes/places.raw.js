import { requireUserSession } from '../data/auth.server';
import { getExpenses } from '../data/expenses.server';

//A loader is triggered whenever a get request reaches this route
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

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  return getExpenses(userId);
}
