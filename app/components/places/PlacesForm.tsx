import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from '@remix-run/react';
import type { PlacesInterface } from '~/routes/_app.places';

function PlaceForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const matches = useMatches();
  const params = useParams();

  const places: PlacesInterface[] = matches.find(
    (match) => match.id === 'routes/_app.places'
  )!.data;

  const placeData: PlacesInterface = places.find((place: PlacesInterface) => {
    return place.id == +params.id!;
  })!;

  const navigation = useNavigation();

  if (params.id && !placeData) {
    return <p>Invalid Place id</p>;
  }

  const isSubmitting: boolean = navigation.state !== 'idle';

  const defaultValues = placeData
    ? {
        title: placeData.title,
        amount: placeData.amount,
        date: placeData.date,
      }
    : {
        title: '',
        amount: '',
        date: '',
      };

  return (
    <Form
      method={placeData ? 'patch' : 'post'}
      className="form"
      id="place-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Place</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Budget</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ''
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((err: any) => (
            <li key={err}>{err} </li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Place'}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default PlaceForm;
