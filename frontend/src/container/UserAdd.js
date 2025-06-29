import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "../service/UserService";
import "./UserAdd.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

export default function UserAdd({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { t } = useTranslation();

  const handleAdd = async (e) => {
    e.preventDefault();
    setErrors("");
    setValidationErrors({});

      const newUser = await addUser({ name, email });

      if (newUser.ok) {
            setName("");
            setEmail("");
            onUserAdded();
      } else {
            const errorBody = await newUser.json();

          // Strukturierte Fehler auswerten
          if (errorBody.validationErrors) {
            setValidationErrors(errorBody.validationErrors);
          } else {
            setErrors(errorBody.message);
          }
      }
  };

  return (
  <div class="add-border">
  <h2>{t('add_user')}</h2>
    <div class="add-card">
        <div>
            <Form.Control type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('placeholder_name')}
            />
            {validationErrors.name && <span style={{ color: "red" }}>{validationErrors.name}</span>}
        </div>
        <div>
            <Form.Control type="email"
              placeholder={t('placeholder_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validationErrors.email && <span style={{ color: "red" }}>{validationErrors.email}</span>}
        </div>
        <div style={{valign:"top"}}>
            <Button variant="primary" onClick={handleAdd}>{t('add')}</Button>
        </div>
    </div>
    <div>
        {errors && <span style={{ color: "red" }}>{errors}</span>}
    </div>
   </div>
  );
}

