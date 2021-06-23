import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";


const ChapterItem = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 pb-3">
      <div className="card">
        <div className="card-header bg-secondary">
          <h3>Chapter {props.number}</h3>
        </div>
        <div className="card-body">
          <Link to={`/chapter/${props.id}/strips`}>
            <div>
              <img src={props.image} alt={props.name} />
            </div>
            <h3>{props.title}</h3>
          </Link>
          <div>{props.stripCount} pages</div>
        </div>
        {auth.isLoggedIn && (
            <div className="card-footer">
              <div className="d-flex justify-content-between">
                <Button
                  to={`/chapter/${props.id}/edit`}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ChapterItem;
