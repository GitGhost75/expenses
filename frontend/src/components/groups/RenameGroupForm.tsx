import React, { useState, useContext } from "react";
import { renameGroup } from "../../service/GroupService";
import "../../App.css";
import { Form, InputGroup } from 'react-bootstrap';
import { RefreshContext } from '../../RefreshContext';
import { ApiErrorResponse } from '../../types/ApiErrorResponse';
import { GroupDto } from '../../types/GroupDto';
import { useTranslation } from 'react-i18next';

export default function RenameGroupForm({ group }: { group: GroupDto }) {

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);
  const { t } = useTranslation();

  async function handleRenameGroup() {

    group.name = name;
    setError("");
    setName("");

    if (context) {
      const result: GroupDto | ApiErrorResponse = await renameGroup(group);
      if ('error' in result) {
        setError((result as ApiErrorResponse).message);
        return;
      }

      const { setRefreshTrigger } = context;
      setRefreshTrigger(prev => prev + 1);
    }
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
    </>

  );
}
