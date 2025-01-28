import './ModalMessage.scss';
import { useAppDispatch } from '../../app/hooks';
import { cartProductsSlice } from '../../features/cart';
import { ProductWithQuantity } from '../../types/ProductWithQuantity';

interface Props {
  products: ProductWithQuantity[];
  closeMessage: () => void;
}

export const ModalMessage: React.FC<Props> = ({ products, closeMessage }) => {
  const dispatch = useAppDispatch();

  const applyOrder = () => {
    products.map((product) =>
      dispatch(cartProductsSlice.actions.removeProduct(product.id)),
    );
    closeMessage();
  };

  return (
    <div className="message">
      <div className="message__content">
        <h2 className="message__content__text">
          Your order has been accepted!
        </h2>
        <button
          className="message__content__button"
          onClick={applyOrder}
        >
          OK
        </button>
      </div>
    </div>
  );
};
