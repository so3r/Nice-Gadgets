import React from 'react';
import './ProductsListSkeleton.scss';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

type Props = {
  cards: number;
};

export const ProductsListSkeleton: React.FC<Props> = ({ cards }) => {
  return (
    <div className="skeleton-list">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="skeleton-list__card"
          >
            <ProductCardSkeleton />
          </div>
        ))}
    </div>
  );
};
