import { json } from '@remix-run/node';
import type { DataFunctionArgs } from '@remix-run/node';
import Chart from '../components/places/Chart';
import { getPlaces } from '../data/places.server';
import { requireUserSession } from '../data/auth.server';
import { useLoaderData } from '@remix-run/react';
import PlacesStatistics from '../components/places/PlacesStatistics';

export default function PlacesAnalysisPage() {
  const places = useLoaderData();

  return (
    <main>
      <Chart places={places} />
      <PlacesStatistics places={places} />
    </main>
  );
}

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserSession(request);
  const places = await getPlaces(userId);

  if (!places || places.length === 0) {
    throw json(
      { message: 'You currently have not added a place for analysis.' },
      {
        status: 404,
        statusText: 'Places not found',
      }
    );
  }

  return places;
}
