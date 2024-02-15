import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SeriesDetails = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="album-details">
      <div className="banner">
        <img src={data.coverImageUrl} alt="banner" />
      </div>
      <div className="album-info">
        <div
          className="album-name"
          dangerouslySetInnerHTML={{ __html: data.displayTitle }}
        ></div>
        <div className="audience-detail">
          <span className="summary">
            {data.summary}
          </span>
          <div className="artists">
            Subscribers : {data.subscription.subscribers}
          </div>
        </div>
        <div className="btns">
          <div className="play-button" onClick={null}>
            Read
          </div>
          <div
            className="like-button"
            id={liked}
            onClick={() => {
              setLiked(liked === "on" ? "" : "on");
            }}
          >
            <svg viewBox="0 0 24 24">
              <use xlinkHref="#heart" />
              <use xlinkHref="#heart" />
            </svg>
            <svg className="hide" viewBox="0 0 24 24">
              <defs>
                <path
                  id="heart"
                  d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
                />
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
