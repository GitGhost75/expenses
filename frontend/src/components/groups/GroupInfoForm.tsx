import React, { useState } from "react";

import "../../App.css";
import { Modal, Button } from 'react-bootstrap';


import {GroupDto} from '../../types/GroupDto';
import { useTranslation } from 'react-i18next';

export default function GroupMembersForm({ group }: { group: GroupDto }) {
  
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>{t('show_group_info')}</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{group.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>Code: {group.code}</div>
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
