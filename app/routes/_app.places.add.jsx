import { useNavigate } from '@remix-run/react';
import Modal from '../components/util/Modal';
import { addExpense } from '../data/expenses.server';
import { redirect } from '@remix-run/node';
import { validateExpenseInput } from '../data/validation.server';
import { requireUserSession } from '../data/auth.server';
import BudgetForm from '../components/expenses/PlacesForm';

export default function AddExpensesPage() {
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

//all types of requests like 'get' 'post'
export async function action({ request }) {
  const userId = await requireUserSession(request);

  const formData = await request.formData();
  // formData.get('title');
  const expenseData = Object.fromEntries(formData);
  console.log(expenseData, formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect('/places');
}
