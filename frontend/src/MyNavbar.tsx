import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import React, { useState } from "react";
import { RefreshContext } from './RefreshContext';

import GroupsOverviewModal from './components/groups/GroupsOverviewModal'
import "./App.css";

export default function MyNavbar() {
  const { t } = useTranslation();
  const context = React.useContext(RefreshContext);
  const refreshTrigger = context?.refreshTrigger;
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    if (context) {
    }
  }, [refreshTrigger, context]);



  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault(); // Verhindert Navigation
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar style={{ backgroundColor: '#122025' }} expand="lg">
        <Container>
          <div className="d-flex align-items-center ms-0 me-auto">
            <Navbar.Brand as={NavLink} to="/" className="me-3 ms-0" style={{ color: '#47C2BF' }}>
              <img src="/logo.png" width="50px" alt="logo" />
            </Navbar.Brand>
          </div>
        </Container>
      </Navbar>

    </>
  );
}