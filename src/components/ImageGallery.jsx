import React, { useEffect, useState } from "react";
import ImageCard from "./ui/ImageCard";
import { getRandomImage } from "../services/lorempicsum";
import ScrollFAB from "./ui/ScrollFAB";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleScrollFAB = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getRandomImage(10);
        // Add unique IDs to images
        const imagesWithId = data.map((img, index) => ({
          ...img,
          id: index,
        }));
        setImages(imagesWithId);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="image-gallery-container">
      {!loaded && <ScrollFAB handleScrollFAB={handleScrollFAB} />}
      {images.map((image) => (
        <ImageCard
          onLoad={() => setLoaded(true)}
          key={image.id}
          image={image}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
