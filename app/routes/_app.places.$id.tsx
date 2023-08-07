import { useNavigate } from '@remix-run/react';
import Modal from '../components/util/Modal';
import { deleteExpense, updateExpense } from '../data/expenses.server';
import { redirect } from '@remix-run/node';
import type { DataFunctionArgs } from '@remix-run/node';
import { validateExpenseInput } from '../data/validation.server';
import BudgetForm from '../components/expenses/PlacesForm';

export default function UpdatePlacesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');
  }
  return (
    <Modal onClose={closeHandler}>
      <BudgetForm />
    </Modal>
  );
}

// export async function loader({ params }) {
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   // return expense;
//   return json(expense);
// }

export async function action({ params, request }: DataFunctionArgs) {
  const budgetId = params.id;

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const budgetData: any = Object.fromEntries(formData);

    try {
      validateExpenseInput(budgetData);
    } catch (error) {
      return error;
    }

    await updateExpense(budgetId, budgetData);
    return redirect('/budgets');
  } else if (request.method === 'DELETE') {
    await deleteExpense(budgetId);

    // return redirect('/expenses');
    return { deleteId: budgetId };
  }
}
