import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useGroup } from "./context/GroupContext";
import React, { useState } from "react";
import { RefreshContext } from './RefreshContext';

import "./App.css";

export default function MyNavbar() {
  const { t } = useTranslation();
  const context = React.useContext(RefreshContext);
  const refreshTrigger = context?.refreshTrigger;
  const { groupName } = useGroup();

  React.useEffect(() => {
    if (context) {
    }
  }, [refreshTrigger, context]);


  return (
    <Navbar style={{ backgroundColor: '#122025' }} expand="lg" className="w-100">
      <Container className="d-flex justify-content-center">
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{ color: '#47C2BF' }}
          className="d-flex align-items-center gap-2"
        >
          <img src="/logo.png" width="50" height="50" alt="logo" />
          <span className="fw-bold">{groupName}</span>
        </Navbar.Brand>
      </Container>
    </Navbar>


  );
}