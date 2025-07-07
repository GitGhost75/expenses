import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import "../App.css";
import { useTranslation } from 'react-i18next';
import {GroupDto} from '../types/GroupDto'
import {UserDto} from '../types/UserDto';
import {fetchGroupByCode, leaveGroup} from '../service/GroupService';
import { RefreshContext } from '../RefreshContext';
import RenameGroupForm from '../components/groups/RenameGroupForm'
import GroupMembersForm from '../components/groups/GroupMembersForm'
import GroupInfoForm from '../components/groups/GroupInfoForm'

export default function GroupPage() {

    const [group, setGroup] = useState<GroupDto>();
    const { groupCode } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const context = useContext(RefreshContext);
    const refreshTrigger = context?.refreshTrigger;

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
      }, [groupCode, refreshTrigger]);

    const handleLeaveGroup = async(e: any) => {
        e.preventDefault();
        console.log(`leave group ${groupCode}`);

        if (!groupCode) {
            console.error(`No groupcode provided to leave group`);
            return;
        }
        leaveGroup(groupCode);
        navigate('/');

        if (!context) {
          throw new Error("RefreshContext must be used within a RefreshContext.Provider");
        }
        const {setRefreshTrigger} = context;
        setRefreshTrigger(prev => prev + 1);


    }

    return(
        <>
            <div className="add-border">
                <div className="user-cards">
                    {group && group.members.sort((a, b) => a.name.localeCompare(b.name)).map((user: UserDto) => (
                        <div className="user-card" key={user.id}>
                            <strong>{user.name}</strong>
                        </div>
                    ))}
                </div>
            </div>

            {group && (
                <div className="add-border ">
                    <div className="user-card">
                        <GroupMembersForm group={group} />
                    </div>
                </div>
            )}

            {groupCode && (
                <div className="add-border ">
                    <div className="user-card">
                        <RenameGroupForm groupCode={groupCode} />
                    </div>
                </div>
            )}

            {group && (
                <div className="add-border ">
                    <div className="user-card">
                        <GroupInfoForm group={group} />
                    </div>
                </div>
            )}

            <div className="add-border">
                <div className="user-card text-center">
                    <Button className="delete-button"  variant="secondary" onClick={handleLeaveGroup}>{t('leave_group')}</Button>
                </div>
            </div>

        </>
        );
}