import type { PlacesInterface, PlacesProps } from '~/routes/_app.places';

import PlacesListItem from './PlacesListItem';

function PlacesList({ places }: PlacesProps) {
  return (
    <ol id="places-list">
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
