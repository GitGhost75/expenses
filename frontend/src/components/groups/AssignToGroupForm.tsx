import "../../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useContext } from "react";
import { assignToGroup } from "../../service/GroupService";
import { Form, InputGroup } from 'react-bootstrap';
import { RefreshContext } from '../../RefreshContext';
import { useTranslation } from 'react-i18next';

export default function AssignToGroupForm() {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const context = useContext(RefreshContext);
  const { t } = useTranslation();

  async function handleEnterGroup() {

    if (!context) {
      throw new Error("RefreshContext must be used within a RefreshContext.Provider");
    }
    const { setRefreshTrigger } = context;

    const group = await assignToGroup(code);

    if (!group) {
      setError(`Group with code ${code} does not exist`);
      return;
    }

    setCode("");
    console.log(`Gruppe ${code} beitreten`);
    setRefreshTrigger(prev => prev + 1);
  }

  return (
    <>
      <div className="d-flex gap-2 w-100">
        <InputGroup>
          <Form.Control
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEnterGroup();
            }}
            placeholder={t('placeholder_group_code')}
            className="flex-grow-1"
          />
          <InputGroup.Text
            role="button"
            tabIndex={0}
            onClick={handleEnterGroup}
            title="Gruppe beitreten"
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-door-open"></i>
          </InputGroup.Text>
        </InputGroup>
      </div>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>

  );
}
