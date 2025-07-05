import React, { useState, useContext } from "react";
import { createGroup } from "../../service/GroupService";
import "../../App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { RefreshContext } from '../../RefreshContext';

export default function GroupForm() {
  const [name, setName] = useState("");
  const context = useContext(RefreshContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!context) {
      throw new Error("RefreshContext must be used within a RefreshContext.Provider");
    }
    const {setRefreshTrigger} = context;

    const response = await createGroup(name);
    console.log(`Gruppe erstellt: ${response.code}`);

    setRefreshTrigger(prev => prev + 1);
  }

  return (
        <div className="add-card">
            <form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Gruppenname"
                required
              />
              <Button variant="primary" type="submit">Gruppe erstellen</Button>
            </form>
        </div>
  );
}
