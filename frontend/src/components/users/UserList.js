import React, { useEffect, useState } from "react";
import { deleteUser } from "../../service/UserService";
import "../../App.css";
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

export default function UserList({ refreshTrigger }) {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  async function loadUsers() {
//    const data = await fetchUsers();
//    setUsers(data);
  }

  async function handleDelete(userId) {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      alert(`${t('error')}: ${error.message}`);
    }
  }

  return (
    <div className="user-list">
      <h2>{t('list_user')}</h2>
      {users.length === 0 ? (
        <p>{t('no_users_available')}</p>
      ) : (
        <div className="user-cards">
          {users.map((user) => (
            <div key={user.id} className="user-card">
                <strong>{user.name}</strong>
              <Button variant="primary" onClick={() => handleDelete(user.id)}>{t('delete')}</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
