import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.scss';
import { BurgerMenu } from '../BurgerMenu';
import { useAppSelector } from '../../app/hooks';
import Logo from '../../../public/img/header_components/Logo.svg?react';
import Favourites from '../../../public/img/header_components/Favourites.svg?react';
import ShoppingBag from '../../../public/img/header_components/Shopping bag.svg?react';
import Menu from '../../../public/img/header_components/Menu.svg?react';
import CloseIcon from '../../../public/img/header_components/Close.svg?react';
import { useTheme } from '../../hooks/useTheme';
// import classnames from 'classnames';

export const Header = () => {
  const mobileScreen: number = 640;
  const [isMobile, checkIsMobile] = useState(window.innerWidth < mobileScreen);
  const [isBurgerClose, checkIsBurgerClose] = useState(true);

  const { theme, setTheme } = useTheme();
  const handleThemeClick = () => {
    setTheme(theme === 'light-mode' ? 'dark-mode' : 'light-mode');
  };

  const favoriteProducts = useAppSelector((state) => state.favoriteProducts);
  const cartProducts = useAppSelector((state) => state.cartProducts);

  const handleResize = () => {
    if (window.innerWidth < mobileScreen) {
      checkIsMobile(true);
    } else {
      checkIsMobile(false);
      checkIsBurgerClose(true);
    }
  };

  const chooseActivePage = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'header__nav_link header__is-active' : 'header__nav_link';

  const chooseActivePageButton = ({ isActive }: { isActive: boolean }) =>
    isActive ?
      'header__buttons_element header__is-active'
    : 'header__buttons_element';

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <NavLink to="/">
            <Logo
              className="header__logo--img"
              onClick={() => {
                checkIsBurgerClose(true);
              }}
            />
            {/* <img
              src="img/header_components/Logo.svg"
              alt="Nice gadgets logo"
              onClick={() => {
                checkIsBurgerClose(true);
              }}
            /> */}
          </NavLink>
        </div>
        {!isMobile && (
          <nav className="header__nav">
            <NavLink
              to="/"
              className={chooseActivePage}
            >
              <div>HOME</div>
            </NavLink>
            <NavLink
              to="/phones"
              className={chooseActivePage}
            >
              <div>PHONES</div>
            </NavLink>
            <NavLink
              to="/tablets"
              className={chooseActivePage}
            >
              <div>TABLETS</div>
            </NavLink>
            <NavLink
              to="/accessories"
              className={chooseActivePage}
            >
              <div>ACCESSORIES</div>
            </NavLink>
          </nav>
        )}

        <div className="header__buttons">
          {!isMobile ?
            <>
              <div
                className="header__buttons_element theme"
                onClick={handleThemeClick}
              >
                {theme === 'light-mode' ? '🌃' : '🌅'}
              </div>
              <NavLink
                to="/favorites"
                className={chooseActivePageButton}
              >
                <Favourites />
                {/* <img
                  src="img/header_components/Favourites.svg"
                  alt="Favourites"
                /> */}
                {!!favoriteProducts.length && (
                  <span className="header__buttons_element--state">
                    {favoriteProducts.length}
                  </span>
                )}
              </NavLink>
              <NavLink
                to="/cart"
                className={chooseActivePageButton}
              >
                <ShoppingBag />
                {/* <img
                  src="img/header_components/Shopping bag.svg"
                  alt="Shopping bag"
                /> */}
                {!!cartProducts.length && (
                  <span className="header__buttons_element--state">
                    {cartProducts.length}
                  </span>
                )}
              </NavLink>
            </>
          : isBurgerClose ?
            <>
              <div
                className="header__buttons_element theme"
                onClick={handleThemeClick}
              >
                {theme === 'light-mode' ? '🌃' : '🌅'}
              </div>
              <NavLink
                to="#"
                className="header__buttons_element"
                onClick={() => {
                  checkIsBurgerClose(false);
                }}
              >
                <Menu />
                {/* <img
                src="img/header_components/Menu.svg"
                alt="Burger menu"
              /> */}
              </NavLink>
            </>
          : <NavLink
              to="#"
              className="header__buttons_element"
              onClick={() => {
                checkIsBurgerClose(true);
              }}
            >
              <CloseIcon />
              {/* <img
                src="img/header_components/Close.svg"
                alt="Close burger menu"
              /> */}
            </NavLink>
          }
        </div>
      </header>
      <BurgerMenu
        isBurgerMenuOpen={!isBurgerClose}
        setIsBurgerMenu={checkIsBurgerClose}
      />
    </>
  );
};
