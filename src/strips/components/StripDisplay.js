import React from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";

import "./StripDisplay.css";

const StripDisplay = (props) => {
  return (
    <Card className="chapter-item__content">
      <Link to={`/next/${props.id}`}>
        <div className="strip-display__image">
          <img src={props.imageUrl} alt="alt text" width="100%" />
        </div>
      </Link>
    </Card>
  );
};

export default StripDisplay;
