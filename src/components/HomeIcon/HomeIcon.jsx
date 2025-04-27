import React, { useState } from "react";
import css from "./HomeIcon.module.css";

function HomeIcon({ image1, image2, alt1, alt2 }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div
      className={`${css.imageContainer} ${isClicked ? css.clickedState : ""}`}
      onClick={handleClick}
    >
      <img src={image1} alt={alt1} className={css.defaultImage} />
      <img src={image2} alt={alt2} className={css.swappedImage} />
    </div>
  );
}

export default HomeIcon;
