import "../../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useContext } from "react";
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { ApiErrorResponse } from '../../types/ApiErrorResponse';
import { UserDto } from '../../types/UserDto';
import { updateUser } from "../../service/UserService";
import { RefreshContext } from '../../RefreshContext';

export default function EditUserModal({ user }: { user: UserDto }) {

  const [show, setShow] = useState(false);
  const [name, setName] = useState(user.name);
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);

  async function handleRename() {

    user.name = name;
    const result: UserDto | ApiErrorResponse = await updateUser(user);
    if ('error' in result) {
      setError((result as ApiErrorResponse).message);
      return;
    }
    user = result;

    if (context) {
      const { setRefreshTrigger } = context;
      setRefreshTrigger(prev => prev + 1);
    }
  }

  return (
    <>
      <Button variant="outline-secondary" onClick={() => setShow(true)}>
        <i className="bi bi-pencil"></i>
      </Button>
      {
        user && (
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>edit user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex gap-2 w-100">
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename();
                    }}
                    placeholder={user.name}
                    required
                    className="flex-grow-1"
                  />
                  <InputGroup.Text
                    role="button"
                    tabIndex={0}
                    onClick={handleRename}
                    title="Benutzer umbenennen"
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
