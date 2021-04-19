import React from "react";

import Card from "../../shared/components/UIElements/Card";
import StripItem from "./StripItem";

import "./StripList.css";

const StripList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="strip-list center">
        <Card>
          <h2>No strips found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="strip-list">
      {props.items.map((strip) => (
        <StripItem key={strip.id} id={strip.id} image={strip.imageUrl} />
      ))}
    </ul>
  );
};

export default StripList;
