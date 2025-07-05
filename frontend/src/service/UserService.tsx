import {UserDto} from '../types/UserDto';
const API_URL = process.env.REACT_APP_API_URL_USERS;


export async function fetchUsers() {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Fehler beim Laden der Benutzer");
  return response.json();
}

export async function deleteUser(userId: string) : Promise<UserDto>{
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return await response.json();
}

export async function addUser(name: string) : Promise<UserDto>{
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name)
  });
return await response.json();
}