import { Link } from '@remix-run/react';
import { FaArrowRight, FaChartBar } from 'react-icons/fa';

export default function Index() {
  return (
    <main>
      <section className="marketing-section">
        <header>
          <h2>A Central Space</h2>
        </header>
        <div className="marketing-content">
          <div className="marketing-explanation">
            <p>
              Manage your budgets for destinations around the world in one
              central place.
            </p>
            <p>
              <Link className="cta" to="/places">
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="marketing-section">
        <header>
          <FaChartBar />
          <h2>Detailed Analytics</h2>
        </header>
        <div className="marketing-content">
          <p className="marketing-explanation">
            Benefit from best-in-class analytics to understand your spending
            patterns.
          </p>
        </div>
      </section>
    </main>
  );
}

export function meta() {}
