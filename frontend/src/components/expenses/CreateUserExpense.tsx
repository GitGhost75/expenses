import { Button } from "react-bootstrap";
import { GroupDto } from "../../types/GroupDto";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { UserDto } from "../../types/UserDto";
import { ExpenseDto } from "../../types/ExpenseDto";
import { useState } from "react";
import { createExpense } from "../../service/ExpensesService";
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

export default function CreateUserExpense() {

    const { t } = useTranslation();
    const user = useLocation().state?.user as UserDto || {};
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedAmount = parseFloat(amount);
        const parsedDate = new Date(date);

        if (isNaN(normalizedAmount) || !description || isNaN(parsedDate.getTime())) {
            alert("Bitte alle Felder korrekt ausfüllen.");
            return;
        }

        const expenseData: ExpenseDto = {
            id: "",
            amount: normalizedAmount,
            description,
            date: parsedDate,
            userId: user.id,
            groupCode: user.groupCode,
            user: user,
        }

        createExpense(expenseData)
            .then(() => {
                console.log("Ausgabe erfolgreich hinzugefügt!");
                navigate('/groups/' + user.groupCode, { state: { undefined } });
            })
    };

    function navigateBack() {
        navigate('/groups/' + user.groupCode, { state: { undefined } });
    }

    return (
        <div className="card p-4 shadow-sm max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="row g-3">

                {/* 💶 Betrag */}
                <div className="col-12">
                    <label className="form-label">Betrag</label>
                    <NumericFormat
                        value={amount}
                        onValueChange={(values) => setAmount(values.value)}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        className="form-control"
                        placeholder="1.234,56"
                    />
                </div>

                {/* 📝 Beschreibung */}
                <div className="col-12">
                    <label className="form-label">Beschreibung</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        rows={3}
                    />
                </div>

                {/* 📅 Datum */}
                <div className="col-12">
                    <label className="form-label">Datum</label>
                    <input
                        type="date"
                        value={date.toISOString().split('T')[0]}
                        onChange={(e) => setDate(new Date(e.target.value))}
                        className="form-control"
                    />
                </div>

                {/* 🖫 Speichern-Button */}
                <div className="button-container" >
                    <Button type="submit" variant="outline-secondary">
                        <i className="bi bi-pencil"></i>
                    </Button>
                </div>
            </form>
        </div>
    );
}
