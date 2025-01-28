import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './PhotosGallery.scss';

type Props = {
  images: string[] | null;
};

export const PhotosGallery: React.FC<Props> = ({ images }) => {
  const [currentImages, setCurrentImages] = useState(
    images!.map((image) => '../' + image),
  );
  const [selectedImage, setSelectedImage] = useState(currentImages[0]);
  const [bigImageIndex, setBigImageIndex] = useState(0);

  useEffect(() => {
    const newImages = images!.map((image) => '../' + image);
    setCurrentImages(newImages);
    setSelectedImage(newImages[0]);
  }, [images]);

  const handleThumbnailClick = (image: string, index: number) => {
    setSelectedImage(image);
    setBigImageIndex(index);
  };

  return (
    <div className="photos-gallery">
      <div className="large-image-container">
        <img
          src={selectedImage}
          alt="Large display"
          className="large-image"
        />
      </div>

      <div className="thumbnails-container">
        {currentImages.slice(0, 5).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={classNames('thumbnail', {
              active: index === bigImageIndex,
            })}
            onClick={() => handleThumbnailClick(image, index)}
          />
        ))}
      </div>
    </div>
  );
};
