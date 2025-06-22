const API_URL = process.env.REACT_APP_API_URL;

export async function fetchUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Fehler beim Laden der Benutzer");
  return response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}

export async function addUser(name, email) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name, email)
  });
  if (!response.ok) throw new Error("Fehler beim Erstellen des Benutzers");
  return response.json();
}