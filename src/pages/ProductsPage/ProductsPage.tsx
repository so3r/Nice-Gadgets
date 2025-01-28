import './ProductsPage.scss';
import { useEffect, useState } from 'react';

import { getProducts } from '../../api';
import { ProductsListWithPagination } from '../../components/ProductListWithPagination';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { useSortParams } from '../../hooks/useSortParams';
import { itemsPerPageOptions, sortByOptions } from '../../utils/sortingArrays';
import { Category } from '../../types/Category';
import { pageTitle } from '../../utils/titleHelper';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ProductsListSkeleton } from '../../components/ProductsListSkeleton';
import { SearchInput } from '../../components/SearchInput';
import { CatAnimation } from '../../components/CatAnimation';
import { NotFoundPage } from '../NotFoundPage';

type Props = {
  type: Category;
};

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const title = pageTitle(type);

  const {
    sortBy,
    handleSortBy,
    sortedProducts,
    itemsPerPage,
    handleItemsPerPage,
    query,
    handleQueryChange,
  } = useSortParams(products);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((allProducts) =>
        setProducts(allProducts.filter((product) => product.category === type)),
      )
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
      });
  }, [type]);

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className="page container">
        {isLoading ?
          <Skeleton
            className="breadcrumb-skeleton"
            width={130}
            height={20}
          />
        : <Breadcrumbs />}
        <h1 className="page__title">
          {isLoading ?
            <Skeleton />
          : title}
        </h1>
        <p className="page__subtitle">
          {isLoading ?
            <Skeleton />
          : `${products.length} models`}
        </p>
        <div className="page__filters">
          <div className="page__dropdown">
            <div className="page__dropdown--sortBy">
              <p className="page__dropdown--sortBy--label">
                {isLoading ?
                  <Skeleton width={65} />
                : 'Sort by'}
              </p>
              {isLoading ?
                <Skeleton
                  width={180}
                  height={40}
                />
              : <Dropdown
                  sort={sortBy}
                  handleSortBy={handleSortBy}
                  options={sortByOptions}
                />
              }
            </div>
            <div className="page__dropdown--items">
              <p className="page__dropdown--items--label">
                {isLoading ?
                  <Skeleton width={65} />
                : 'Items on page'}
              </p>
              {isLoading ?
                <Skeleton
                  width={180}
                  height={40}
                />
              : <Dropdown
                  sort={itemsPerPage}
                  options={itemsPerPageOptions}
                  handleItemsPerPage={handleItemsPerPage}
                />
              }
            </div>
          </div>

          {isLoading ?
            <Skeleton
              width={180}
              height={40}
            />
          : <div className="page__search">
              <SearchInput
                query={query}
                handleQueryChange={handleQueryChange}
              />
            </div>
          }
        </div>

        {!sortedProducts.length && !isLoading && (
          <div className="page__no-products">
            <div className="page__no-products-cat">
              <CatAnimation />
            </div>
            <p className="page__no-products-text">
              Sorry, your search didn&apos;t match any products
            </p>
          </div>
        )}

        {isLoading ?
          <ProductsListSkeleton cards={8} />
        : <ProductsListWithPagination
            itemsPerPage={itemsPerPage}
            products={sortedProducts}
          />
        }
      </div>
    </>
  );
};
