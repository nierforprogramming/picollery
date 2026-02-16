import React, { useState } from "react";
import ImageCardSkeleton from "./ImageCardSkeleton";

const ImageCard = ({ image }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="image">
      {!loaded && <ImageCardSkeleton />}
      <img
        src={image.url}
        alt={`Random ${image.id}`}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? "block" : "none" }}
      />
    </div>
  );
};

export default ImageCard;
