import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "./UserService";
import "./UserAdd.css";

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
    <div class="add-card">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail"
            />
            <button className="add-button" onClick={handleAdd}>➕</button>
    </div>
   </div>
  );
}

