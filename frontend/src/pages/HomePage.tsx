import React, { useEffect, useState } from "react";
import { } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fetchGroups } from '../service/GroupService';
import Button from 'react-bootstrap/Button';
import CreateGroup from "../components/groups/CreateGroup";
import AssignToGroup from "../components/groups/AssignToGroup";
import { Modal, Nav } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import { useGroup } from "../context/GroupContext";
import { GroupDto } from "../types";
import { InputGroup } from "react-bootstrap";
import { leaveGroup } from "../service/GroupService";

function HomePage() {

    const { t } = useTranslation();
    const [groups, setGroups] = useState<any[]>([]);
    const navigate = useNavigate();
    const { setGroup } = useGroup();
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function loadGroups() {
            const groups = await fetchGroups();
            setGroups(groups);
        }
        loadGroups();
        setGroup(null);
    }, [refresh]);

    async function handleLeaveGroup(group: GroupDto) {
        leaveGroup(group.code);
        setRefresh(prev => prev + 1);
    }

    const handleNavigate = (group: GroupDto) => {
        setGroup(group);
        navigate('/groups/' + group.code, { state: { group } });
    };

    return (
        <div className="card p-4 shadow-sm max-w-2xl mx-auto">
            <div className="col-12 center mb-4 text-center">
                <h2>{t('start')}</h2>
            </div>
            {groups.length > 0 ? (
                groups
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((group: GroupDto) => (
                        // <div className="w-100">
                        <div className="w-100 mb-2">
                            <InputGroup>
                                <InputGroup.Text
                                    className="flex-grow-1"
                                    style={{ background: '#fff', cursor: 'pointer' }}
                                    onClick={()=>handleNavigate(group)}
                                    
                                >
                                    {group.name}
                                </InputGroup.Text>
                                <InputGroup.Text
                                    role="button"
                                    tabIndex={0}
                                    onClick={()=>handleLeaveGroup(group)}
                                    title="Gruppe verlassen"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <i className="bi bi-building-dash"></i>
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    ))
            ) : (
                <div>{t('no_groups_found')}</div>
            )
            }
            <div className="d-flex flex-column gap-2 mt-4 text-center w-100">
                <div>{t('start_info')}</div>
                <div className="d-flex flex-column gap-2">
                    <CreateGroup />
                    <AssignToGroup />
                </div>
            </div>
        </div >
    );
}

export default HomePage;
