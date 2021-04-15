import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import "./StripDisplay.css";

const StripDisplay = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header="The Map!"
        conentClass="stip-display__modal-content"
        footerClass="strip-display__mnodal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
          <div className="map">
              <img className="map-container"
                src="https://preview.redd.it/zss7vxgrkvu31.jpg?width=960&crop=smart&auto=webp&s=9e8947372949e327f26536f288c29d7f9aed305e"
              />
          </div>
      </Modal>

      <Button inverse onClick={openMapHandler}>Show the Map</Button>
      <Card className="chapter-item__content">
        <Link to={`/next/${props.id}`}>
          <div className="strip-display__image">
            <img src={props.imageUrl} alt="alt text" width="100%" />
          </div>
        </Link>
      </Card>
    </React.Fragment>
  );
};

export default StripDisplay;
