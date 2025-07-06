import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {fetchGroups} from './service/GroupService';
import React, { useState } from "react";
import { RefreshContext } from './RefreshContext';
import {GroupDto} from './types/GroupDto';
import "./App.css";

export default function MyNavbar() {
    const { t } = useTranslation();
    const [groups, setGroups]= useState<GroupDto[]>([]);
    const context = React.useContext(RefreshContext);
    const refreshTrigger = context?.refreshTrigger;

  React.useEffect(() => {
    if (context) {
      loadGroups();
    }
  }, [refreshTrigger, context]);

    async function loadGroups() {
        const groupsFromBackend : GroupDto[] = await fetchGroups();
        setGroups(groupsFromBackend);
    }

  return (
    <>
        <Navbar style={{ backgroundColor:'#122025'}} >
          <Container>
            <Navbar.Brand as={NavLink} to="/" style={{color:'#47C2BF'}}>
                <img src="/logo.png" width="50px" alt="logo" />{' '}{t('app_name')}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/manage-groups">{t('nav_manage_groups')}</Nav.Link>
                    {groups.map(group => (
                        <Nav.Link
                            key={group.code}
                            as={NavLink}
                            to={`/groups/${group.code}`}>
                            {group.name}
                        </Nav.Link>
                    ))}
                  </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
}