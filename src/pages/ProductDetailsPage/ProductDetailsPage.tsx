import './ProductDetailsPage.scss';
import { About } from '../../components/About';
import { Product } from '../../types/Product';
import { ProductExpand } from '../../types/ProductExpand';
import { TECH_TABLE_KEYS, techSpecsCase } from '../../utils/techSpecsCase';
import { TechSpecs } from '../../components/TechSpecs';
import { PhotosGallery } from '../../components/PhotosGallery';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Back } from '../../components/Back';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById, getProducts } from '../../api';
import { NotFoundPage } from '../NotFoundPage';
import { Category } from '../../types/Category';
import { ProductDetails } from '../../components/ProductDetails';
import Skeleton from 'react-loading-skeleton';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';

type Props = {
  type: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ type }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [currentProduct, setCurrentProduct] = useState<ProductExpand | null>(
    null,
  );
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);

  let currentTechSpecs;

  if (currentProduct) {
    currentTechSpecs = techSpecsCase(currentProduct, TECH_TABLE_KEYS);
  }

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getProducts().then((products) => {
      setProducts(products);
      const firstRandomProducts = products
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      const updatedProducts = firstRandomProducts.map((product) => ({
        ...product,
        image: '../' + product.image,
      }));

      setOtherProducts(updatedProducts);
    });

    getProductById(type, productId)
      .then((foundProduct) => {
        if (foundProduct) {
          setCurrentProduct(foundProduct);
        } else {
          setError('Wrong product id!');
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [productId, type]);

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className="product container">
        {isLoading || !(currentProduct && products) ?
          <Skeleton
            className="breadcrumb-skeleton"
            width={300}
            height={20}
          />
        : <Breadcrumbs />}
        {isLoading || !(currentProduct && products) ?
          <Skeleton
            width={60}
            height={20}
          />
        : <Back />}
        <h2 className="product__title">
          {isLoading || !(currentProduct && products) ?
            <Skeleton />
          : currentProduct.name}
        </h2>
        <section className="product__section">
          <div className="section section--first">
            <div className="section__gallery">
              {isLoading || !(currentProduct && products) ?
                <Skeleton
                  width={300}
                  height={400}
                />
              : <PhotosGallery images={currentProduct.images} />}
            </div>
            <div className="section__details">
              {isLoading || !(currentProduct && products) ?
                <Skeleton
                  count={5}
                  height={50}
                  className="section__details--skeleton"
                />
              : <ProductDetails
                  product={currentProduct}
                  products={products}
                />
              }
            </div>
          </div>

          <div className="section section--second">
            <div className="section__about">
              {isLoading || !(currentProduct && products) ?
                <Skeleton
                  height={30}
                  width={150}
                />
              : <h3 className="section__title">About</h3>}

              <div className="section__divider"></div>
              {isLoading || !(currentProduct && products) ?
                <Skeleton count={15} />
              : <About description={currentProduct.description} />}
            </div>

            <div className="section__tech">
              {isLoading || !(currentProduct && products) ?
                <Skeleton
                  height={30}
                  width={150}
                />
              : <h3 className="section__title">Tech specs</h3>}
              <div className="section__divider"></div>
              {isLoading || !(currentProduct && products) ?
                <Skeleton count={7} />
              : <TechSpecs techSpecsObj={currentTechSpecs} />}
            </div>
          </div>
          <div className="product__slider">
            <ProductsSlider
              products={otherProducts}
              title={'You may also like'}
            />
          </div>
        </section>
      </div>
    </>
  );
};
