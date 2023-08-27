import { useNavigate } from '@remix-run/react';
import Modal from '../components/util/Modal';
import { addPlace } from '../data/places.server';
import { redirect } from '@remix-run/node';
import type { DataFunctionArgs } from '@remix-run/node';
import { validatePlaceInput } from '../data/validation.server';
import { requireUserSession } from '../data/auth.server';
import BudgetForm from '../components/places/PlacesForm';

export default function AddPlacesPage() {
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
  const userId: number = await requireUserSession(request);
  const formData = await request.formData();
  const placeData: any = Object.fromEntries(formData);

  try {
    validatePlaceInput(placeData);
  } catch (error) {
    return error;
  }

  await addPlace(placeData, userId);
  return redirect('/places');
}
