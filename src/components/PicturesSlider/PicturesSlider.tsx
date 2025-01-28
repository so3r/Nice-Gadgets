import './PicturesSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const bannerImages = [
  '/img/banner-accessories.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
];

export const PicturesSlider = () => {
  return (
    <section className="PicturesSlider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          type: 'bullets',
          el: '.swiper-pagination',
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide
            className="SwiperSlide"
            key={index}
          >
            <div className="ContentWrapper">
              <div className="TextContent">
                <motion.div
                  className="TextContent_wrapper"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="TextContent_body">
                    <motion.h2
                      className="TextContent_title"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      Now available in our store! 👌
                    </motion.h2>
                    <motion.p
                      className="TextContent_text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      whileHover={{ y: 5 }}
                    >
                      Be the first!
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/phones"
                      className="TextContent_button"
                    >
                      ORDER NOW
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                className="ImgWrapper"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="buttons-wrapper">
        <button className="swiper-button-prev"></button>
        <button className="swiper-button-next"></button>
        <button className="swiper-pagination button-pagination"></button>
      </div>
    </section>
  );
};
