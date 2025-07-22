import "../../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Form, InputGroup } from 'react-bootstrap';
import { ApiErrorResponse } from '../../types/ApiErrorResponse';
import { UserDto } from '../../types/UserDto';
import { GroupDto } from '../../types/GroupDto';
import { createUser } from "../../service/UserService";
import { useTranslation } from 'react-i18next';
import { RefreshContext } from '../../RefreshContext';

export default function AddUserModal({ group, show, onClose }: { group: GroupDto, show: boolean, onClose: () => void }) {

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.select();
    }
  }, [show]);

  useEffect(() => {
    setError("");
  }, []);

  async function handleAddMember() {
    setName("");
    setError("");

    if (group && name) {
      const newUser: UserDto = {
        id: "",
        name: name,
        groupCode: group.code
      };

      const result: UserDto | ApiErrorResponse = await createUser(newUser);
      if ('error' in result) {
        setError((result as ApiErrorResponse).message);
        return;
      }

      if (context) {
        const { setRefreshTrigger } = context;
        setRefreshTrigger(prev => prev + 1);
      }

      onClose();
    }
  }

  return (
    <>
      {
        group && (
          <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>add user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex gap-2 w-100">
                <InputGroup>
                  <Form.Control
                    type="text"
                    ref={inputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddMember();
                    }}
                    placeholder={t('placeholder_name')}
                    className="flex-grow-1"
                  />
                  <InputGroup.Text
                    role="button"
                    tabIndex={0}
                    onClick={handleAddMember}
                    title="Benutzer hinzufügen"
                    style={{ cursor: 'pointer' }}>
                    <i className="bi bi-person-add"></i>
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

