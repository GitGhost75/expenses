import React, { useState } from "react";
import UserAdd from "../components/users/UserAdd";
import UserList from "../components/users/UserList";

function Users() {

  const [refreshUsers, setRefreshUsers] = useState(false);

  const triggerUserRefresh = () => {
    setRefreshUsers(prev => !prev);
  };

  return (
      <>
        <UserAdd onUserAdded={triggerUserRefresh} />
        <UserList refreshTrigger={refreshUsers} />
      </>
  );
}

export default Users;
