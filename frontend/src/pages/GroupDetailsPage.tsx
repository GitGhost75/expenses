import { useParams, useNavigate } from 'react-router-dom';
import React, { useRef, useEffect, useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import "../App.css";
import { useTranslation } from 'react-i18next';
import {GroupDto} from '../types/GroupDto'
import {UserDto} from '../types/UserDto';
import {fetchGroupByCode, leaveGroup} from '../service/GroupService';
import { RefreshContext } from '../RefreshContext';
import RenameGroupForm from '../components/groups/RenameGroupForm'
import AddGroupMembersForm from '../components/groups/AddGroupMembersForm'
import GroupInfoForm from '../components/groups/GroupInfoForm'

export default function GroupDetailsPage() {

    const [group, setGroup] = useState<GroupDto>();
    const { groupCode } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const context = useContext(RefreshContext);
    const refreshTrigger = context?.refreshTrigger;
    const blockRefresh = useRef(false);

      useEffect(() => {
          async function loadGroup() {

              if (blockRefresh.current) {
                  blockRefresh.current = false; // Reset für zukünftige Änderungen
                  return;
                }

              if (groupCode) {
                  console.log(`Load group: ${groupCode}`);
                  const group = await fetchGroupByCode(groupCode);
                  if (group) {
                      setGroup(group);
                  }
              }
          }
          loadGroup();
      }, [groupCode, refreshTrigger]);

    const handleLeaveGroup = async(e: any) => {
        e.preventDefault();

        if (groupCode) {
            await leaveGroup(groupCode);
            blockRefresh.current = true;

            if (context) {
                const {setRefreshTrigger} = context;
                setRefreshTrigger(prev => prev + 1);
            }
            navigate('/');
        }
    }

    return(
        <>
            {group && (
                <div className="add-border">
                    <div className="user-cards">
                        {group.name}
                    </div>
                </div>
            )}

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
                        <AddGroupMembersForm group={group} />
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
                    <Button  variant="secondary" onClick={handleLeaveGroup}>{t('leave_group')}</Button>
                </div>
            </div>

        </>
        );
}