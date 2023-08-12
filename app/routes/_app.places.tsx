import { Link, Outlet, useLoaderData } from '@remix-run/react';
import expensesStyles from '~/styles/places.css';
import { getExpenses } from '../data/places.server';
import { requireUserSession } from '../data/auth.server';
import PlacesList from '../components/places/PlacesList';
import { FaPlus } from 'react-icons/fa';
import type { DataFunctionArgs } from '@remix-run/node';

export interface PlacesInterface {
  id: string;
  title: string;
  amount: number;
  date: string;
  dateAdded: string;
  userId: string;
}

export default function Places() {
  const places: string[] = useLoaderData();
  const hasExpenses = places && places.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Place</span>
          </Link>
          {/* <a href="/places/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a> */}
        </section>
        {hasExpenses && <PlacesList places={places} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No Places found</h1>
            <p>
              Start <Link to="add">add some </Link>today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  return expenses;

  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     {
  //       message: `Could not find any expenses.`,
  //     },
  //     { status: 404, statusText: 'No expenses found' }
  //   );
  // }
}

// export function ErrorBoundary() {
//   return <p>Error</p>;
// }
