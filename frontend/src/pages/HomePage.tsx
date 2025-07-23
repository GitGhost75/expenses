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
import { GroupDto } from '../types/GroupDto';

function HomePage() {

    const { t } = useTranslation();
    const [groups, setGroups] = useState<any[]>([]);
    const navigate = useNavigate();
    const { setGroupName } = useGroup();

    useEffect(() => {
        async function loadGroups() {
            const groups = await fetchGroups();
            setGroups(groups);
        }
        loadGroups();
        setGroupName("");
    }, []);

    const handleNavigate = (group: GroupDto) => {
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
                        <div
                            key={group.code}
                            className="d-flex justify-content-between align-items-center w-100 p-2 border rounded mb-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleNavigate(group)}
                        >
                            <div className="d-flex justify-content-between w-100">
                                <span className="flex-grow-1 text-start">{group.name}</span>
                            </div>
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
