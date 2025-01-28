import { useEffect, useState } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Categories } from '../../components/ShopByCategory/ShopByCategory';
import { Product } from '../../types/Product';
import './HomePage.scss';
import { getProducts } from '../../api';

export const HomePage = () => {
  const [hotPricesModels, setHotPricesModels] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then((products: Product[]) => {
        setHotPricesModels(
          products.slice(0, 10).sort((a, b) => b.price - a.price),
        );
        setNewModels(products.slice(10, 20).sort((a, b) => b.price - a.price));
      })
      .catch(() => setError('Something went wrong'));
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <div className="page-container">
        <h1 className="page__title home-page">
          Welcome to Nice Gadgets store!
        </h1>
        <PicturesSlider />
        <ProductsSlider
          products={hotPricesModels}
          title={'Hot prices'}
        />
        <Categories />
        <ProductsSlider
          products={newModels}
          title={'Brand new models'}
        />
      </div>
    </div>
  );
};
