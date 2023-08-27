import { useNavigate } from '@remix-run/react';
import Modal from '../components/util/Modal';
import { deletePlace, updatePlace } from '../data/places.server';
import { redirect } from '@remix-run/node';
import type { DataFunctionArgs } from '@remix-run/node';
import { validatePlaceInput } from '../data/validation.server';
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
  const budgetId = +params.id!;

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const budgetData: any = Object.fromEntries(formData);

    try {
      validatePlaceInput(budgetData);
    } catch (error) {
      return error;
    }

    await updatePlace(budgetId, budgetData);
    return redirect('/places');
  } else if (request.method === 'DELETE') {
    await deletePlace(budgetId);

    return { deleteId: budgetId };
  }
}
