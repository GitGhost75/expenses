import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "../service/UserService";
import "./UserAdd.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

export default function UserAdd({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  const handleAdd = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset

      const newUser = await addUser({ name, email });

      if (newUser.ok) {
            setName("");
            setEmail("");
            onUserAdded();
      } else {
            const errorBody = await newUser.json();

          // Strukturierte Fehler auswerten
          if (errorBody.validationErrors) {
            setErrors(errorBody.validationErrors);
          } else {

            alert(`${t('error')}: ${errorBody.message}`);
          }
      }
  };

  return (
  <div class="add-border">
  <h2>{t('add_user')}</h2>
    <div class="add-card">
            <Form.Control type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('placeholder_name')}
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
            <Form.Control type="email"
              placeholder={t('placeholder_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
            <Button variant="primary" onClick={handleAdd}>{t('add')}</Button>
    </div>
   </div>
  );
}

