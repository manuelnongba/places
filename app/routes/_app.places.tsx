import { Link, Outlet, useLoaderData } from '@remix-run/react';
import placesStyles from '~/styles/places.css';
import { getPlaces } from '../data/places.server';
import { requireUserSession } from '../data/auth.server';
import PlacesList from '../components/places/PlacesList';
import { FaPlus } from 'react-icons/fa';
import type { DataFunctionArgs } from '@remix-run/node';

export interface PlacesInterface {
  id: number;
  title: string;
  amount: number;
  date: string;
  dateAdded: string;
  userId: string;
}

export interface PlacesProps {
  places: PlacesInterface[];
}

export default function Places() {
  const places: PlacesInterface[] = useLoaderData();
  const hasPlaces: boolean = places && places.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="places-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Place</span>
          </Link>
        </section>
        {hasPlaces && <PlacesList places={places} />}
        {!hasPlaces && (
          <section id="no-places">
            <h1>No Places found</h1>
            <p>
              <Link to="add">Add some </Link>today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: placesStyles }];
}

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserSession(request);

  const places = await getPlaces(userId);

  return places;
}

// export function ErrorBoundary() {
//   return <p>Error</p>;
// }
