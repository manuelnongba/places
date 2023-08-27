import type { DataFunctionArgs } from '@remix-run/node';
import { requireUserSession } from '../data/auth.server';
import { getPlaces } from '../data/places.server';

//A loader is triggered whenever a get request reaches this route

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserSession(request);
  return getPlaces(userId);
}
