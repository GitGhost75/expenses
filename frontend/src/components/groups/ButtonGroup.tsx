import { useTranslation } from 'react-i18next';
import { Button } from "react-bootstrap";
import { GroupDto } from "../../types";
import AddUserModal from "../users/AddUserModal";
import GroupInfoModal from "./GroupInfoModal";
import RenameGroupModal from "./RenameGroupModal";
import { leaveGroup } from "../../service/GroupService";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ButtonGroup({ group }: { group: GroupDto }) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showAddUser, setShowAddUser] = useState(false);
    const [showGroupInfo, setShowGroupInfo] = useState(false);
    const [showRenameGroup, setShowRenameGroup] = useState(false);

    const handleOpenAddUser = () => { setShowAddUser(true); };

    const handleOpenGroupInfo = () => { setShowGroupInfo(true); };

    const handleRenameGroup = () => { setShowRenameGroup(true); };

    return (
        <>
            <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
                <Button title="{t('add_user')}" onClick={handleOpenAddUser}>
                    <i className="bi bi-person-add"></i>
                </Button>
                <Button title={t('show_group_info')} onClick={handleOpenGroupInfo}>
                    <i className="bi bi-info-circle"></i>
                </Button>
                <Button title="{t('rename_group')}" onClick={handleRenameGroup}>
                    <i className="bi bi-pencil"></i>
                </Button>
                <Button title={t('home')} onClick={() => navigate('/')}>
                    <i className="bi bi-house"></i>
                </Button>

                <AddUserModal group={group} show={showAddUser} onClose={() => setShowAddUser(false)} />
                <GroupInfoModal group={group} show={showGroupInfo} onClose={() => setShowGroupInfo(false)} />
                <RenameGroupModal group={group} show={showRenameGroup} onClose={() => setShowRenameGroup(false)} />
            </div>
        </>
    );
}