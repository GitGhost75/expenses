import React, { useState, useContext } from "react";
import { createGroup } from "../../service/GroupService";
import "../../App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RefreshContext } from '../../RefreshContext';

export default function CreateGroupForm() {
  const [name, setName] = useState("");
  const context = useContext(RefreshContext);

  async function handleCreateGroup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!context) {
      throw new Error("RefreshContext must be used within a RefreshContext.Provider");
    }
    const {setRefreshTrigger} = context;

    const response = await createGroup(name);
    console.log(`Gruppe erstellt: ${response.code}`);

    setName("");
    setRefreshTrigger(prev => prev + 1);
  }

  return (
            <form onSubmit={handleCreateGroup} className="w-100">
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Gruppenname"
                    required
                    className="flex-grow-1"
                  />
                  <Button variant="primary" type="submit">Gruppe erstellen</Button>
                </div>
            </form>
  );
}
