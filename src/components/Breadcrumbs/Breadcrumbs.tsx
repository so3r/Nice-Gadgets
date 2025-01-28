import { useLocation, Link } from 'react-router-dom';
import '../Breadcrumbs/Brearcrumbs.scss';
import ArrowRight from '../../../public/icons/Chevron (Arrow Right).svg?react';
import HomeIcon from '../../../public/icons/Home.svg?react';
export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {location.pathname !== '/' && (
          <li className="breadcrumb__item">
            <Link
              className="breadcrumb__item--link"
              to="/"
            >
              <HomeIcon />
            </Link>
          </li>
        )}

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li
              key={to}
              className="breadcrumb__item"
            >
              <ArrowRight className="breadcrumb__item--icon" />
              <Link
                className="breadcrumb__item--link"
                to={to}
              >
                {value}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
