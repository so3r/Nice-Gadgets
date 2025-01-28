import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
// import { ArrowIcon } from '../ArrowIcon';
import ArrowLeft from '../../../public/icons/Chevron (Arrow Left).svg?react';
import ArrowRight from '../../../public/icons/Chevron (Arrow Right).svg?react';
import cn from 'classnames';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [products]);

  return (
    <section className="swiper-wrapper-products">
      <motion.div
        className="sliderProducts__title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="sliderProducts__title-content">{title}</h2>
        <div className="sliderProducts-buttons-wrapper">
          <button
            className={`prevButton ${isBeginning ? 'disabled' : ''}`}
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
          >
            <ArrowLeft
              className={cn('icon__color', { notAllowed: isBeginning })}
            />
            {/* <ArrowIcon color={isBeginning ? 'lightgrey' : color} /> */}
            {/* <ArrowIcon color={isBeginning ? 'lightgrey' : 'black'} /> */}
          </button>
          <button
            className={`nextButton ${isEnd ? 'disabled' : ''}`}
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
          >
            <ArrowRight className={cn('icon__color', { notAllowed: isEnd })} />
            {/* <ArrowIcon
              color={isEnd ? 'lightgrey' : color}
              rotate="180deg"
            /> */}
            {/* <ArrowIcon
              color={isEnd ? 'lightgrey' : 'black'}
              rotate="180deg"
            /> */}
          </button>
        </div>
      </motion.div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1.5}
        slidesPerGroup={1}
        onInit={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        navigation={{
          prevEl: '.prevButton',
          nextEl: '.nextButton',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="swiper-slide-productcard"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
