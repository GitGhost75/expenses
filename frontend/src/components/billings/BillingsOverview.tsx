import { Button } from "react-bootstrap";
import { BillingDto, GroupDto } from "../../types";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBillingsForGroup } from "../../service/BillingService";
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

export default function BillingsOverview() {

    const group = useLocation().state?.group as GroupDto || {};
    const { t } = useTranslation();
    const navigate = useNavigate();
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

    function navigateBack() {
        navigate('/groups/' + group.code, { state: { group } });
    }

    return (
        <div className="card p-4 shadow-sm max-w-2xl mx-auto">
            {sortedByPayerAndReceiver.map((billing, index) => {
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
            })}
        </div >

    );
}
