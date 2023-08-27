import { Outlet } from '@remix-run/react';
import placesStyles from '~/styles/places.css';
import PlacesHeader from '../components/navigation/PlacesHeader';

export default function BudgetAppLayout() {
  return (
    <>
      <PlacesHeader />
      <Outlet />
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: placesStyles }];
}
