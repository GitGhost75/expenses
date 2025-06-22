import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "./UserService";
import "./UserAdd.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function UserAdd({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!email.trim()) return;
    const newUser = await addUser({ name, email });

    setName("");
    setEmail("");
    onUserAdded(); // 👈 Nach erfolgreichem POST
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
            <Button variant="primary" onClick={handleAdd}>👈</Button>
    </div>
   </div>
  );
}

