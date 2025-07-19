import React, { useState } from "react";
import "../../App.css";
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { GroupDto } from '../../types/GroupDto';
import { useTranslation } from 'react-i18next';

function formatGroupCode(code: string) {
  return code.replace(/(.{3})/g, "$1 ").trim();
}

export default function GroupMembersForm({ group }: { group: GroupDto }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(group.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <Button title={t('show_group_info')} onClick={() => setShow(true)}>
        <i className="bi bi-info-circle"></i>
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{group.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <FormControl value={formatGroupCode(group.code)} readOnly />
            <Button variant="outline-secondary" onClick={handleCopy} title={t('copy_code')}>
              <i className="bi bi-clipboard"></i>
            </Button>
          </InputGroup>
          {copied && <div style={{ color: "green", marginTop: 8 }}>{t('copied!')}</div>}
        </Modal.Body>
      </Modal>
    </>
  );
}
