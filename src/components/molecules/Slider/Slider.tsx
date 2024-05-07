import React, { useEffect, useState } from 'react';
import { SliderProps } from './interface';

export const Slider: React.FC<SliderProps> = ({ images, autoPlay = false, showButtons = true }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [imageSrc, setImageSrc] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const selectNewImage = (index: number, imagesArray: string[], next = true) => {
    setTimeout(() => {
      const nextIndex = next ? (index + 1) % imagesArray.length : (index - 1 + imagesArray.length) % imagesArray.length;
      setSelectedImage(imagesArray[nextIndex]);
      setSelectedIndex(nextIndex);
      setIsImageLoaded(false); // Reset the image loaded state
    }, 500);
  };

  useEffect(() => {
    if (autoPlay || !showButtons) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, images);
        setIsImageLoaded(true); // Mark the image as loaded
      }, 3000);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [autoPlay, showButtons, selectedIndex, images]);

  const cargarImagen = async (imageName: string) => {
    const image = await import(`../../../assets/logos/${imageName}.jpg`);
    /* @vite-ignore */
    setImageSrc(image.default);
  };

  useEffect(() => {
    cargarImagen(selectedImage);
  }, [selectedImage]);

  return (
    <>
      <div className={`carousel__img ${isImageLoaded ? 'fade' : ''}`}>
        <img src={imageSrc} className="mx-auto" alt="marcas" width="80%" height="auto" loading="lazy" />
      </div>

      {showButtons && (
        <div className="carousel__buttonContainer">
          <button type="button" className="CarouselButton" onClick={() => selectNewImage(selectedIndex, images, false)}>
            {'<'}
          </button>
          <button type="button" className="CarouselButton" onClick={() => selectNewImage(selectedIndex, images)}>
            {'>'}
          </button>
        </div>
      )}
    </>
  );
};
