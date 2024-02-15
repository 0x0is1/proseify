import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import "./Card.css";

const Card = ({ data, ctype }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  function handleCard(sid) {
    ctype === 0 ? navigate(`/series/${sid}`) : navigate(`/episode/${sid}`);
  }

  function handleImageLoad() {
    setImageLoaded(true);
  }

  return (
    <div
      className="card"
      onClick={() =>
        handleCard(`${ctype===0 ? data.attributes.slug : data.attributes.pratilipiId }`)
      }
    >
      <div className="album-image">
        {data.attributes ? (
          <img
            src={data.attributes.coverImageUrl}
            alt="comic banner"
            onLoad={handleImageLoad}
            className={imageLoaded ? "loaded" : ""}
            loading="lazy"
          />
        ) : (
          <Skeleton variant="rectangular" width={141} height={141} />
        )}
      </div>
      {!imageLoaded && <Skeleton variant="text" width={160} height={24} />}
      {!imageLoaded && <Skeleton variant="text" width={160} height={20} />}
      {imageLoaded && (
        <div className="track-name">
          { data.attributes.displayTitle }
        </div>
      )}
      {imageLoaded && data.attributes.displayCategory && (
        <div className="artists">{data.attributes.displayCategory}</div>
      )}
    </div>
  );
};

export default Card;
