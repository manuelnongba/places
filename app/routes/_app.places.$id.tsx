import { useNavigate } from '@remix-run/react';
import Modal from '../components/util/Modal';
import { deleteExpense, updateExpense } from '../data/places.server';
import { redirect } from '@remix-run/node';
import type { DataFunctionArgs } from '@remix-run/node';
import { validateExpenseInput } from '../data/validation.server';
import PlaceForm from '../components/places/PlacesForm';

export default function UpdatePlacesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');
  }
  return (
    <Modal onClose={closeHandler}>
      <PlaceForm />
    </Modal>
  );
}

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

    return { deleteId: budgetId };
  }
}
