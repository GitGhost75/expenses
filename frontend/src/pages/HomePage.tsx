import React, { useEffect, useState } from "react";
import { } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fetchGroups } from '../service/GroupService';
import Button from 'react-bootstrap/Button';
import CreateGroupForm from "../components/groups/CreateGroupForm";
import AssignToGroupForm from "../components/groups/AssignToGroupForm";
import { Modal, Nav } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';

function HomePage() {

    const { t } = useTranslation();
    const [groups, setGroups] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadGroups() {
            const groups = await fetchGroups();
            setGroups(groups);

            if (groups.length === 1) {
                navigate(`/groups/${groups[0].code}`);
            }
        }
        loadGroups();
    }, []);

    const handleNavigate = (code: string) => {
        navigate(`/groups/${code}`);
    };

    return (
        <div>
            <div className="card">
                <div>
                    <h2>{t('start')}</h2>
                </div>
            </div>
            {groups.length > 1 ? (
                <>
                    <div>
                        {groups.map((group, index) => (
                            <div className="card" key={index}>
                                <Button title="enter group" variant="outline-secondary" onClick={() => handleNavigate(group.code)}>
                                    <i className="bi bi-building"> {group.name}</i>
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h2>{t('no_groups_found')}</h2>
            )}
            <div>
                <div className="card">
                    {t('start_info')}
                </div>
                <div>
                    <div className="user-card">
                        <CreateGroupForm />
                    </div>
                    <div className="user-card">
                        <AssignToGroupForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
