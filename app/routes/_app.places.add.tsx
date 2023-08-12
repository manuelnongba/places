import { useNavigate } from '@remix-run/react';
import Modal from '../components/util/Modal';
import { addExpense } from '../data/places.server';
import { redirect } from '@remix-run/node';
import type { DataFunctionArgs } from '@remix-run/node';
import { validateExpenseInput } from '../data/validation.server';
import { requireUserSession } from '../data/auth.server';
import BudgetForm from '../components/places/PlacesForm';

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
export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserSession(request);

  const formData = await request.formData();
  // formData.get('title');
  const placeData: any = Object.fromEntries(formData);
  console.log(placeData, formData);

  try {
    validateExpenseInput(placeData);
  } catch (error) {
    return error;
  }

  await addExpense(placeData, userId);
  return redirect('/places');
}
