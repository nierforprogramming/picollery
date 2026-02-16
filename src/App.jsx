import React from "react";

import ImageGallery from "./components/ImageGallery";
import Logo from "./components/Logo";
import ImageCardSkeleton from "./components/ui/ImageCardSkeleton";

const App = () => {
  return (
    <>
      <Logo />
      <div className="container">
        <ImageGallery />
        {/* <ImageCardSkeleton /> */}
      </div>
    </>
  );
};

export default App;
