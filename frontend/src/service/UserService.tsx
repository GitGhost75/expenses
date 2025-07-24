import { ApiErrorResponse,  UserDto } from "../types";
const API_URL = process.env.REACT_APP_API_URL_USERS;


export async function deleteUser(userId: string) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}

export async function createUser(user: UserDto): Promise<UserDto | ApiErrorResponse> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  return await response.json();
}

export async function updateUser(user: UserDto): Promise<UserDto | ApiErrorResponse> {
  const response = await fetch(`${API_URL}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  return await response.json();
}
