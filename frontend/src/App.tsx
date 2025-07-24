import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/HomePage';
import GroupDetailsPage from './pages/GroupDetailsPage';
import Navbar from './Navbar';
import { RefreshContext } from './RefreshContext';
import { GroupProvider } from "./context/GroupContext";
import ExpensesOverview from "./components/expenses/ExpensesOverview";
import BillingsOverview from "./components/billings/BillingsOverview";
import EditUser from "./components/users/EditUser";
import CreateUserExpense from "./components/expenses/CreateUserExpense";
import EditUserExpense from "./components/expenses/EditUserExpense";

function App() {

  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const contextValue = React.useMemo(() => ({
    refreshTrigger,
    setRefreshTrigger,
  }), [refreshTrigger]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <GroupProvider>
          <Router>
            <RefreshContext.Provider value={contextValue}>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/groups/:groupCode" element={<GroupDetailsPage />} />
                  <Route path="/expenses/create" element={<CreateUserExpense />} />
                  <Route path="/expenses/edit" element={<EditUserExpense />} />
                  <Route path="/expenses/overview" element={<ExpensesOverview />} />
                  <Route path="/billings/overview" element={<BillingsOverview />} />
                  <Route path="/users/edit" element={<EditUser />} />
                </Routes>
              </div>
            </RefreshContext.Provider>
          </Router>
        </GroupProvider>
      </div>
    </div>
  );
}

export default App;
