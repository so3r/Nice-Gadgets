import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import ReactPaginate from 'react-paginate';

import './ProductListWithPagination.scss';
import { ProductCard } from '../ProductCard/ProductCard';

type PropsType = {
  products: Product[];
  itemsPerPage: number;
};

export const ProductsListWithPagination: React.FC<PropsType> = ({
  products,
  itemsPerPage,
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemsPerPage, itemOffset, products]);

  interface PaginationAction {
    selected: number;
  }

  const handlePageClick = (event: PaginationAction) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="product-list">
        {currentItems.map((product) => (
          <div
            key={product.id}
            className="product-list__card"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="pagination-page" // page button
        activeLinkClassName="pagination-active" // active page button
        previousLinkClassName="pagination-prev" // 'back' page button
        nextLinkClassName="pagination-next" // 'next' page button
        disabledClassName="pagination-disabled" // disabled pahe button
        breakClassName="pagination-break"
      />
    </>
  );
};
