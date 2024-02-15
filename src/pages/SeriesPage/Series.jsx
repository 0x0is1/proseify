import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIFetch from "../../utils/APIFetch";
import SeriesDetails from "./components/SeriesDetails";
import Episodes from "./components/Episodes";

import "./Series.css";

const Series = () => {
  const params = useParams();
  const [resp, setResp] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`series?slug_id=${params.sid}`);
      setResp(data);
    };
    fetchData();
  }, [params.sid]);

  return (
    resp && (
      <div className="series">
        <SeriesDetails data={resp.data} />
        <Episodes sid={resp.data.seriesId} />
      </div>
    )
  );
};

export default Series;
