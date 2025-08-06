import { useEffect, useState } from "react";

import './App.css';
import GroupManager from "./components/GroupManager";
import { BillingDto, ExpenseDto, GroupDto, UserDto } from "./types";
import { assignToGroup, createGroup, fetchGroups, removeGroup } from "./service/GroupService";
import { ArrowLeft } from "lucide-react";
import { ExpenseManager } from "./components/ExpenseManager";
import { createExpense, deleteExpense, getExpensesForGroup, updateExpense } from "./service/ExpensesService";
import { PersonManager } from "./components/PersonManager";
import { createUser, deleteUser, updateUser, getMembers } from "./service/UserService";
import { Summary } from "./components/Summary";
import { getBillingsForGroup } from "./service/BillingService";
import { isApiErrorResponse } from "./utils/ErrorHandling";

function App() {

  const APP_URL = process.env.REACT_APP_URL;
  const [groups, setGroups] = useState<GroupDto[]>([]);
  const [activeGroupCode, setActiveGroupCode] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [billingsForGroup, setBillingsForGroup] = useState<BillingDto[]>([]);
  const [members, setMembers] = useState<UserDto[]>([]);

  const activeGroup = groups.find(g => g.code === activeGroupCode);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      console.log("code found. try to enter group", code);
      enterGroup(code);
    }
  }, []);

  function setGroupCode(code: string | null) {
    console.log("set active group code", code);
    setActiveGroupCode(code);
  }

  useEffect(() => {
    if (activeGroupCode) {
      loadMembers(activeGroupCode);
    } else {
      setMembers([]);
    }
  }, [activeGroupCode]);

  async function loadMembers(code: string | null) {
    if (code){
      getMembers(code).then(members => {
        if (isApiErrorResponse(members)) {
          console.error("Fehler beim Laden der Mitglieder:", members.message);
          setError(members.message);
          return;
        }
        console.log("Members for group:", members);
        if (!Array.isArray(members)) {
          console.error("Expected an array of members, but got:", members);
          setError("Fehler beim Laden der Mitglieder: Unerwartetes Format");
          return;
        }
        setMembers(members);
      })
    } else {
      setMembers([]);
    }
  }

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    loadExpenses();
    loadBillings();
  }, [activeGroup]);

  async function loadExpenses() {
    if (activeGroup) {
      getExpensesForGroup(activeGroup.code)
        .then(expenses => {
          console.log("Expenses for group:", expenses);
          if (Array.isArray(expenses)) {
            setExpenses(expenses);
          }
        });
    } else {
      setExpenses([]);
    }
  }


  async function loadBillings() {
    if (activeGroup) {
      await getBillingsForGroup(activeGroup.code)
        .then(billings => {
          if (Array.isArray(billings)) {
            setBillingsForGroup(billings);
          }
        })
    } else {
      setBillingsForGroup([]);
    }
  }

  async function loadGroups() {
    const groupsOrError = await fetchGroups();

    if (isApiErrorResponse(groupsOrError)) {
      console.error("Fehler beim Laden der Gruppen:", groupsOrError.message);
      // Optionale Anzeige im UI
      setError(groupsOrError.message);
      return;
    }

    // Erfolgspfad
    setGroups(groupsOrError);
  }

  const addGroup = async (name: string) => {
    console.log("add group");
    await createGroup(name).then(() => {
      loadGroups();
    });
  };

  const leaveGroup = async (code: string) => {
    console.log("leave group");
    await removeGroup(code);
    loadGroups();
  };

  async function enterGroup(code: string) {
    console.log("enter group");
    await assignToGroup(code).then(() => {
      loadGroups();
    });
  };

  const addExpense = async (description: string, amount: number, paidBy: UserDto[], receivedBy: UserDto[], groupCode: string) => {
    const expenseData: ExpenseDto = {
      id: "",
      amount,
      description,
      date: new Date(),
      groupCode,
      payers: paidBy,
      receivers: receivedBy,
    }
    await createExpense(expenseData);
    loadMembers(groupCode);
    loadExpenses();
    loadBillings();
  };

  const editExpense = async (id: string, description: string, amount: number, paidBy: UserDto[], receivedBy: UserDto[]) => {
    const found = expenses.find((ex) => ex.id === id);
    if (found) {
      found.description = description;
      found.amount = amount;
      found.payers = paidBy;
      found.receivers = receivedBy;
      await updateExpense(found);
      loadMembers(found.groupCode);
      loadExpenses();
      loadBillings();
    }
  }

  const removeExpense = async (id: string) => {
    console.log("remove expense ", id);
    if (id.trim()) {
      await deleteExpense(id.trim());
      loadExpenses();
      loadBillings();
    }
  }

  const addPerson = async (name: string) => {
    console.log("add person", name);
    if (activeGroup) {
      const newUser: UserDto = {
        id: "",
        name,
        groupCode: activeGroup.code,
        balance: 0,
      };
      await createUser(newUser);
      loadGroups();
      loadMembers(newUser.groupCode);
    }
  }

  const removePerson = async (id: string) => {
    console.log("delete person", id);
    await deleteUser(id);
    loadGroups();
    loadMembers(activeGroupCode);
  }

  const renamePerson = async (id: string, newName: string) => {
    console.log("rename person", newName);
    const person = members.find((u) => u.id === id);
    if (person) {
      person.name = newName;
      await updateUser(person);
      loadGroups();
      loadMembers(person.groupCode);
    }
  }

  const shareCode = async (groupCode: string) => {
    try {
      await navigator.clipboard.writeText(groupCode);

      const whatsappUrl = `https://api.whatsapp.com/send?text=${APP_URL}?code=${encodeURIComponent(groupCode)}`;
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error('Failed to copy group code:', err);
    }
  }

  if (!activeGroup) {
    return (
      <div className="text-sm sm:text-base">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-8">
            <GroupManager
              groups={groups}
              onAddGroup={addGroup}
              onLeaveGroup={leaveGroup}
              onSelectGroup={setGroupCode}
              onEnterGroup={enterGroup}
              onShareCode={shareCode} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm sm:text-base">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <header className="">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setGroupCode(null)}
                className="flex items-center gap-2 px-0 py-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200 mb-6"
              >
                <ArrowLeft size={20} />
                Zurück zur Übersicht
              </button>
            </div>
          </header>


          <div className="grid grid-cols-1 lg:grid-flow-col lg:auto-cols-fr gap-8 items-start mt-8 sm:gap-4 sm:mt-4 lg:gap-8 lg:mt-8">
            <div>
              <Summary
                billings={billingsForGroup}
                people={members}
                expenses={expenses}
              />
              <PersonManager
                people={members}
                onAddPerson={addPerson}
                onRemovePerson={removePerson}
                onRenamePerson={renamePerson}
              />
            </div>
            <ExpenseManager
              group={activeGroup}
              members={members}
              expenses={expenses}
              onAddExpense={addExpense}
              onRemoveExpense={removeExpense}
              onEditExpense={editExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
function setError(message: string) {
  alert(`Fehler: ${message}`);
}