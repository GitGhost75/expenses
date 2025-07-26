import React, { useState } from 'react';
import { UserPlus, X, Edit2, Check, X as XIcon } from 'lucide-react';
import { UserDto } from '../types';

interface PersonManagerProps {
  people: UserDto[];
  onAddPerson: (name: string) => void;
  onRemovePerson: (id: string) => void;
  onRenamePerson: (id: string, newName: string) => void;
}

export function PersonManager({ people, onAddPerson, onRemovePerson, onRenamePerson }: PersonManagerProps) {
  const [newPersonName, setNewPersonName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPersonName.trim()) {
      onAddPerson(newPersonName.trim());
      setNewPersonName('');
    }
  };

  const startEditing = (person: UserDto) => {
    setEditingId(person.id);
    setEditingName(person.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = () => {
    if (editingName.trim() && editingId) {
      onRenamePerson(editingId, editingName.trim());
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Gruppenmitglieder</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            placeholder="Name eingeben"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <UserPlus size={18} />
            <span className="hidden sm:inline">Hinzufügen</span>
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            {editingId === person.id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={handleEditKeyPress}
                  className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={saveEdit}
                    className="text-green-500 hover:text-green-700 transition-colors duration-200"
                    disabled={!editingName.trim()}
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <XIcon size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="font-medium text-gray-700 flex-1">{person.name}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEditing(person)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    title="Umbenennen"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onRemovePerson(person.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    disabled={people.length <= 1}
                    title="Entfernen"
                  >
                    <X size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {people.length === 0 && (
          <p className="text-gray-500 text-center py-4">Noch keine Personen hinzugefügt</p>
        )}
      </div>
    </div>
  );
}