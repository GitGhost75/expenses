import { Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { ExpenseDto } from "../../types";
import { useEffect, useState } from "react";
import { updateExpense } from "../../service/ExpensesService";
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

export default function EditUserExpense() {

    const { t } = useTranslation();
    const expense = useLocation().state?.expense as ExpenseDto || {};
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date>(() => new Date());
    const navigate = useNavigate();

    useEffect(() => {
        setAmount(expense.amount);
        setDescription(expense.description);
        setDate(new Date(expense.date));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // const normalizedAmount = parseFloat(amount);
        const parsedDate = new Date(date);

        if (isNaN(amount) || !description || isNaN(parsedDate.getTime())) {
            alert("Bitte alle Felder korrekt ausfüllen.");
            return;
        }

        expense.amount = amount;
        expense.date = parsedDate;
        expense.description = description;

        updateExpense(expense)
            .then(() => {
                console.log("Ausgabe erfolgreich aktualisiert!");
                navigate('/users/edit', { state: { user: expense.user } });
            })
    };

    function navigateBack() {
        navigate('/groups/' + expense.groupCode, { state: { undefined } });
    }

    return (
        <div className="card p-4 shadow-sm max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="row g-3">

                {/* 💶 Betrag */}
                <div className="col-12">
                    <label className="form-label">Betrag</label>
                    <NumericFormat
                        value={amount}
                        onValueChange={(values) => {
                            const raw = parseFloat(values.value); // string → number
                            setAmount(isNaN(raw) ? 0 : raw);      // falls leer, fallback auf 0
                        }}
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
