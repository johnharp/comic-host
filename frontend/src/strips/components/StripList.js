import React from "react";

import StripItem from "./StripItem";

import "./StripList.css";

const StripList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <div className="card">
          <div className="card-body">
          <h2>No strips found.</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="strip-list">
      {props.items.map((strip) => (
        <StripItem key={strip.id} id={strip.id} number={strip.number} image={strip.image} />
      ))}
    </ul>
  );
};

export default StripList;
