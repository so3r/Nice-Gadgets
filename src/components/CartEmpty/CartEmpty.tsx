import './CartEmpty.scss';

export const CartEmpty = () => {
  return (
    <div className="empty">
      <img
        className="empty__image"
        src="../../../img/cart-is-empty.png"
        alt="Empty cart image"
      />
      <h2 className="empty__title">Cart is empty</h2>
      <p className="empty__description">
        Looks like you haven&apos;t made your choice yet....
      </p>
    </div>
  );
};
