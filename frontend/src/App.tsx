import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/HomePage';
import GroupDetailsPage from './pages/GroupDetailsPage';
import Navbar from './Navbar';
import { RefreshContext } from './RefreshContext';
import CreateExpense from "./components/expenses/CreateExpense";
import { GroupProvider } from "./context/GroupContext";

function App() {

  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const contextValue = React.useMemo(() => ({
    refreshTrigger,
    setRefreshTrigger,
  }), [refreshTrigger]);

  return (
    <GroupProvider>
      <Router>
        <RefreshContext.Provider value={contextValue}>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/groups/:groupCode" element={<GroupDetailsPage />} />
              <Route path="/expenses/create" element={<CreateExpense />} />
            </Routes>
          </div>
        </RefreshContext.Provider>
      </Router>
    </GroupProvider>
  );
}

export default App;
