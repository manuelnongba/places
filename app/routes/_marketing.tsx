import { Outlet } from '@remix-run/react';
import marketingStyles from '~/styles/marketing.css';

import MainHeader from '../components/navigation/MainHeader';
import { getUserFromSession } from '../data/auth.server';
import type { DataFunctionArgs } from '@remix-run/node';

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export function loader({ request }: DataFunctionArgs) {
  return getUserFromSession(request);
}

export function links() {
  return [{ rel: 'stylesheet', href: marketingStyles }];
}
