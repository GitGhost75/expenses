import React, { useEffect, useState } from "react";
import { fetch, delete } from "../service/GroupService";
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

export default function GroupList({ refreshTrigger }) {
  const [groups, setGroups] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    loadGroups();
  }, [refreshTrigger]);

  async function loadGroups() {
    const data = await fetch();
    setGroups(data);
  }

  async function handleDelete(id) {
    try {
      await delete(id);
      setGroups(groups.filter((group) => group.id !== id));
    } catch (error) {
      alert(`${t('error')}: ${error.message}`);
    }
  }

  return (
    <div>
      <h2>{t('list_groups')}</h2>
      {users.length === 0 ? (
        <p>{t('no_groups_available')}</p>
      ) : (
        <div>
          {users.map((user) => (
            <div key={group.id}>
                <strong>{group.name}</strong>
                <small>{group.members}</small>
              <Button variant="primary" onClick={() => handleDelete(group.id)}>{t('delete')}</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
