import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import AModal from "../../shared/components/UIElements/AModal";

import { AuthContext } from "../../shared/context/auth-context";
import "./StripItem.css";

const StripItem = (props) => {
  
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      
      <div className="card mb-4">
        <div className="card-body">
        <Link to={`/strip/${props.id}`}>
          <div>
            <h2>#{props.number}</h2>
            <h3>more info....</h3>
          </div>
        </Link>

        </div>

        {auth.isLoggedIn && (
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <Button to={`/strip/${props.id}/edit`}
                className="btn btn-sm btn-primary">
                Edit
              </Button>
            </div>
          </div>
        )}


      </div>
    </React.Fragment>
  );
};

export default StripItem;
