import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useGroup } from "./context/GroupContext";
import React, { useState } from "react";
import { RefreshContext } from './RefreshContext';
import { useNavigate } from 'react-router-dom';
import "./App.css";

export default function MyNavbar() {
  const { t } = useTranslation();
  const context = React.useContext(RefreshContext);
  const refreshTrigger = context?.refreshTrigger;
  const { group } = useGroup();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (context) {
    }
  }, [refreshTrigger, context]);


  return (
    <></>
    // <Navbar style={{ backgroundColor: '#122025' }} expand="lg" className="w-100 flex-column p-0">
    //   {/* Erste Zeile */}
    //   <Container className="d-flex justify-content-center w-100">
    //     <Navbar.Brand
    //       as={NavLink}
    //       to="/"
    //       style={{ color: '#47C2BF' }}
    //       className="d-flex align-items-center gap-2"
    //     >
    //       <img src="/logo.png" width="50" height="50" alt="logo" />
    //       <span className="fw-bold">{group?.name}</span>
    //     </Navbar.Brand>
    //   </Container>

    //   {group && (
    //     <div className="w-100 py-2 d-flex justify-content-center gap-2" >
    //       {/* Beispielinhalt: Untertitel oder Navigation */}
    //       <Button variant="outline-light"
    //         size="sm"
    //         className="rounded-pill px-4"
    //         title="Übersicht"
    //         onClick={() => navigate('/groups/' + group.code, { state: { group } })}
    //       >
    //         <i>Übersicht</i>
    //       </Button>
    //       <Button variant="outline-light"
    //         size="sm"
    //         className="rounded-pill px-4"
    //         title="Ausgaben"
    //         onClick={() => navigate('/expenses/overview', { state: { group } })}
    //       >
    //         <i>Ausgaben</i>
    //       </Button>
    //     </div>
    //   )}
    // </Navbar>


  );
}