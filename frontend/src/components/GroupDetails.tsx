import "../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { GroupDto, UserDto, ExpenseDto, BillingDto } from "../types";
// import ButtonGroup from "./components/groups/ButtonGroup";
import { NumericFormat } from 'react-number-format';
import { getBillingsForGroup } from "../service/BillingService";
import { Calculator } from "lucide-react";

interface GroupDetailsProps {
    group: GroupDto;
}

export default function GroupDetails({ group }: GroupDetailsProps) {

    const { t } = useTranslation();
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
        </div>
    );
}