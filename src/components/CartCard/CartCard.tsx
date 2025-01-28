import './CartCard.scss';
import CloseIcon from '../../../public/icons/Close.svg?react';
import { ProductWithQuantity } from '../../types/ProductWithQuantity';
import { useAppDispatch } from '../../app/hooks';
import { cartProductsSlice } from '../../features/cart';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  product: ProductWithQuantity;
};

export const CartCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const isQuantityMinimal = product.quantity === 1;

  const handleRemove = () =>
    dispatch(cartProductsSlice.actions.removeProduct(product.id));

  const handleDecrease = () =>
    dispatch(cartProductsSlice.actions.decreaseQuantity(product.id));

  const handleIncrease = () =>
    dispatch(cartProductsSlice.actions.increaseQuantity(product.id));

  return (
    <div className="card">
      <div className="card__firstRow">
        <div
          className="card__firstRow--close"
          onClick={handleRemove}
        >
          <CloseIcon className="card__firstRow--close--img" />
        </div>
        <div className="card__firstRow--phone">
          <img
            src={product.image}
            alt={product.name}
            className="card__firstRow--phone--img"
          />
        </div>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className="card__firstRow--info"
        >
          {product.name}
        </Link>
      </div>

      <div className="card__secondRow">
        <div className="card__secondRow--control">
          <button
            className={cn('card__secondRow--control--minus', {
              disabled: isQuantityMinimal,
            })}
            disabled={isQuantityMinimal}
            onClick={handleDecrease}
          >
            —
          </button>
          <div className="card__secondRow--control--quantity">
            {product.quantity}
          </div>
          <button
            className="card__secondRow--control--plus"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className="card__secondRow--price">${product.price}</div>
      </div>
    </div>
  );
};
