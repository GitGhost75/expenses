import "../../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useContext } from "react";
import { createGroup } from "../../service/GroupService";
import { Form, InputGroup } from 'react-bootstrap';
import { RefreshContext } from '../../RefreshContext';
import { GroupDto } from '../../types/GroupDto';
import { ApiErrorResponse } from '../../types/ApiErrorResponse';

export default function CreateGroupForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);

  async function handleCreateGroup() {

    setName("");
    setError("");

    if (!context) {
      throw new Error("RefreshContext must be used within a RefreshContext.Provider");
    }
    const { setRefreshTrigger } = context;

    const response: GroupDto | ApiErrorResponse = await createGroup(name);

    if ('error' in response) {
      setError((response as ApiErrorResponse).message);
      return;
    }

    setRefreshTrigger(prev => prev + 1);
  }

  return (
    <>
      <div className="d-flex gap-2 w-100">
        <InputGroup>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateGroup();
            }}
            placeholder="Gruppenname"
            className="flex-grow-1"
          />
          <InputGroup.Text
            role="button"
            tabIndex={0}
            onClick={handleCreateGroup}
            title="Gruppe erstellen"
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-building-add"></i>
          </InputGroup.Text>
        </InputGroup>
      </div>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>
  );
}
