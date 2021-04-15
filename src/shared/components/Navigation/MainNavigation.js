import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Button from "../FormElements/Button";
import Modal from "../UIElements/Modal";
import Backdrop from "../UIElements/Backdrop";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header="The Map!"
        conentClass="stip-display__modal-content"
        footerClass="strip-display__mnodal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
          <div className="map">
              <img alt='Map of the realm.' className="map-container"
                src="https://preview.redd.it/zss7vxgrkvu31.jpg?width=960&crop=smart&auto=webp&s=9e8947372949e327f26536f288c29d7f9aed305e"
              />
          </div>
      </Modal>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">{props.siteName}</Link>
        </h1>

        <Button inverse onClick={openMapHandler}>Show the Map</Button>

        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
