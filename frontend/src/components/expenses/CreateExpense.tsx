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

export default function CreateExpense() {

    const { t } = useTranslation();
    const group = useLocation().state?.group as GroupDto || {};
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedAmount = parseFloat(amount);
        const parsedDate = new Date(date);

        if (isNaN(normalizedAmount) || !description || !userId || isNaN(parsedDate.getTime())) {
            alert("Bitte alle Felder korrekt ausfüllen.");
            return;
        }

        const expenseData: ExpenseDto = {
            id: "",
            amount: normalizedAmount,
            description,
            date: parsedDate,
            userId,
            groupCode: group.code
        }
        createExpense(expenseData)
            .then(() => {
                console.log("Ausgabe erfolgreich hinzugefügt!");
                navigate('/groups/' + group.code, { state: { group } });
            })
    };

    function navigateBack() {
        navigate('/groups/' + group.code, { state: { group } });
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* 👤 Benutzer */}
                <div className="col-12">
                    <label className="form-label">Benutzer</label>
                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="form-select"
                    >
                        <option value="">-- bitte wählen --</option>
                        {group.members.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 🖫 Speichern-Button */}
                <div className="col-12 d-flex justify-content-end">
                    <Button type="submit" variant="outline-secondary">
                        <i className="bi bi-save me-2" /> Speichern
                    </Button>
                    <Button variant="outline-secondary" onClick={() => navigateBack()} className="ms-2">
                        <i className="bi bi-back me-2" /> Zurück
                    </Button>
                </div>
            </form>
        </div>
    );
}
