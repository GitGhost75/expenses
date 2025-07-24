import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { ExpenseDto, GroupDto } from "../../types";
import { useEffect, useState } from "react";
import { getExpensesForGroup } from "../../service/ExpensesService";
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

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
                {
                    expenses.length > 0 ? (
                        expenses
                            .sort((a, b) => a.user.name.localeCompare(b.user.name))
                            .map((expense) => (
                                <div
                                    key={expense.id}
                                    className="d-flex justify-content-between align-items-center w-100 p-2 border rounded mb-2"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate('/expenses/edit', { state: { expense } })}
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        {/* <span className="me-3">{new Date(expense.date).toLocaleDateString()}</span> */}
                                        <span className="me-3 text-truncate" style={{ width: '80px' }}>{expense.user.name}</span>
                                        <span className="flex-fill text-truncate">{expense.description}</span>
                                        <span className="text-end" style={{ width: '100px' }}>
                                            <strong>
                                                <NumericFormat
                                                    value={expense.amount}
                                                    displayType={'text'}
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    decimalScale={2}
                                                    fixedDecimalScale
                                                /> €
                                            </strong>
                                        </span>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="d-flex flex-column gap-2 mt-4 text-center w-100">
                            <div>No expenses found for this user.</div>
                        </div>
                    )
                }

            </div>
        </>
    );
}
