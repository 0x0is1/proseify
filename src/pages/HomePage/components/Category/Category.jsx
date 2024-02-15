import React from "react";
import "./Category.css";
import Card from "../Card/Card";

const Category = ({ data, ctype }) => {
  return (
    <div className="category">
      <div className="category-title">
        <h3>{data.displayTitle}</h3>
      </div>
      <div className="cards">
        {ctype === 0
          ? data.list.map((card, index) => {
              return <Card key={index} data={card} ctype={ctype}/>;
            })
          : data.data.map((card, index) => {
              return <Card key={index} data={card} ctype={ctype}/>;
            })}
      </div>
    </div>
  );
};

export default Category;
