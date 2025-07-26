import "../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { GroupDto, UserDto, ExpenseDto, BillingDto } from "../types";
import { RefreshContext } from '../RefreshContext';
// import ButtonGroup from "./components/groups/ButtonGroup";
import { useGroup } from "../context/GroupContext";
import { NumericFormat } from 'react-number-format';
import { getExpensesForGroup } from "../service/ExpensesService";
import { getBillingsForGroup } from "../service/BillingService";
import { Calculator, Receipt } from "lucide-react";

interface GroupDetailsProps {
    group: GroupDto;
    onExit: () => void;
}

export default function GroupDetails({ group, onExit }: GroupDetailsProps) {

    // const navigate = useNavigate();
    // const [group, setGroup] = useState<GroupDto>();
    // const [loading, setLoading] = useState<boolean>(true);
    // const { groupCode } = useParams();
    const { t } = useTranslation();
    const context = useContext(RefreshContext);
    // const refreshTrigger = context?.refreshTrigger;
    // const blockRefresh = useRef(false);
    // const { setGroupName } = useGroup();
    // const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
    const [billings, setBillings] = useState<BillingDto[]>([]);

    const sortedByPayerAndReceiver = [...billings].sort((a, b) => {
        const nameCompare = a.payer.localeCompare(b.payer);
        if (nameCompare !== 0) return nameCompare;
        return a.receiver.localeCompare(b.receiver);
    });

    useEffect(() => {
        getBillingsForGroup(group.code)
            .then(billings => {
                console.log("Billings for group:", billings);
                if (Array.isArray(billings)) {
                    setBillings(billings);
                }
            });
    }, [group]);

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">{group?.name}</h2>
                {/* {loading ? (
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
                ) : ( */}
                {group && group.members.length > 0 ? (
                    group.members
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((user: UserDto) => (
                            <div
                                key={user.id}
                                className="d-flex justify-content-between align-items-center w-100 p-2 border rounded mb-2"
                                style={{ cursor: 'pointer' }}
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
                }
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"><Calculator size={24} />Zahlungen</h2>
                {billings.length > 0 ? (

                    sortedByPayerAndReceiver.map((billing, index) => {
                        return (
                            <div
                                key={group.code}
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
                    {/* {group ? (
                        <ButtonGroup group={group} />
                    ) : null} */}
                </div>
            </div>

        </div>
    );
}