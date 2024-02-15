import React, { useEffect, useState } from "react";
import APIFetch from "../../../utils/APIFetch";

const PImage = ({ data, pid }) => {
  const [resp, setResp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data_ = await APIFetch(`image?pid=${pid}&img_id=${data.name}`);
      setResp(data_);
    };
    fetchData();
  }, []);

  return (
    <>
      {resp && (
        <img
          src={resp.url}
          alt={data.name}
          style={{ maxWidth: "100%", height: "auto" }}
          height={data.height}
          width={data.width}
        />
      )}
    </>
  );
};

export default PImage;
