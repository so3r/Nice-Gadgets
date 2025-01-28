import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { getSearchWith } from '../utils/searchHelper';
// import { useMemo } from 'react';

export const useSortParams = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 16;
  const query = searchParams.get('query') || '';

  const handleSortBy = (sortOption: string) => {
    const updatedParams = getSearchWith(searchParams, { sortBy: sortOption });
    setSearchParams(updatedParams);
  };

  const handleItemsPerPage = (value: number) => {
    const updatedParams = getSearchWith(searchParams, {
      itemsPerPage: value.toString(),
    });
    setSearchParams(updatedParams);
  };

  const handleQueryChange = (value: string | null) => {
    const updatedParams = getSearchWith(searchParams, { query: value });
    setSearchParams(updatedParams);
  };

  const sortProducts = (products: Product[], sortBy: string, query: string) => {
    return [...products]
      .filter((product) => {
        const normalizedQuery = query.toLowerCase().trim();
        const normalizedName = product.name.toLowerCase();

        return normalizedName.includes(normalizedQuery);
      })
      .sort((product1, product2) => {
        switch (sortBy) {
          case 'newest':
            return product2.year - product1.year;
          case 'alph-asc': // A -> Z
            return product1.name.localeCompare(product2.name);
          case 'alph-desc': // Z -> A
            return product2.name.localeCompare(product1.name);
          case 'price-asc': // 1 -> 10
            return product1.price - product2.price;
          case 'price-desc': // 10 -> 1
            return product2.price - product1.price;
          case 'none': // 10 -> 1
            return 0;
          default:
            return 0;
        }
      });
  };

  const sortedProducts = sortProducts(products, sortBy, query);

  return {
    sortBy,
    handleSortBy,
    sortedProducts,
    itemsPerPage,
    handleItemsPerPage,
    query,
    handleQueryChange,
  };
};
