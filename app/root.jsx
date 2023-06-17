import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';

import sharedStyles from '~/styles/shared.css';
import Error from './components/util/Error';

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const caughtResponse = useRouteError();

  if (isRouteErrorResponse(caughtResponse)) {
    return (
      <Document title={caughtResponse.statusText}>
        <main>
          <Error title={caughtResponse.statusText}>
            <p>{caughtResponse.data?.message || 'Something went wrong'}</p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </Error>
        </main>
      </Document>
    );
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: sharedStyles }];
}
