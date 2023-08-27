import { Link, useFetcher } from '@remix-run/react';

interface PlacesListItemProps {
  id: number;
  title: string;
  amount: number;
}

function PlacesListItem({ id, title, amount }: PlacesListItemProps) {
  // const submit = useSubmit();

  //used to load or submitting requests without triggering navigation actions
  const fetcher = useFetcher();

  function deletePlaceItemHandler() {
    const proceed = confirm('Are you sure? Do you want to delete this item?');
    if (!proceed) return;

    fetcher.submit(null, { method: 'delete', action: `/places/${id}` });
  }

  if (fetcher.state !== 'idle') {
    return (
      <article className="place-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="place-item">
      <div>
        <h2 className="place-title">{title}</h2>
        <p className="place-amount">¢{amount.toFixed(2)}</p>
      </div>
      <menu className="place-actions">
        <button onClick={deletePlaceItemHandler}>Delete</button>
        <Link to={`/places/${id}`}>Edit</Link>
      </menu>
    </article>
  );
}

export default PlacesListItem;
