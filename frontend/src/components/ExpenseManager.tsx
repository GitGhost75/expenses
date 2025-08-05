import React, { useState } from 'react';
import { Plus, Trash2, Check, X, ChevronDown, ChevronRight, HandCoins } from 'lucide-react';
import { UserDto, ExpenseDto, GroupDto } from '../types';

interface ExpenseManagerProps {
  group: GroupDto;
  expenses: ExpenseDto[];
  onAddExpense: (description: string, amount: number, paidBy: UserDto[], receivedBy: UserDto[], groupCode: string) => void;
  onRemoveExpense: (id: string) => void;
  onEditExpense: (id: string, description: string, amount: number, paidBy: UserDto[], receivedBy: UserDto[]) => void;
}

export function ExpenseManager({ group, expenses, onAddExpense, onRemoveExpense, onEditExpense }: ExpenseManagerProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState('');
  const [editingAmount, setEditingAmount] = useState('');
  const [isExpenseBlockExpanded, setIsExpenseBlockExpanded] = useState(true);
  const [selectedPayers, setSelectedPayers] = useState<UserDto[]>([]);
  const [selectedReceivers, setSelectedReceivers] = useState<UserDto[]>(group.members);
  const [editingPayers, setEditingPayers] = useState<UserDto[]>([]);
  const [editingReceivers, setEditingReceivers] = useState<UserDto[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && amount && selectedPayers.length > 0) {
      onAddExpense(description.trim(), parseFloat(amount), selectedPayers, selectedReceivers, group.code);
      setDescription('');
      setAmount('');
      setSelectedPayers([]);
      setSelectedReceivers(group.members);
    }
  };

  const startEditing = (expense: ExpenseDto) => {
    setEditingId(expense.id);
    setEditingDescription(expense.description);
    setEditingAmount(expense.amount.toString());
    setEditingPayers(expense.payers);
    setEditingReceivers(expense.receivers || []);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingDescription('');
    setEditingAmount('');
    setEditingPayers([]);
    setEditingReceivers([]);
  };

  const saveEdit = () => {
    if (editingDescription.trim() && editingAmount && editingPayers.length > 0 && editingId) {
      onEditExpense(editingId, editingDescription.trim(), parseFloat(editingAmount), editingPayers, editingReceivers);
      cancelEditing();
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  const PersonSelector = ({
    title,
    selectedPeople,
    allSelected = false,
    onSelectAll,
    onToggle,
  }: {
    title: string;
    selectedPeople: UserDto[];
    allSelected?: boolean;
    onSelectAll?: () => void;
    onToggle: (person: UserDto) => void;
  }) => (
    <div>
      <div className='flex flex-column-2'>
        <div>{title}</div>
        <div className='ml-auto'>
          {onSelectAll && (
            <button
              type="button"
              onClick={onSelectAll}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {allSelected ? 'Alle abwählen' : 'Alle auswählen'}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">

        {group.members.map((member) => {
          const isSelected = selectedPeople.some(user => user.id === member.id);

          return (
            <button
              key={member.id}
              type="button"
              onClick={() => onToggle(member)}
              className={`
                px-3 py-1 rounded-full border text-sm transition
                ${isSelected
                  ? 'bg-blue-500 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
              `}
            >
              {member.name}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (

    <div className="bg-white rounded-lg shadow-md p-6">

      <div
        className="flex items-center justify-between cursor-pointer hover:bg-white-50 -m-6 p-6 rounded-t-lg transition-colors duration-200"
        onClick={() => setIsExpenseBlockExpanded(!isExpenseBlockExpanded)}
      >

        <h2 className="font-semibold text-gray-800 mb-6 flex items-center gap-2 text-sm lg:text-xl">
          <HandCoins size={18} />
          Ausgaben
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full ml-2">
            {expenses.length}
          </span>
        </h2>

        <div className="flex items-center gap-3 -mt-5">
          <span className="text-sm text-gray-600 font-medium" />

          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            {isExpenseBlockExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
      </div>

      {isExpenseBlockExpanded && (
        <>

          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschreibung (z.B. Restaurant, Taxi, etc.)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Betrag (€)"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <PersonSelector
              title="Bezahlt von"
              selectedPeople={selectedPayers}
              allSelected={selectedPayers.length === group.members.length}
              onSelectAll={() => {
                if (selectedPayers.length === group.members.length) {
                  setSelectedPayers([]);
                } else {
                  setSelectedPayers(group.members);
                }
              }}
              onToggle={(person) => {
                const isSelected = selectedPayers.some(user => user.id === person.id);
                if (isSelected) {
                  setSelectedPayers(selectedPayers.filter(user => user.id !== person.id));
                } else {
                  setSelectedPayers([...selectedPayers, person]);
                }
              }}
            />
            <PersonSelector
              title="Betrifft"
              selectedPeople={selectedReceivers}
              allSelected={selectedReceivers.length === group.members.length}
              onSelectAll={() => {
                if (selectedReceivers.length === group.members.length) {
                  setSelectedReceivers([]);
                } else {
                  setSelectedReceivers(group.members);
                }
              }}
              onToggle={(person) => {
                const isSelected = selectedReceivers.some(user => user.id === person.id);
                if (isSelected) {
                  setSelectedReceivers(selectedReceivers.filter(user => user.id !== person.id));
                } else {
                  setSelectedReceivers([...selectedReceivers, person]);
                }
              }}
            />


            <button
              type="submit"
              disabled={!description.trim() || !amount || selectedPayers.length === 0 || selectedReceivers?.length === 0 || group.members.length === 0}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <HandCoins size={18} />
              hinzufügen
            </button>
          </form>


          <div className="space-y-3 mt-3">
            {expenses.sort((a, b) => { return new Date(a.date).getDate() - new Date(b.date).getDate() }).map((expense) => {
              const payerNames = expense.payers.sort((a, b) => a.name.localeCompare(b.name)).map(user => user.name).join(', ');
              const receiverNames = expense.receivers?.sort((a, b) => a.name.localeCompare(b.name)).map(user => user.name).join(', ');
              if (editingId === expense.id) {
                return (
                  <div
                    key={expense.id}
                    className="p-4 bg-blue-50 rounded-md border border-blue-200"
                  >
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingDescription}
                        onChange={(e) => setEditingDescription(e.target.value)}
                        onKeyDown={handleEditKeyPress}
                        placeholder="Beschreibung"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />

                      <div className="flex gap-3">
                        <input
                          type="number"
                          value={editingAmount}
                          onChange={(e) => setEditingAmount(e.target.value)}
                          onKeyDown={handleEditKeyPress}
                          placeholder="Betrag (€)"
                          step="0.01"
                          min="0"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <PersonSelector
                        title="Bezahlt von"
                        selectedPeople={editingPayers}
                        allSelected={editingPayers.length === group.members.length}
                        onSelectAll={() => {
                          if (editingPayers.length === group.members.length) {
                            setEditingPayers([]);
                          } else {
                            setEditingPayers(group.members);
                          }
                        }}
                        onToggle={(person) => {
                          const isSelected = editingPayers.some(user => user.id === person.id);
                          if (isSelected) {
                            setEditingPayers(editingPayers.filter(user => user.id !== person.id));
                          } else {
                            setEditingPayers([...editingPayers, person]);
                          }
                        }}
                      />

                      <PersonSelector
                        title="Betrifft"
                        selectedPeople={editingReceivers}
                        allSelected={editingReceivers.length === group.members.length}
                        onSelectAll={() => {
                          if (editingReceivers.length === group.members.length) {
                            setEditingReceivers([]);
                          } else {
                            setEditingReceivers(group.members);
                          }
                        }}
                        onToggle={(person) => {
                          const isSelected = editingReceivers.some(user => user.id === person.id);
                          if (isSelected) {
                            setEditingReceivers(editingReceivers.filter(user => user.id !== person.id));
                          } else {
                            setEditingReceivers([...editingReceivers, person]);
                          }
                        }}
                      />

                      <div className="flex justify-center gap-2">
                        <button
                          onClick={saveEdit}
                          disabled={!editingDescription.trim() || !editingAmount || editingPayers?.length === 0 || editingReceivers?.length === 0}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
                        >
                          <Check size={16} />
                          Speichern
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center gap-1"
                        >
                          <X size={16} />
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => startEditing(expense)}
                  onMouseOver={(e) => (e.currentTarget.style.cursor = 'pointer')}
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{expense.description}</div>
                    <div className="text-sm text-gray-600">
                      Bezahlt: {payerNames}
                    </div>
                    <div className="text-sm text-gray-600">
                      Betrifft: {receiverNames}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(expense.date)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg text-green-600">
                      {expense.amount.toFixed(2)}€
                    </span>
                    <button
                      onClick={() => onRemoveExpense(expense.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Löschen"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
            {expenses.length === 0 && (
              <p className="text-gray-500 text-center py-8">Noch keine Ausgaben erfasst</p>
            )}
          </div>
        </>)}
    </div>
  );
}