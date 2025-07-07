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
        <Navbar style={{ backgroundColor:'#122025'}} >
          <Container>
            <Navbar.Brand as={NavLink} to="/" style={{color:'#47C2BF'}}>
                <img src="/logo.png" width="50px" alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link style={{color:'#47C2BF'}} href="#" onClick={handleOpenModal}>{t('nav_my_groups')}</Nav.Link>
                      <GroupsOverviewModal show={showModal} onClose={handleCloseModal} />
                    <Nav.Link as={NavLink} style={{color:'#47C2BF'}} to="/manage-groups">{t('nav_manage_groups')}</Nav.Link>
                  </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
}