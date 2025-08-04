import React, { useState } from 'react';
import { UserPlus, X, Edit2, Check, X as XIcon, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
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
  const [isBlockExpanded, setIsBlockExpanded] = useState(true);

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
    <div className="bg-white rounded-lg shadow-md p-6 mt-3 lg:mt-6">

      <div
        className="flex items-center justify-between cursor-pointer hover:bg-white-50 -m-6 p-6 rounded-t-lg transition-colors duration-200"
        onClick={() => setIsBlockExpanded(!isBlockExpanded)}
      >
        <h2 className="font-semibold text-gray-800 text-sm lg:text-xl">Mitglieder
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full ml-2">
            {people.length}
          </span>
        </h2>

        <div className="flex items-center gap-3 -mt-5">
          {people.length > 0 && (
            <span className="text-sm text-gray-600 font-medium" />
          )}
          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            {isBlockExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
      </div>

      {isBlockExpanded && (
        <>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-full">
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="Name eingeben"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full sm:w-auto flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <UserPlus size={18} />
                <span className="">Hinzufügen</span>
              </button>
            </div>
          </form>

          <div className="space-y-2 mt-3">
            {people.map((person) => (
              <div
                key={person.id}
                className="flex flex-cols items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                onClick={
                  (e) => {
                    e.stopPropagation();
                    startEditing(person);
                  }
                }
                onMouseOver={(e) => (e.currentTarget.style.cursor = 'pointer')}
              >
                {editingId !== null && editingId === person.id ? (
                  <div className='flex flex-col gap-2'>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={handleEditKeyPress}
                      className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveEdit();
                        }}
                        disabled={!editingName.trim()}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
                      >
                        <Check size={16} />
                        Speichern
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelEditing();
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center gap-1"
                      >
                        <X size={16} />
                        Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-gray-700 flex-1">{person.name}</span>
                    <div className="flex gap-1">
                      {/* <button
                          onClick={() => startEditing(person)}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                          title="Umbenennen"
                        >
                          <Edit2 size={18} />
                        </button> */}
                      <button
                        onClick={() => onRemovePerson(person.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        disabled={people.length <= 0}
                        title="Löschen"
                      >
                        <Trash2 size={18} />
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
        </>
      )}
    </div>
  );
}