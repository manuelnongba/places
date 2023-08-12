import type { PlacesInterface } from '~/routes/_app.places';

import PlacesListItem from './PlacesListItem';

function PlacesList({ places }: any) {
  return (
    <ol id="expenses-list">
      {places.map((place: PlacesInterface) => (
        <li key={place.id}>
          <PlacesListItem
            id={place.id}
            title={place.title}
            amount={place.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default PlacesList;
