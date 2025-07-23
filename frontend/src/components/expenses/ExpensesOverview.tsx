import { Button } from "react-bootstrap";
import { GroupDto } from "../../types/GroupDto";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { UserDto } from "../../types/UserDto";
import { ExpenseDto } from "../../types/ExpenseDto";
import { useEffect, useState } from "react";
import { getExpensesForGroup } from "../../service/ExpensesService";
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import BillingsOverview from "../billings/BillingsOverview";

export default function ExpensesOverview() {

    const group = useLocation().state?.group as GroupDto || {};
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState<ExpenseDto[]>([]);

    const sortedByNameThenDate = [...expenses].sort((a, b) => {
        const dateCompare = new Date(a.date).getDate() - new Date(b.date).getDate()
        if (dateCompare !== 0) return dateCompare;
        return a.user.name.localeCompare(b.user.name);
        // const nameCompare = a.user.name.localeCompare(b.user.name);
        // if (nameCompare !== 0) return nameCompare;
        // return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    useEffect(() => {
        getExpensesForGroup(group.code)
            .then(expenses => {
                console.log("Expenses for group:", expenses);
                if (Array.isArray(expenses)) {
                    setExpenses(expenses);
                }
            });
    }, [group]);

    function navigateBack() {
        navigate('/groups/' + group.code, { state: { group } });
    }

    return (
        <>
            <div className="card p-4 shadow-sm max-w-2xl mx-auto">
                {sortedByNameThenDate.map((expense, index) => {
                    const user = group.members.find((u) => u.id === expense.userId);

                    return (
                        <div key={index} className="w-100 mb-1">
                            <div className="d-flex justify-content-between">
                                {/* Linke Spalte: Username + Beschreibung */}
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between">
                                        <strong>{user?.name}</strong>
                                        <div className="text-end" style={{ minWidth: '100px' }}>
                                            <strong><NumericFormat
                                                value={expense.amount}
                                                displayType={'text'}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                decimalScale={2}
                                                fixedDecimalScale
                                            /></strong>
                                        </div>
                                    </div>

                                    <div>
                                        <div>{new Date(expense.date).toLocaleDateString()}&nbsp;{expense.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <Button onClick={() => navigateBack()} variant="outline-secondary">
                    <i className="bi bi-backspace" />
                </Button>

            </div>
        </>
    );
}
