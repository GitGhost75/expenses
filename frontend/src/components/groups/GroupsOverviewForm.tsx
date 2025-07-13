import React, { useState, useEffect } from "react";
import "../../App.css";
import { Button, Modal } from 'react-bootstrap';
import { GroupDto } from '../../types/GroupDto';
import { useTranslation } from 'react-i18next';
import { fetchGroups } from '../../service/GroupService';

export default function GroupsOverviewForm() {

  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState<GroupDto[]>([]);

  useEffect(() => {
    async function loadGroups() {
      const groups = await fetchGroups();
      setGroups(groups);
    }
    loadGroups();
  }, []);

  return (
    <>
      <Button onClick={() => setShow(true)}>{t('nav_groups')}</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('nav_groups')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            groups &&
            groups.map((group: GroupDto) =>
              <div>{group.name} ({group.code})</div>
            )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            {t('ok')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
