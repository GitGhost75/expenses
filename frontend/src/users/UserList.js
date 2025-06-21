import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "./UserService";
import "./UserList.css";

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
      <h2>Benutzer</h2>
      {users.length === 0 ? (
        <p>Keine Benutzer vorhanden.</p>
      ) : (
        <div className="user-cards">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div>
                <strong>{user.name}</strong>&nbsp;&nbsp;
                <small>{user.email}</small>
              </div>
              <button className="delete-button" onClick={() => handleDelete(user.id)}>
                ➖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
