import "../../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { assignToGroup } from "../../service/GroupService";
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ApiErrorResponse } from '../../types/ApiErrorResponse';

export default function AssignToGroupForm() {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  async function handleEnterGroup() {

    const group = await assignToGroup(code);

    if ('error' in group) {
      setError(`Group with code ${code} does not exist`);
      return;
    }

    setCode("");
    console.log(`Gruppe ${code} beitreten`);
    navigate(`/groups/${code}`);
  }

  return (
    <>
      <div className="d-flex flex-column gap-2 w-100">
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
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </>

  );
}
