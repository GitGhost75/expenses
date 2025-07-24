import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal, Nav } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import { GroupDto } from "../../types";
import { useTranslation } from 'react-i18next';
import { fetchGroups } from '../../service/GroupService';
import { RefreshContext } from '../../RefreshContext';

interface MyModalProps {
  show: boolean;
  onClose: () => void;
}

export default function GroupsOverviewModal({ show, onClose }: MyModalProps) {

  const { t } = useTranslation();
  const [groups, setGroups] = useState<GroupDto[]>([]);
  const navigate = useNavigate();
  const context = React.useContext(RefreshContext);
  const refreshTrigger = context?.refreshTrigger;

  useEffect(() => {
    async function loadGroups() {
      const groups = await fetchGroups();
      setGroups(groups);
    }
    loadGroups();
  }, [refreshTrigger, context]);

  const handleNavigate = (code: string) => {
    onClose();
    navigate(`/groups/${code}`);
    if (context) {
      const { setRefreshTrigger } = context;
      setRefreshTrigger(prev => prev + 1);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('nav_groups')}</Modal.Title>
        </Modal.Header>
        {
          groups && (
            <Modal.Body>
              {groups.map((group: GroupDto) =>
                <div>
                  <Nav.Link
                    as={NavLink}
                    to={{ pathname: `/groups/${group.code}` }}
                    onClick={() => handleNavigate(group.code)}>
                    {group.name} ({group.code})
                  </Nav.Link>
                </div>
              )}
            </Modal.Body>
          )}
      </Modal>
    </>
  );
}
