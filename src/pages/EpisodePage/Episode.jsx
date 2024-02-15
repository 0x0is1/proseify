import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Episode.css";
import APIFetch from "../../utils/APIFetch";
import PImage from "./components/PImage";

const Episode = () => {
  const params = useParams();
  const [resp, setResp] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`content?pid=${params.eid}`);
      setResp(data);
    };
    fetchData();
  }, [params.eid]);

  return (
    <div className="ep-data">
      {resp && resp.content.chapters[0].pages[0].pagelets.map((page, index) => {
        return <PImage key={index} data={page.data} pid={resp.pratilipiId} />;
      })}
    </div>
  );
};

export default Episode;
