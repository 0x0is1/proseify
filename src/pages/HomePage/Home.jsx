import React, { useEffect, useState } from "react";
import HomeCarousel from "../../components/Carousel/HomeCarousel";
import APIFetch from "../../utils/APIFetch";
import "./Home.css";
import Category from "./components/Category/Category";

const Home = ({langidx}) => {
  const [resp, setResp] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`home?limit=50&lang=${langidx}`);
      setResp(data);
    };
    fetchData();
  }, [langidx]);

  return (
    <div className="home">
      {resp && <HomeCarousel items={resp.widgets[0].data}/>}
      {resp && resp.widgets.slice(1).map((category, index)=>{
        if(category.type === "COMIC_LIST"){
          return <Category ctype={0} key={index} data={category.data} />
        }
        return null;
      })}
    </div>
  );
};

export default Home;
