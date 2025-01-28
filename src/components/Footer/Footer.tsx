import { Link } from 'react-router-dom';
// import Vector from '../../images/icons/Vector-Stroke.svg';
import Vector from '../../images/icons/Vector-Stroke.svg?react';
import { Logo } from '../Logo/Logo';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="Footer">
      <div className="container">
        <div className="Footer__content">
          <div className="Footer__logo">
            <Logo />
          </div>
          <nav className="Footer__nav">
            <ul className="Footer__nav-list">
              <li className="Footer__nav-item">
                <Link
                  to="https://github.com/fs-oct24-cats-with-computers/catalog-frontend"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="Footer__nav-link"
                >
                  Github
                </Link>
              </li>
              <li className="Footer__nav-item">
                <Link
                  to="/contacts"
                  className="Footer__nav-link"
                >
                  Contacts
                </Link>
              </li>
              <li className="Footer__nav-item">
                <Link
                  to="/rights"
                  className="Footer__nav-link"
                >
                  Rights
                </Link>
              </li>
            </ul>
          </nav>

          <div className="Footer__button">
            <p className="Footer__button-text">Back to top</p>
            <a
              href="#root"
              className="button--back-to-top"
            >
              <Vector className="footer__back-to-top--icon" />
              {/* <img
                className="footer__back-to-top--icon"
                src={Vector}
                alt="Vector-Stroke"
              /> */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
