import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/HomePage';
import ManageGroupsPage from './pages/ManageGroupsPage';
import GroupDetailsPage from './pages/GroupDetailsPage';
import MyNavbar from './MyNavbar';
import { RefreshContext } from './RefreshContext';


function App() {

  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const contextValue = React.useMemo(() => ({
    refreshTrigger,
    setRefreshTrigger,
  }), [refreshTrigger]);

  return (
      <Router>
        <RefreshContext.Provider value={contextValue}>
            <MyNavbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/manage-groups" element={<ManageGroupsPage />}  />
                <Route path="/groups/:groupCode" element={<GroupDetailsPage />} />
            </Routes>
        </RefreshContext.Provider>
    </Router>
  );
}

export default App;
