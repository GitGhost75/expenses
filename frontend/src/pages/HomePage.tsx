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

            // if (groups.length === 1) {
            //     navigate(`/groups/${groups[0].code}`);
            // }
        }
        loadGroups();
    }, []);

    const handleNavigate = (code: string) => {
        navigate(`/groups/${code}`);
    };

    return (
        <div className="card p-4 shadow-sm max-w-2xl mx-auto">
            <div className="col-12 center mb-4 text-center">
                <h2>{t('start')}</h2>
            </div>
            {groups.length > 0 ? (
                <>
                    <div className="d-flex flex-column gap-2">
                        {groups.map((group, index) => (
                            <div key={index}>
                                <Button title="enter group" variant="outline-secondary" onClick={() => handleNavigate(group.code)}>
                                    <i> {group.name}</i>
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>{t('no_groups_found')}</div>
            )}
            <div className="d-flex flex-column gap-2 mt-4 text-center">
                <div>{t('start_info')}</div>
                <div className="d-flex flex-column gap-2">
                    <CreateGroupForm />
                    <AssignToGroupForm />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
