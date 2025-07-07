import React, { useState, useContext } from "react";
import { renameGroup } from "../../service/GroupService";
import "../../App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RefreshContext } from '../../RefreshContext';
import {ApiErrorResponse} from '../../types/ApiErrorResponse';
import {GroupDto} from '../../types/GroupDto';
import { useTranslation } from 'react-i18next';

export default function RenameGroupForm({ groupCode }: { groupCode: string }) {
  
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);
  const { t } = useTranslation();

  async function handleRenameGroup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setName("");
    setError("");

    if (context) {
        const result : GroupDto | ApiErrorResponse = await renameGroup(groupCode, name);
        if ('error' in result) {
            setError((result as ApiErrorResponse).message);
            return;
        }

        const {setRefreshTrigger} = context;
        setRefreshTrigger(prev => prev + 1);
    }
  }

  return (
            <form onSubmit={handleRenameGroup} className="w-100">
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t('placeholder_group_name')}
                    required
                    className="flex-grow-1"
                  />
                  <Button variant="primary" type="submit">{t('rename_group')}</Button>
                </div>
                {error && <span style={{ color: "red" }}>{error}</span>}
            </form>

  );
}
