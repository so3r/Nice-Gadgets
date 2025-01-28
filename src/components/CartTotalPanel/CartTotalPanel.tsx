import { ProductWithQuantity } from '../../types/ProductWithQuantity';
import './CartTotalPanel.scss';
import { SubmitForm } from '../SubmitForm';
import { useState } from 'react';

interface Props {
  products: ProductWithQuantity[];
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartTotalPanel: React.FC<Props> = ({ products, openModal }) => {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  return (
    <div className="total-panel">
      <div className="total-panel__count">
        <h2 className="total-panel__count__price">
          $
          {products.reduce(
            (count, product) =>
              product.quantity ? count + product.price * product.quantity : 0,
            0,
          )}
        </h2>
        <p className="total-panel__count__text">
          Total for {products.length} items
        </p>
      </div>

      {isSubmitOpen ?
        <SubmitForm
          openModal={openModal}
          openForm={setIsSubmitOpen}
        />
      : <button
          className="total-panel__button"
          onClick={() => setIsSubmitOpen(true)}
        >
          Checkout
        </button>
      }
    </div>
  );
};
