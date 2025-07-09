import "../../App.css";
import React, { useState, useContext, useEffect } from "react";
import { addMember } from "../../service/GroupService";
import { createUser } from "../../service/UserService";
import {Button, Form, InputGroup} from 'react-bootstrap';
import { RefreshContext } from '../../RefreshContext';
import {GroupDto} from '../../types/GroupDto';
import {UserDto} from '../../types/UserDto';
import { useTranslation } from 'react-i18next';
import {ApiErrorResponse} from '../../types/ApiErrorResponse';

export default function AddGroupMembersForm({ group }: { group: GroupDto }) {
  
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);
  const { t } = useTranslation();

    useEffect(() => {
        setError("");
    }, []);

//     const handleAddMember = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

        async function handleAddMember() {
        setName("");
        setError("");

        if(group && name) {
            const newUser: UserDto = {
                id: "",
                name: name,
                groupCode: group.code
            };

            const result : UserDto | ApiErrorResponse = await createUser(newUser);
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
      <>
            <div className="d-flex gap-2 w-100">
                <InputGroup>
                    <Form.Control
                      type="text"
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
        </>
  );
}
