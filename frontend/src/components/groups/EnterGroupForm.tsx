import React, { useState, useContext } from "react";
import { assignToGroup } from "../../service/GroupService";
import "../../App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RefreshContext } from '../../RefreshContext';

export default function EnterGroupForm() {
  const [code, setCode] = useState("");
  const context = useContext(RefreshContext);

  async function handleEnterGroup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!context) {
      throw new Error("RefreshContext must be used within a RefreshContext.Provider");
    }
    const {setRefreshTrigger} = context;

    const group = await assignToGroup(code);

    if(!group) {
        console.error(`Group with code ${code} does not exist`);
        return;
    }

    console.log(`Gruppe ${code} beitreten`);
    setRefreshTrigger(prev => prev + 1);
  }

  return (
            <form onSubmit={handleEnterGroup} className="w-100">
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Gruppencode"
                    required
                    className="flex-grow-1"
                  />
                  <Button className="add-button" variant="primary" type="submit">Gruppe beitreten</Button>
                </div>
            </form>

  );
}
