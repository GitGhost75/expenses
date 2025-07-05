import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('list_groups')}</h2>
      {groups.length === 0 ? (<p>{t('no_groups_available')}</p>) : (
        <div>
            <ul>
                {groups.map(g => <li key={g.id}>{g.name}</li>)}
            </ul>
        </div>
      )}
    </div>
  );
}
