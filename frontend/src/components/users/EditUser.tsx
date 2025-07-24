import "../../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useContext, useEffect, useRef } from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ApiErrorResponse, ExpenseDto, UserDto } from "../../types";
import { RefreshContext } from '../../RefreshContext';
import { useLocation } from "react-router-dom";
import { getExpensesForGroup } from "../../service/ExpensesService";
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../../service/UserService';
import { NumericFormat } from 'react-number-format';

export default function EditUser() {

  const user = useLocation().state?.user as UserDto;
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user.name);
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const navigate = useNavigate();

  async function handleRename() {

    user.name = name;
    const result: UserDto | ApiErrorResponse = await updateUser(user);
    if ('error' in result) {
      setError((result as ApiErrorResponse).message);
      return;
    }
    // setUser = result;

    if (context) {
      const { setRefreshTrigger } = context;
      setRefreshTrigger(prev => prev + 1);
    }
    setShow(false);
  }

  useEffect(() => {
    getExpensesForGroup(user.groupCode)
      .then(expenses => {
        console.log("Expenses for group:", expenses);
        if (Array.isArray(expenses)) {
          expenses = expenses.filter(expense => expense.userId === user.id);
          setExpenses(expenses);
        }
      });
  }, [user]);

  function navigateBack() {
    navigate('/groups/' + user.groupCode, { state: { undefined } });
  }

  async function handleDeleteUser(id: string) {
    await deleteUser(id);
    if (context) {
      const { setRefreshTrigger } = context;
      setRefreshTrigger(prev => prev + 1);
    }
    navigate('/groups/' + user.groupCode, { state: { undefined } });
  }

  return (

    <div className="card p-4 shadow-sm max-w-2xl mx-auto">
      <div className="d-flex gap-2 w-100 bm-2 rounded">
        <InputGroup>
          <Form.Control
            type="text"
            ref={inputRef}
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
            }}
            placeholder={user.name}
            required
          />
          <InputGroup.Text
            role="button"
            tabIndex={0}
            onClick={handleRename}
            title="Benutzer umbenennen"
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-pencil"></i>
          </InputGroup.Text>
        </InputGroup>
      </div>
      {error && <span style={{ color: "red" }}>{error}</span>}

      {expenses.length > 0 && (
        <div className="d-flex flex-column gap-2 mt-4 text-center w-100">
          <div>Expenses</div>
        </div>
      )}

      {
        expenses.length > 0 ? (
          expenses
            .sort((a, b) => a.date > b.date ? 1 : -1)
            .map((expense) => (
              <div
                key={user.id}
                className="d-flex justify-content-between align-items-center w-100 p-2 border rounded mb-2"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/expenses/edit', { state: { expense } })}
              >
                <div className="d-flex justify-content-between w-100">
                  <span className="me-3">{new Date(expense.date).toLocaleDateString()}</span>
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

      <div className="d-flex flex-row gap-2 mt-4 text-center">
        {
          expenses.length === 0 && (
            <Button title="delete user" variant="outline-secondary" onClick={() => handleDeleteUser(user.id)}>
              <i className="bi bi-person-dash"></i>
            </Button>
          )
        }
        <Button onClick={() => navigate('/expenses/create', { state: { user } })} variant="outline-secondary">
          <i className="bi bi-cash-coin" />
        </Button>
      </div>
    </div>

  );
}
