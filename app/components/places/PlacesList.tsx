import type { PlacesInterface, PlacesProps } from '~/routes/_app.places';

import PlacesListItem from './PlacesListItem';
import { useEffect, useRef, useState } from 'react';

function PlacesList({ places }: PlacesProps) {
  const [contents, setContents] = useState(places);
  const dragItem: any = useRef(null);
  const dragOverItem: any = useRef(null);

  useEffect(() => {
    setContents(places);
  }, [places]);

  const handleDragEnter = (index: number) => {
    if (index !== dragOverItem.current) {
      let _pages = [...contents];
      const dragItemContent = _pages.splice(dragItem.current, 1)[0];

      _pages.splice(index, 0, dragItemContent);
      setContents(_pages);

      dragOverItem.current = index;
    }
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  return (
    <ol id="places-list">
      {contents.map((place: PlacesInterface, i: number) => (
        <li
          key={i}
          draggable
          style={{
            cursor: 'grab',
          }}
          onDragStart={(e: any) => {
            handleDragStart(i);
          }}
          onDragEnter={(e: any) => {
            handleDragEnter(i);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
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
