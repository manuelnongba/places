import type { PlacesInterfaces } from '~/routes/_app.places';

import PlacesListItem from './PlacesListItem';

function PlacesList({ places }: any) {
  return (
    <ol id="expenses-list">
      {places.map((place: PlacesInterfaces) => (
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
