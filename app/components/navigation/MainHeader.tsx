import { Form, Link, useLoaderData } from '@remix-run/react';
import Logo from '../util/Logo';

function MainHeader() {
  const userId: number = useLoaderData();

  return (
    <header id="main-header">
      <Logo />
      <nav id="cta-nav">
        <ul>
          <li>
            {userId && (
              <Form method="post" action="/logout" id="logout-form">
                <button className="cta-alt">Logout</button>
              </Form>
            )}
            {!userId && (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
