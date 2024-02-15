import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import './HomeCarousel.css'
import {useNavigate} from 'react-router-dom'

const HomeCarousel = ({items}) => {
  const navigate = useNavigate();
  const handleBannerClick = (index, url)=>{
    if(index===0){
      window.open(url, "_blank");
    }
    navigate(`/series/${url.split("/").pop()}`)
  }

  return (
    <Carousel className="home-carousel">
      {items.map((item, index) => (
        <Paper
          className="slide-car"
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            overflow: "hidden",
            cursor: "pointer"
          }}
        >
          <img
          draggable="false"
            onClick={()=>handleBannerClick(index, item.attributes.actionUrl)}
            src={item.attributes.imageUrl.split("?")[0]}
            alt={item.attributes.imageUrl}
            style={{ maxWidth: "100%", maxHeight: "250px", minHeight: "250px" }}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
