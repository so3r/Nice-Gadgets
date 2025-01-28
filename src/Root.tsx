import { StrictMode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { Category } from './types/Category';
import { ContactsPage } from './pages/ContactsPage';
import { contacts } from '../public/contacts/contacts';
import { RightsPage } from './pages/RightsPage';
import { ThemeProvider } from './context/ThemeProvider';

export const Root = () => (
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<App />}
              >
                <Route
                  index
                  element={<HomePage />}
                />
                <Route
                  path="home"
                  element={
                    <Navigate
                      to="/"
                      replace
                    />
                  }
                />
                <Route path="phones">
                  <Route
                    index
                    element={<ProductsPage type={Category.phones} />}
                  />
                  <Route
                    path=":productId"
                    element={<ProductDetailsPage type={Category.phones} />}
                  />
                </Route>
                <Route path="tablets">
                  <Route
                    index
                    element={<ProductsPage type={Category.tablets} />}
                  />
                  <Route
                    path=":productId"
                    element={<ProductDetailsPage type={Category.tablets} />}
                  />
                </Route>
                <Route path="accessories">
                  <Route
                    index
                    element={<ProductsPage type={Category.accessories} />}
                  />
                  <Route
                    path=":productId"
                    element={<ProductDetailsPage type={Category.accessories} />}
                  />
                </Route>
                <Route
                  path="favorites"
                  element={<FavoritesPage />}
                />
                <Route
                  path="cart"
                  element={<CartPage />}
                />
                <Route
                  path="contacts"
                  element={<ContactsPage contacts={contacts} />}
                />
                <Route
                  path="rights"
                  element={<RightsPage />}
                />

                <Route
                  path="*"
                  element={<NotFoundPage />}
                />
              </Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
