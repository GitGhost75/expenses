import React, { useState, useContext } from "react";
import { renameGroup } from "../../service/GroupService";
import "../../App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RefreshContext } from '../../RefreshContext';
import {ApiErrorResponse} from '../../types/ApiErrorResponse';
import {GroupDto} from '../../types/GroupDto';

export default function RenameGroupForm({ groupCode }: { groupCode: string }) {
  
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const context = useContext(RefreshContext);

  async function handleRenameGroup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!context) {
      throw new Error("RefreshContext must be used within a RefreshContext.Provider");
    }

    const result : GroupDto | ApiErrorResponse = await renameGroup(groupCode, name);
    if ('error' in result) {
        setError((result as ApiErrorResponse).message);
        return;
    }

    setName("");

    const {setRefreshTrigger} = context;
    setRefreshTrigger(prev => prev + 1);
  }

  return (
            <form onSubmit={handleRenameGroup} className="w-100">
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="flex-grow-1"
                  />
                  <Button className="add-button" variant="primary" type="submit">Gruppe umbenennen</Button>
                </div>
                {error && <span style={{ color: "red" }}>{error}</span>}
            </form>

  );
}
