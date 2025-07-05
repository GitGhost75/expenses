import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../App.css";
import { useTranslation } from 'react-i18next';
import {GroupDto} from '../types/GroupDto'
import {UserDto} from '../types/UserDto';
import {fetchGroupByCode, addMember} from '../service/GroupService';


export default function GroupPage() {

    const [name, setName] = useState("");
    const [group, setGroup] = useState<GroupDto>();
    const { groupCode } = useParams();
    const { t } = useTranslation();

      useEffect(() => {
          console.log("enter GroupPage");
          async function loadGroup() {
              if (!groupCode) {
                  console.error("ERROR");
                  return;
              }
              console.log(`Load group: ${groupCode}`);
              const group = await fetchGroupByCode(groupCode);
              setGroup(group);
          }
          loadGroup();
      }, [groupCode]);

    const handleAddMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`add member ${name}`);

        if(!group) {
            console.error(`Group not available`);
            return;
        }
        const savedGroup = await addMember(name, group);
        setName("");
        setGroup(savedGroup);
    }


    const leaveGroup = async(e: any) => {
        e.preventDefault();
        console.log(`leave group ${groupCode}`);


        // user austragen

        // localstorage updaten


    }

    return(
        <>
            <div>Details zur Gruppe: {groupCode}</div>

            <div>
                <div>Liste der Mitglieder</div>
                <div>
                    {group && group.members.map((user: UserDto) => (
                        <div key={user.id}>
                            <strong>{user.name}</strong>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div>Mitglied hinzufügen</div>
                <form onSubmit={handleAddMember}>
                    <Form.Control type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('placeholder_name')}
                    />
                    <div>
                        <br/>
                        <Button type="submit" variant="primary">{t('add_user')}</Button>
                    </div>
                </form>
            </div>
            <div>
                <br/>
                <Button variant="primary" onClick={leaveGroup}>{t('leave_group')}</Button>
            </div>

        </>
        );
}