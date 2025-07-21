import { Button } from "react-bootstrap";
import { GroupDto } from "../../types/GroupDto";
import { useTranslation } from 'react-i18next';

export default function CreateExpense({ group }: { group: GroupDto }) {

    const { t } = useTranslation();

    function addExpense() {
        // TODO: Implement async logic to add an expense
        console.log("Add expense for group:", group.code);
    }

    return (
        <Button title={t('add_expense')} onClick={() => addExpense()}>
            <i className="bi bi-cash-coin"></i>
        </Button>
    );
}
