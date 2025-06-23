import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "../service/UserService";
import "./UserAdd.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function UserAdd({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const newUser = await addUser({ name, email });
      setName("");
      setEmail("");
      onUserAdded();
    } catch (err) {
          setError(err.message);
    }
  };

  return (
  <div class="add-border">
  <h2>User hinzufügen</h2>
    <div class="add-card">
            <Form.Control type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <Form.Control type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
            <Button variant="primary" onClick={handleAdd}>👈</Button>
    </div>
   </div>
  );
}

