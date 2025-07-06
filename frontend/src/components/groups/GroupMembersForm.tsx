import React, { useState, useContext } from "react";
import { addMember } from "../../service/GroupService";
import "../../App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RefreshContext } from '../../RefreshContext';

import {GroupDto} from '../../types/GroupDto';
import { useTranslation } from 'react-i18next';

export default function GroupMembersForm({ group }: { group: GroupDto }) {
  
  const [name, setName] = useState("");
  const context = useContext(RefreshContext);
  const { t } = useTranslation();

    const handleAddMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`add member ${name}`);

        if(!group) {
            console.error(`Group not available`);
            return;
        }

        if(!name){
            console.error(`Name is missing`);
            return;
        }
        await addMember(name, group);
        setName("");

         if (context) {
             const { setRefreshTrigger } = context;
             setRefreshTrigger(prev => prev + 1);
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
        </form>

  );
}
