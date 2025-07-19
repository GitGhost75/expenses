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
import Placeholder from 'react-bootstrap/Placeholder';

export default function GroupDetailsPage() {

    const [group, setGroup] = useState<GroupDto>();
    const [loading, setLoading] = useState<boolean>(true);
    const { groupCode } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const context = useContext(RefreshContext);
    const refreshTrigger = context?.refreshTrigger;
    const blockRefresh = useRef(false);

    useEffect(() => {
        async function loadGroup() {
            if (blockRefresh.current) {
                blockRefresh.current = false;
                setLoading(false);
                return;
            }

            setLoading(true);

            if (groupCode) {
                console.log(`Load group: ${groupCode}`);
                const result = await fetchGroupByCode(groupCode);
                if ('error' in result) {
                    setLoading(false);
                    return;
                }
                setGroup(result);
            }
            setLoading(false);
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
            {/* Gruppenname: Skeleton oder echter Name */}
            <div className="card" style={{ marginBottom: 24 }}>
                {loading ? (
                    <Placeholder as="div" animation="wave">
                        <Placeholder xs={6} style={{ height: 28, borderRadius: 8 }} />
                    </Placeholder>
                ) : (
                    group?.name
                )}
            </div>

            {/* User-Liste: Skeleton oder echte User */}
            <div>
                {loading ? (
                    <>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                <Placeholder as="div" animation="wave">
                                    <Placeholder xs={3} style={{ height: 32, width: 32, borderRadius: "50%", marginRight: 12 }} />
                                </Placeholder>
                                <Placeholder as="div" animation="wave" style={{ flex: 1 }}>
                                    <Placeholder xs={8} style={{ height: 24, borderRadius: 6 }} />
                                </Placeholder>
                                <Placeholder as="div" animation="wave">
                                    <Placeholder xs={1} style={{ height: 24, width: 24, borderRadius: "50%" }} />
                                </Placeholder>
                            </div>
                        ))}
                    </>
                ) : (
                    group && group.members.length > 0 ? (
                        group.members
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((user: UserDto) => (
                                <div className="user-card" key={user.id}>
                                    <div style={{ width: '100%' }}>{user.name}</div>
                                    <EditUserModal user={user} />
                                    <Button title="delete user" variant="outline-secondary" onClick={() => handleDeleteUser(user.id)}>
                                        <i className="bi bi-person-x"></i>
                                    </Button>
                                </div>
                            ))
                    ) : (
                        <div className="card">{t('no_users_in_group')}</div>
                    )
                )}
            </div>

            <div className="button-container" style={{ marginTop: 24 }}>
                {loading ? (
                    <>
                        {[1, 2, 3, 4].map(i => (
                            <Placeholder key={i} as="span" animation="wave">
                                <Placeholder xs={1} style={{ height: 36, width: 36, borderRadius: "50%", marginRight: 12 }} />
                            </Placeholder>
                        ))}
                    </>
                ) : group ? (
                    <>
                        <AddUserModal group={group} />
                        <GroupInfoForm group={group} />
                        <RenameGroupModal group={group} />
                        <Button title={t('leave_group')} onClick={handleLeaveGroup}>
                            <i className="bi bi-box-arrow-right"></i>
                        </Button>
                    </>
                ) : null}
            </div>
        </>
    );
}