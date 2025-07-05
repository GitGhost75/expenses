import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {fetchGroups} from './service/GroupService';
import React, { useState } from "react";
import { RefreshContext } from './RefreshContext';
import {GroupDto} from './types/GroupDto';

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
            <Navbar.Brand as={Link} to="/" style={{color:'#47C2BF'}}>
                <img src="/logo.png" width="50px" alt="logo" />{' '}{t('app_name')}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/create-groups" style={{ color: '#fff' }}>{t('nav_create_groups')}</Nav.Link>
                    {groups.map(group => (
                        <Nav.Link
                            key={group.code}
                            as={Link}
                            to={`/groups/${group.code}`}
                            style={{ color: '#fff' }}>
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