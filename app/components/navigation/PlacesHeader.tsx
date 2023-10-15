import { Form, NavLink } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import Logo from '../util/Logo';

function PlacesHeader() {
  const [open, setOpen] = useState(false);

  const ref: any = useRef();

  useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: Event) => {
    if (ref.current && !ref.current?.contains(e.target)) setOpen(false);
  };

  if (ref.current) {
    for (const i of ref.current.children) {
      i.onclick = () => {
        setOpen(!open);
      };
    }
  }

  return (
    <header id="main-header">
      <Logo />
      <div className={`${open ? 'nav-open' : ''}`}>
        <div className="right-nav" ref={ref}>
          <nav id="main-nav">
            <ul>
              <li>
                <NavLink to="/places" end>
                  Manage Places
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
        </div>
        <button className="btn-mobile-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-mobile-nav"
            name="menu-outline"
            viewBox="0 0 512 512"
            onClick={() => setOpen(true)}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M80 160h352M80 256h352M80 352h352"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-mobile-nav"
            name="close-outline"
            viewBox="0 0 512 512"
            onClick={() => setOpen(false)}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M368 368L144 144M368 144L144 368"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default PlacesHeader;
