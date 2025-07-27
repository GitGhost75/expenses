import { useEffect, useState } from "react";

import './App.css';
import GroupManager from "./components/GroupManager";
import { BillingDto, ExpenseDto, GroupDto, UserDto } from "./types";
import { assignToGroup, createGroup, fetchGroups, removeGroup } from "./service/GroupService";
import { ArrowLeft } from "lucide-react";
import { ExpenseManager } from "./components/ExpenseManager";
import { createExpense, deleteExpense, getExpensesForGroup, updateExpense } from "./service/ExpensesService";
import { PersonManager } from "./components/PersonManager";
import { createUser, deleteUser, updateUser } from "./service/UserService";
import { Summary } from "./components/Summary";
import { getBillingsForGroup } from "./service/BillingService";

function App() {

  const [groups, setGroups] = useState<GroupDto[]>([]);
  const [activeGroupCode, setActiveGroupCode] = useState<string | null>(null);
  const activeGroup = groups.find(g => g.code === activeGroupCode);
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [billingsForGroup, setBillingsForGroup] = useState<BillingDto[]>([]);

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
    const groups = await fetchGroups();
    if (Array.isArray(groups)) {
      setGroups(groups);
    }
  }

  const addGroup = async (name: string) => {
    console.log("add group");
    await createGroup(name).then(result => {
      loadGroups();
    });
  };

  const leaveGroup = async (code: string) => {
    console.log("leave group");
    await removeGroup(code);
    loadGroups();
  };

  const enterGroup = async (code: string) => {
    console.log("enter group");
    await assignToGroup(code).then(result => {
      loadGroups();
    });
  };

  const addExpense = async (description: string, amount: number, paidBy: UserDto) => {
    const expenseData: ExpenseDto = {
      id: "",
      amount,
      description,
      date: new Date(),
      userId: paidBy.id,
      groupCode: paidBy.groupCode,
      user: paidBy,
    }
    await createExpense(expenseData);
    loadExpenses();
    loadBillings();
  };

  const editExpense = async (id: string, description: string, amount: number, paidBy: UserDto) => {
    const found = expenses.find((ex) => ex.id === id);
    if (found) {
      found.description = description;
      found.amount = amount;
      found.user = paidBy;
      found.userId = paidBy.id;
      await updateExpense(found);
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
    }
  }

  const removePerson = async (id: string) => {
    console.log("delete person", id);
    await deleteUser(id);
    loadGroups();
  }

  const renamePerson = async (id: string, newName: string) => {
    console.log("rename person", newName);
    const person = activeGroup?.members.find((u) => u.id === id);
    if (person) {
      person.name = newName;
      await updateUser(person);
      loadGroups();
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
              onSelectGroup={setActiveGroupCode}
              onEnterGroup={enterGroup} />
          </div>
        </div>
      </div>
    );
  }

  const exitGroup = () => {
    setActiveGroupCode(null);
  }

  return (
    <div className="text-sm sm:text-base">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setActiveGroupCode(null)}
                className="flex items-center gap-2 px-0 py-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200 mb-6"
              >
                <ArrowLeft size={20} />
                Zurück zu Gruppen
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PersonManager
              people={activeGroup.members}
              onAddPerson={addPerson}
              onRemovePerson={removePerson}
              onRenamePerson={renamePerson}
            />

            <ExpenseManager
              people={activeGroup.members}
              expenses={expenses}
              onAddExpense={addExpense}
              onRemoveExpense={removeExpense}
              onEditExpense={editExpense}
            />
          </div>
          <Summary
            billings={billingsForGroup}
            people={activeGroup.members}
            expenses={expenses}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
