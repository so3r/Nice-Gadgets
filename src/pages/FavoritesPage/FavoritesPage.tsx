// import { useAppSelector } from '../../app/hooks';
// import { FavoritesEmpty } from '../../components/FavoritesEmpty';
import './FavoritesPage.scss';
import { useAppSelector } from '../../app/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { FavoritesEmpty } from '../../components/FavoritesEmpty';
import { ProductCard } from '../../components/ProductCard/ProductCard';
// import { Product } from '../../types/Product';

// const testProduct1: Product = {
//   id: 143,
//   category: 'accessories',
//   itemId: 'apple-watch-series-4-40mm-silver',
//   name: 'Apple Watch Series 4 40mm Silver',
//   fullPrice: 399,
//   price: 349,
//   screen: "1.57' OLED",
//   capacity: '40mm',
//   color: 'silver',
//   ram: '0.75GB',
//   year: 2019,
//   image: 'img/accessories/apple-watch-series-4/silver/00.webp',
// };

// const testProduct2: Product = {
//   id: 98,
//   category: 'phones',
//   itemId: 'apple-iphone-13-mini-128gb-blue',
//   name: 'Apple iPhone 13 Mini 128GB Blue',
//   fullPrice: 900,
//   price: 820,
//   screen: "6.1' OLED",
//   capacity: '128GB',
//   color: 'blue',
//   ram: '4GB',
//   year: 2020,
//   image: 'img/phones/apple-iphone-13-mini/blue/00.webp',
// };

export const FavoritesPage = () => {
  const favoriteProducts = useAppSelector((state) => state.favoriteProducts);

  if (!favoriteProducts.length) {
    return <FavoritesEmpty />;
  }

  return (
    <>
      <div className="fav-page container">
        <Breadcrumbs />
        <h1 className="page__title">Favourites</h1>
        <p className="page__subtitle">{favoriteProducts.length} items</p>
        <div className="product-list">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="product-list__card"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
