import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import "./StripItem.css";

const StripItem = (props) => {
  const auth = useContext(AuthContext);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const showDeleteWarningHandler = () => {
    setShowDeleteConfirmModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowDeleteConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowDeleteConfirmModal(false);
    console.log("DELETING...");
  };

  return (
    <React.Fragment>
      <Modal
        show={showDeleteConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure?"
        footerClass="strip-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              Cancel
            </Button>

            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this page? There is no undo.</p>
      </Modal>

      
      <div className="card">
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
              <Button to={`/strips/${props.id}`}
                className="btn btn-sm btn-primary">
                Edit
              </Button>

              {auth.isLoggedIn && (
                <Button className="btn btn-sm btn-danger"
                  onClick={showDeleteWarningHandler}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        )}


      </div>
    </React.Fragment>
  );
};

export default StripItem;
