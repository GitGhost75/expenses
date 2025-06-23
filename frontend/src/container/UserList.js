import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../service/UserService";
import "./UserList.css";
import Button from 'react-bootstrap/Button';

export default function UserList({ refreshTrigger }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers(); // initial und bei refreshTrigger-Änderung
  }, [refreshTrigger]);

  async function loadUsers() {
    const data = await fetchUsers();
    setUsers(data);
  }

  async function handleDelete(userId) {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      alert("Fehler beim Löschen: " + error.message);
    }
  }

  return (
    <div className="user-list">
      <h2>Liste der User</h2>
      {users.length === 0 ? (
        <p>Keine User vorhanden.</p>
      ) : (
        <div className="user-cards">
          {users.map((user) => (
            <div key={user.id} className="user-card">
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              <Button className="delete-button" variant="primary" onClick={() => handleDelete(user.id)}>🗑</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
