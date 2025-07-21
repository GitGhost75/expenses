import { useTranslation } from 'react-i18next';
import { Button } from "react-bootstrap";
import { GroupDto } from "../../types/GroupDto";
import AddUserModal from "../users/AddUserModal";
import GroupInfoForm from "./GroupInfoForm";
import RenameGroupModal from "./RenameGroupModal";
import { leaveGroup } from "../../service/GroupService";
import { useNavigate } from 'react-router-dom';
import CreateExpense from '../expenses/CreateExpense';

export default function ButtonGroup({ group }: { group: GroupDto }) {

    const navigate = useNavigate();
    const { t } = useTranslation();

    async function handleLeaveGroup() {

        if (group.code) {
            await leaveGroup(group.code);
            navigate('/');
        }
    }

    const navigateToExpense = () => {
        navigate('/expenses/create', {state: { group } });
    }

    return (
        <>
            {/* <CreateExpense group={group} /> */}
            <Button title={t('add_expense')} onClick={navigateToExpense}>
                <i className="bi bi-cash-coin"></i>
            </Button>
            <AddUserModal group={group} />
            <GroupInfoForm group={group} />
            <RenameGroupModal group={group} />
            <Button title={t('leave_group')} onClick={handleLeaveGroup}>
                <i className="bi bi-box-arrow-right"></i>
            </Button>
        </>
    );
}