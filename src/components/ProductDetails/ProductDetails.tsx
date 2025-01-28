import './ProductDetails.scss';
import React, { useState } from 'react';
import cn from 'classnames';
import { ProductExpand } from '../../types/ProductExpand';
import Favorite from '../../../public/icons/Favourites Filled (Heart Like).svg?react';
import { DESC_TABLE_KEYS, techSpecsCase } from '../../utils/techSpecsCase';
import { TechSpecs } from '../TechSpecs';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { cartProductsSlice } from '../../features/cart';
import { favoriteProductsSlice } from '../../features/favorites';
import { Colors } from '../../types/Colors';

type Props = {
  product: ProductExpand;
  products: Product[];
};

export const ProductDetails: React.FC<Props> = ({ product, products }) => {
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacity);
  const description = techSpecsCase(product, DESC_TABLE_KEYS);

  const favoriteProducts = useAppSelector((state) => state.favoriteProducts);
  const cart = useAppSelector((state) => state.cartProducts);
  const dispatch = useAppDispatch();

  const isProductInFavorites = favoriteProducts.find(
    (favProduct: Product) => favProduct.itemId === product.id,
  );
  const isProductInCart = cart.find(
    (cartProduct: Product) => cartProduct.itemId === product.id,
  );

  const handleCartToggle = () => {
    dispatch(
      cartProductsSlice.actions.toggleProducts(
        products.find((item) => item.itemId === product.id)!,
      ),
    );
  };
  const handleFavoriteToggle = () =>
    dispatch(
      favoriteProductsSlice.actions.toggleProducts(
        products.find((item) => item.itemId === product.id)!,
      ),
    );

  return (
    <div className="product-details">
      <div className="product-details__info">
        {/* Вибір кольору */}

        <div className="product-details__color-options">
          <p className="product-details__color-title">Available colors</p>
          <div className="product-details__color-list">
            {product.colorsAvailable.map((color) => {
              const bgColor = Colors[color as keyof typeof Colors];

              return (
                <Link
                  to={`../${product.namespaceId}-${selectedCapacity.toLowerCase()}-${color}`}
                  key={color}
                  className={`product-details__color-button ${
                    selectedColor === color ?
                      'product-details__color-button--active'
                    : ''
                  }`}
                  style={{ backgroundColor: bgColor }}
                  onClick={() => setSelectedColor(color)}
                />
              );
            })}
          </div>
        </div>

        {/* Вибір об'єму пам'яті */}
        <div className="product-details__capacity-options">
          <p className="product-details__capacity-title">Select capacity:</p>
          <div className="product-details__capacity-list">
            {product.capacityAvailable.map((capacity) => (
              <Link
                to={`../${product.namespaceId}-${capacity.toLowerCase()}-${selectedColor}`}
                key={capacity}
                className={`product-details__capacity-button ${
                  selectedCapacity === capacity ?
                    'product-details__capacity-button--active'
                  : ''
                }`}
                onClick={() => setSelectedCapacity(capacity)}
              >
                {capacity}
              </Link>
            ))}
          </div>
        </div>

        {/* Ціни */}
        <div className="product-details__pricing">
          <p className="product-details__price-discount">
            ${product.priceDiscount}
          </p>
          <p className="product-details__price-regular">
            ${product.priceRegular}
          </p>
        </div>
        {/* Кнопки */}
        <div className="product-details__buttons">
          <div
            className={cn(
              'product-details__button product-details__button--add',
              {
                'product-details__button--added': isProductInCart,
              },
            )}
            onClick={handleCartToggle}
          >
            {isProductInCart ? 'Added' : 'Add to cart'}
          </div>
          <div
            className="product-details__button product-details__button--favorite"
            onClick={handleFavoriteToggle}
          >
            <Favorite
              className={cn('product-details__icon', {
                'product-details__icon--active': isProductInFavorites,
              })}
            />
          </div>
        </div>
        <div className="product-details__specs">
          <TechSpecs techSpecsObj={description} />
        </div>
      </div>
    </div>
  );
};
