import BudgetListItem from './PlacesListItem';

function PlacesList({ places }) {
  return (
    <ol id="expenses-list">
      {places.map((budget) => (
        <li key={budget.id}>
          <BudgetListItem
            id={budget.id}
            title={budget.title}
            amount={budget.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default PlacesList;
