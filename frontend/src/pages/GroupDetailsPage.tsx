import "../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { GroupDto, UserDto, ExpenseDto, BillingDto } from "../types";
import { fetchGroupByCode } from '../service/GroupService';
import { RefreshContext } from '../RefreshContext';
import Placeholder from 'react-bootstrap/Placeholder';
import ButtonGroup from "../components/groups/ButtonGroup";
import { useGroup } from "../context/GroupContext";
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { getExpensesForGroup } from "../service/ExpensesService";
import { getBillingsForGroup } from "../service/BillingService";

export default function GroupDetailsPage() {

    const navigate = useNavigate();
    const [group, setGroup] = useState<GroupDto>();
    const [loading, setLoading] = useState<boolean>(true);
    const { groupCode } = useParams();
    const { t } = useTranslation();
    const context = useContext(RefreshContext);
    const refreshTrigger = context?.refreshTrigger;
    const blockRefresh = useRef(false);
    const { setGroupName } = useGroup();
    const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
    const [billings, setBillings] = useState<BillingDto[]>([]);

    const sortedByPayerAndReceiver = [...billings].sort((a, b) => {
        const nameCompare = a.payer.localeCompare(b.payer);
        if (nameCompare !== 0) return nameCompare;
        return a.receiver.localeCompare(b.receiver);
    });

    useEffect(() => {
        getBillingsForGroup(groupCode!!)
            .then(billings => {
                console.log("Billings for group:", billings);
                if (Array.isArray(billings)) {
                    setBillings(billings);
                }
            });
    }, [group]);

    useEffect(() => {
        async function loadGroup() {
            if (blockRefresh.current) {
                blockRefresh.current = false;
                setLoading(false);
                return;
            }

            setLoading(true);

            if (groupCode) {
                console.log(`Load group: ${groupCode}`);
                const result = await fetchGroupByCode(groupCode);
                if ('error' in result) {
                    setLoading(false);
                    return;
                }
                setGroup(result);
                setGroupName(result.name);
            }
            setLoading(false);
        }
        loadGroup();
    }, [groupCode, refreshTrigger]);

    useEffect(() => {
        getExpensesForGroup(groupCode!!)
            .then(expenses => {
                console.log("Expenses for group:", expenses);
                if (Array.isArray(expenses)) {
                    setExpenses(expenses);
                }
            });
    }, [group]);

    const editUser = (user: UserDto) => {
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">{group?.name}</h2>
                {loading ? (
                    <>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                <Placeholder as="div" animation="wave">
                                    <Placeholder xs={3} style={{ height: 32, width: 32, borderRadius: "50%", marginRight: 12 }} />
                                </Placeholder>
                                <Placeholder as="div" animation="wave" style={{ flex: 1 }}>
                                    <Placeholder xs={8} style={{ height: 24, borderRadius: 6 }} />
                                </Placeholder>
                                <Placeholder as="div" animation="wave">
                                    <Placeholder xs={1} style={{ height: 24, width: 24, borderRadius: "50%" }} />
                                </Placeholder>
                            </div>
                        ))}
                    </>
                ) : (
                    group && group.members.length > 0 ? (
                        group.members
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((user: UserDto) => (
                                <div
                                    key={user.id}
                                    className="d-flex justify-content-between align-items-center w-100 p-2 border rounded mb-2"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate('/users/edit', { state: { user } })}
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <span className="flex-grow-1 text-start">{user.name}</span>
                                        <span className="text-end">
                                            <strong>
                                                <NumericFormat
                                                    value={user.balance}
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
                            <div>{t('no_users_in_group')}</div>
                        </div>
                    )
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Ausgaben</h2>
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
                                        <span className="me-3 text-truncate" style={{ width: '120px' }}>{expense.user.name}</span>
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
                            <div>Keine Ausgaben vorhanden</div>
                        </div>
                    )
                }

            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Zahlungen</h2>
                {billings.length > 0 ? (

                    sortedByPayerAndReceiver.map((billing, index) => {
                        return (
                            <div
                                key={groupCode}
                                className="d-flex justify-content-between align-items-center w-100 p-2 border rounded mb-2"
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="flex-fill text-truncate">{billing.payer} an {billing.receiver}</span>
                                <span className="text-end" style={{ minWidth: '100px' }}>
                                    <strong>
                                        <NumericFormat
                                            value={billing.amount}
                                            displayType={'text'}
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            decimalScale={2}
                                            fixedDecimalScale
                                        /> €
                                    </strong>
                                </span>
                            </div>
                        )
                    })
                ) : (
                    <div className="d-flex flex-column gap-2 mt-4 text-center w-100">
                        <div>Keine Zahlungen vorhanden</div>
                    </div>
                )}
            </div >

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <div className="d-flex flex-column gap-2 mt-4 text-center w-100">
                    {group ? (
                        <ButtonGroup group={group} />
                    ) : null}
                </div>
            </div>

        </div>
    );
}