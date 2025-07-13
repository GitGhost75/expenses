import "../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useRef, useEffect, useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { GroupDto } from '../types/GroupDto'
import { UserDto } from '../types/UserDto';
import { fetchGroupByCode, leaveGroup } from '../service/GroupService';
import { deleteUser } from '../service/UserService';
import { RefreshContext } from '../RefreshContext';
import RenameGroupModal from '../components/groups/RenameGroupModal'
import GroupInfoForm from '../components/groups/GroupInfoForm'
import EditUserModal from '../components/users/EditUserModal'
import AddUserModal from '../components/users/AddUserModal'

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

    async function handleLeaveGroup() {

        if (groupCode) {
            await leaveGroup(groupCode);
            blockRefresh.current = true;

            if (context) {
                const { setRefreshTrigger } = context;
                setRefreshTrigger(prev => prev + 1);
            }
            navigate('/');
        }
    }

    async function handleDeleteUser(id: string) {
        await deleteUser(id);
        if (context) {
            const { setRefreshTrigger } = context;
            setRefreshTrigger(prev => prev + 1);
        }
    }

    return (
        <>
            {group && (
                <div>
                    <div className="card">{group.name}</div>
                    {group.members.sort((a, b) => a.name.localeCompare(b.name)).map((user: UserDto) => (
                        <div className="user-card" key={user.id} >
                            <div style={{ width: '100%' }}>{user.name}</div>
                            <EditUserModal user={user} />
                            <Button title="delete user" variant="outline-secondary" onClick={() => handleDeleteUser(user.id)}>
                                <i className="bi bi-person-x"></i>
                            </Button>
                        </div>
                    ))}
                    <div className="button-container">
                        <AddUserModal group={group} />
                        <GroupInfoForm group={group} />
                        <RenameGroupModal group={group} />
                        <Button title={t('leave_group')} onClick={handleLeaveGroup}>
                            <i className="bi bi-box-arrow-right"></i>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}