import { Button } from "react-bootstrap";
import { GroupDto } from "../../types/GroupDto";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { BillingDto } from "../../types/BillingDto";
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
        const nameCompare = a.payer.name.localeCompare(b.payer.name);
        if (nameCompare !== 0) return nameCompare;
        return a.receiver.name.localeCompare(b.receiver.name);
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
                    <div key={index} className="w-100 mb-1">
                        <div className="d-flex justify-content-between">
                            {/* Linke Spalte: Username + Beschreibung */}
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    {billing.payer.name} an {billing.receiver.name}
                                    <div className="text-end" style={{ minWidth: '100px' }}>
                                        <strong><NumericFormat
                                            value={billing.amount}
                                            displayType={'text'}
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            decimalScale={2}
                                            fixedDecimalScale
                                        /></strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <Button onClick={() => navigateBack()}>
                <i className="bi bi-back" />
            </Button>
        </div>

    );
}
