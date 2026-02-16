import React, { useEffect, useState } from "react";
import ImageCard from "./ui/ImageCard";
import { getRandomImage } from "../services/lorempicsum";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

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
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGallery;
