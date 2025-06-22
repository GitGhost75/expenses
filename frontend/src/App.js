import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "./service/UserService";
import logo from './logo.svg';
import './App.css';
import UserAdd from './container/UserAdd';
import UserList from './container/UserList';
import Header from './container/Header';
function App() {

  const [refreshUsers, setRefreshUsers] = useState(false);

  const triggerUserRefresh = () => {
    setRefreshUsers(prev => !prev); // Toggle zum Triggern
  };

  return (
      <div className="App">
        <Header />
        <div style={{ paddingTop: '70px' }}>
            <UserAdd onUserAdded={triggerUserRefresh} />
            <UserList refreshTrigger={refreshUsers} />
        </div>
    </div>
  );
}

export default App;
