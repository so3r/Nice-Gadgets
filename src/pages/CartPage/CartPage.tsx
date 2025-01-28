import { CartEmpty } from '../../components/CartEmpty';
import { CartCard } from '../../components/CartCard';
import { CartTotalPanel } from '../../components/CartTotalPanel';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useState } from 'react';
import { ModalMessage } from '../../components/ModalMessage';
import { useNavigate } from 'react-router-dom';
import './CartPage.scss';
import { useAppSelector } from '../../app/hooks';

export const CartPage = () => {
  const navigate = useNavigate();
  const [isModalMessage, setIsModalMessage] = useState(false);

  const products = useAppSelector((state) => state.cartProducts);

  const onClickModal = () => {
    setIsModalMessage(false);
    navigate('/home');
  };

  return (
    <>
      {products !== undefined && products.length > 0 ?
        <section className="cart-page container">
          <Breadcrumbs />
          <h1 className="page__title">Cart</h1>

          <div className="cart-page__content">
            <section className="cart-page__card-holder">
              {products.map((product) => (
                <CartCard
                  product={product}
                  key={product.id}
                />
              ))}
            </section>

            <CartTotalPanel
              products={products}
              openModal={setIsModalMessage}
            />
          </div>
        </section>
      : <CartEmpty />}
      {isModalMessage && (
        <ModalMessage
          products={products}
          closeMessage={onClickModal}
        />
      )}
    </>
  );
};
