import React, { useState, useContext } from "react";
import { addMember } from "../../service/GroupService";
import "../../App.css";
import {Button, Form} from 'react-bootstrap';
import { RefreshContext } from '../../RefreshContext';
import {GroupDto} from '../../types/GroupDto';
import { useTranslation } from 'react-i18next';
import {ApiErrorResponse} from '../../types/ApiErrorResponse';

export default function GroupMembersForm({ group }: { group: GroupDto }) {
  
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);
  const { t } = useTranslation();

    const handleAddMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setName("");
        setError("");

        if(group && name) {
            const result : GroupDto | ApiErrorResponse = await addMember(name, group);
            if ('error' in result) {
                setError((result as ApiErrorResponse).message);
                return;
            }

             if (context) {
                 const { setRefreshTrigger } = context;
                 setRefreshTrigger(prev => prev + 1);
            }
        }
    }

  return (
        <form onSubmit={handleAddMember} className="w-100">
            <div className="d-flex gap-2">
                <Form.Control type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('placeholder_name')}
                  className="flex-grow-1"
                />
                <Button className="add-button" type="submit" variant="primary" >{t('add_user')}</Button>
            </div>
            {error && <span style={{ color: "red" }}>{error}</span>}
        </form>

  );
}
