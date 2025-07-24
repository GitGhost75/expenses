import React, { useState, useContext, useRef, useEffect } from "react";
import { renameGroup } from "../../service/GroupService";
import "../../App.css";
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { RefreshContext } from '../../RefreshContext';
import { ApiErrorResponse, GroupDto } from "../../types";
import { useTranslation } from 'react-i18next';

export default function RenameGroupForm({ group, show, onClose }: { group: GroupDto, show: boolean, onClose: () => void  }) {

  const [name, setName] = useState(group.name);
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.select();
    }
  }, [show]);

  async function handleRenameGroup() {

    group.name = name;
    setError("");

    if (context) {
      const result: GroupDto | ApiErrorResponse = await renameGroup(group);
      if ('error' in result) {
        setError((result as ApiErrorResponse).message);
        return;
      }

      const { setRefreshTrigger } = context;
      setRefreshTrigger(prev => prev + 1);
      onClose();
    }
  }

  return (
    <>
      {
        group && (
          <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>edit group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex gap-2 w-100">
                <InputGroup>
                  <Form.Control
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameGroup();
                    }}
                    placeholder={t('placeholder_group_name')}
                    className="flex-grow-1"
                  />
                  <InputGroup.Text
                    role="button"
                    tabIndex={0}
                    onClick={handleRenameGroup}
                    title={t('rename_group')}
                    style={{ cursor: 'pointer' }}>
                    <i className="bi bi-pencil"></i>
                  </InputGroup.Text>
                </InputGroup>
              </div>
              {error && <span style={{ color: "red" }}>{error}</span>}
            </Modal.Body>
          </Modal>
        )}
    </>
  );
}
