import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "./users/UserService";
import logo from './logo.svg';
import './App.css';
import UserAdd from './users/UserAdd';
import UserList from './users/UserList';
function App() {

  const [refreshUsers, setRefreshUsers] = useState(false);

  const triggerUserRefresh = () => {
    setRefreshUsers(prev => !prev); // Toggle zum Triggern
  };

  return (
      <div className="App">
        <header className="App-header">
          Expenses App
        </header>

        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>

        <UserAdd onUserAdded={triggerUserRefresh} />
        <UserList refreshTrigger={refreshUsers} />
        </div>
    </div>
  );
}

export default App;
