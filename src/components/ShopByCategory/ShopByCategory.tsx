import { Link } from 'react-router-dom';
import './ShopByCategory.scss';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import { Product } from '../../types/Product';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const phonesImg = '/img/categories/phones-category.png';
const tabletsImg = '/img/categories/tablets-category.png';
const accessoriesImg = '/img/categories/accessories-category.png';

export const Categories = () => {
  const [phonesQuantity, setPhonesQuantity] = useState<number>(0);
  const [tabletsQuantity, setTabletsQuantity] = useState<number>(0);
  const [accessoriesQuantity, setAccessoriesQuantity] = useState<number>(0);
  const [error, setError] = useState('');

  const [titleColor, setTitleColor] = useState('black');

  const { theme } = useTheme();
  console.log('theme', theme);

  useEffect(() => {
    const newColor = theme === 'dark-mode' ? 'white' : 'black';
    setTitleColor(newColor);
  }, [theme]);

  useEffect(() => {
    getProducts()
      .then((products: Product[]) => {
        setPhonesQuantity(
          products.filter((product) => product.category === 'phones').length,
        );
        setTabletsQuantity(
          products.filter((product) => product.category === 'tablets').length,
        );
        setAccessoriesQuantity(
          products.filter((product) => product.category === 'accessories')
            .length,
        );
      })
      .catch(() => setError('Something went wrong'));
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  const categories = [
    {
      name: 'phones',
      img: phonesImg,
      title: 'Mobile phones',
      quantity: phonesQuantity,
    },
    {
      name: 'tablets',
      img: tabletsImg,
      title: 'Tablets',
      quantity: tabletsQuantity,
    },
    {
      name: 'accessories',
      img: accessoriesImg,
      title: 'Accessories',
      quantity: accessoriesQuantity,
    },
  ];

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>
      <div className="categories__wrapper">
        {categories.map((category) => (
          <Link
            to={`/${category.name}`}
            key={category.name}
            className="categories__link"
          >
            <motion.img
              src={category.img}
              alt={category.name}
              className="categories__img"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <motion.h4
              className="categories__link-title"
              initial={{ opacity: 0, y: 50, color: '#ff0000' }}
              animate={{
                opacity: 1,
                y: 0,
                color: titleColor,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {category.title}
            </motion.h4>
            <motion.p
              className="categories__link-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {category.quantity} models
            </motion.p>
          </Link>
        ))}
      </div>
    </section>
  );
};
