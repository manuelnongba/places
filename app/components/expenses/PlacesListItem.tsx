import { Link, useFetcher } from '@remix-run/react';

function PlacesListItem({ id, title, amount }: any) {
  // const submit = useSubmit();

  //used to load or submitting requests without triggering navigation actions
  const fetcher = useFetcher();

  function deleteExpenseItemHandler() {
    const proceed = confirm('Are you sure? Do you want to delete this item?');
    //   // tbd\
    //   //null is the data and then the request configuration
    //   submit(null, {
    //     method: 'delete',
    //     action: `/expenses/${id}`,
    //   });
    if (!proceed) return;

    fetcher.submit(null, { method: 'delete', action: `/budgets/${id}` });
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
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default PlacesListItem;
