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
      <li className="strip-item">
        <Card className="strip-item__content">
          <Link to={`/strip/${props.id}`}>
            <div className="strip-item__info">
              <h2>#{props.number}</h2>
              <h3>more info....</h3>
            </div>
          </Link>
          {auth.isLoggedIn && <Button to={`/strips/${props.id}`}>Edit</Button>}

          {auth.isLoggedIn && (
            <Button danger onClick={showDeleteWarningHandler}>
              Delete
            </Button>
          )}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default StripItem;
