import { useTranslation } from 'react-i18next';
import { Button } from "react-bootstrap";
import { GroupDto } from "../../types/GroupDto";
import AddUserModal from "../users/AddUserModal";
import GroupInfoModal from "./GroupInfoModal";
import RenameGroupModal from "./RenameGroupModal";
import { leaveGroup } from "../../service/GroupService";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ButtonGroup({ group }: { group: GroupDto }) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showGroupInfo, setShowGroupInfo] = useState(false);
    const [showRenameGroup, setShowRenameGroup] = useState(false);

    async function handleLeaveGroup() {
        if (group.code) {
            leaveGroup(group.code);
            navigate('/');
        }
    }

    const navigateToExpense = () => {
        navigate('/expenses/create', { state: { group } });
    }

    const handleOpenAddUserModal = () => {
        setShowAddUserModal(true);
    };

    const handleOpenGroupInfo = () => {
        setShowGroupInfo(true);
    };

    const handleRenameGroup = () => {
        setShowRenameGroup(true);
    };

    return (
        <>
            {/* <CreateExpense group={group} /> */}
            <Button title={t('add_expense')} onClick={navigateToExpense}>
                <i className="bi bi-cash-coin"></i>
            </Button>
            <Button title="{t('add_user')}" onClick={handleOpenAddUserModal}>
                <i className="bi bi-person-add"></i>
            </Button>
            <Button title={t('show_group_info')} onClick={handleOpenGroupInfo}>
                <i className="bi bi-info-circle"></i>
            </Button>
            <Button title="{t('rename_group')}" onClick={handleRenameGroup}>
                <i className="bi bi-pencil"></i>
            </Button>
            <Button title={t('leave_group')} onClick={handleLeaveGroup}>
                <i className="bi bi-box-arrow-right"></i>
            </Button>
            <Button title={t('home')} onClick={()=> navigate('/')}>
                <i className="bi bi-house"></i>
            </Button>

            <AddUserModal group={group} show={showAddUserModal} onClose={() => setShowAddUserModal(false)} />
            <GroupInfoModal group={group} show={showGroupInfo} onClose={() => setShowGroupInfo(false)} />
            <RenameGroupModal group={group} show={showRenameGroup} onClose={() => setShowRenameGroup(false)} />
        </>
    );
}