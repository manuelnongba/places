import { Link, useFetcher } from '@remix-run/react';

function PlacesListItem({ id, title, amount }: any) {
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
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deletePlaceItemHandler}>Delete</button>
        <Link to={`/places/${id}`}>Edit</Link>
      </menu>
    </article>
  );
}

export default PlacesListItem;
