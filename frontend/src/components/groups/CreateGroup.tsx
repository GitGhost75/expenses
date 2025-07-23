import "../../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useContext } from "react";
import { createGroup } from "../../service/GroupService";
import { Form, InputGroup } from 'react-bootstrap';
import { GroupDto } from '../../types/GroupDto';
import { ApiErrorResponse } from '../../types/ApiErrorResponse';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function CreateGroup() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  async function handleCreateGroup() {

    setName("");
    setError("");

    const response: GroupDto | ApiErrorResponse = await createGroup(name);

    if ('error' in response) {
      setError('Gruppe konnte nicht erstellt werden.');
      return;
    }

    navigate(`/groups/${response.code}`);
  }

  return (
    <>
      <div className="d-flex flex-column gap-2 w-100">
        <InputGroup>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateGroup();
            }}
            placeholder={t('placeholder_group_name')}
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
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </>
  );
}
