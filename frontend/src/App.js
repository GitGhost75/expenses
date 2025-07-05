import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import CreateGroup from './pages/CreateGroup';
import GroupPage from './pages/GroupPage';
import Users from './pages/Users';
import MyNavbar from './MyNavbar';
import { RefreshContext } from './RefreshContext';


function App() {

  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  return (
      <Router>
        <RefreshContext.Provider value={{refreshTrigger, setRefreshTrigger}}>
            <MyNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-groups" element={<CreateGroup />}  />
                <Route path="/groups/:groupCode" element={<GroupPage />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </RefreshContext.Provider>
    </Router>
  );
}

export default App;
