import React from "react";

import ImageGallery from "./components/ImageGallery";
import Logo from "./components/Logo";
import ImageCardSkeleton from "./components/ui/ImageCardSkeleton";

const App = () => {
  return (
    <div className="container">
      <Logo />
      <ImageGallery />
      {/* <ImageCardSkeleton /> */}
    </div>
  );
};

export default App;
