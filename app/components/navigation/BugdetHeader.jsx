import { Form, NavLink } from '@remix-run/react';

import Logo from '../util/Logo';

function BudgetHeader() {
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/places" end>
              Manage Budget
            </NavLink>
          </li>
          <li>
            <NavLink to="/places/analysis">Analyze Budget</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <Form method="post" action="/logout">
          <button className="cta">Logout</button>
        </Form>
      </nav>
    </header>
  );
}

export default BudgetHeader;
