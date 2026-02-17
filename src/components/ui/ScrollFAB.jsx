import React from "react";

const ScrollFAB = ({ handleScrollFAB }) => {
  return (
    <button onClick={handleScrollFAB} className="scroll-fab">
      <ion-icon name="arrow-up-outline"></ion-icon>
    </button>
  );
};

export default ScrollFAB;
