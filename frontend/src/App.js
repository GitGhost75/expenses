import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "./service/UserService";
import './App.css';
import UserAdd from './container/UserAdd';
import UserList from './container/UserList';
import MyNavbar from './container/MyNavbar';
function App() {

  const [refreshUsers, setRefreshUsers] = useState(false);

  const triggerUserRefresh = () => {
    setRefreshUsers(prev => !prev); // Toggle zum Triggern
  };

  return (
      <>
        <MyNavbar />
        <UserAdd onUserAdded={triggerUserRefresh} />
        <UserList refreshTrigger={refreshUsers} />
    </>
  );
}

export default App;
