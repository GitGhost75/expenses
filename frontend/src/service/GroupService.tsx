import { GroupDto } from "../types/GroupDto";
import { ApiErrorResponse } from "../types/ApiErrorResponse";
import { loadLocalStorage, addToLocalStorage, findByNameInLocalStorage, findByCodeInLocalStorage, updateInLocalStorage, removeFromLocalStorage } from "./LocalStorageService";

const API_URL = process.env.REACT_APP_API_URL_GROUPS;

export async function createGroup(name: string): Promise<GroupDto | ApiErrorResponse> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    return await response.json();
  }

  const result: GroupDto = await response.json();

  addToLocalStorage(result);

  return result;
}

export function leaveGroup(code: string): GroupDto[] {
  return removeFromLocalStorage(code);
}

export async function fetchGroups(): Promise<GroupDto[]> {
  return loadLocalStorage();
}

async function fetchFromBackend(group: GroupDto): Promise<GroupDto> {
  const response = await fetch(`${API_URL}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Group-Code": group.code || ""
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Fehler beim Laden der Gruppe ${group.name}`);
  }

  const result: GroupDto = await response.json();
  return result;
}

export async function fetchGroupByCode(code: string): Promise<GroupDto> {

  const targetGroup = findByCodeInLocalStorage(code);

  if (targetGroup === undefined) {
    throw new Error(`Gruppe mit dem code ${code} nicht gefunden`);
  }

  return await fetchFromBackend(targetGroup);
}

export async function renameGroup(group: GroupDto): Promise<GroupDto | ApiErrorResponse> {

  const response = await fetch(`${API_URL}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(group)
  });
  if (!response.ok) {
    return await response.json();
  }

  const result: GroupDto = await response.json();

  updateInLocalStorage(group);

  return result;
}

export async function assignToGroup(code: string): Promise<GroupDto | ApiErrorResponse> {
  // check backend for group
  const response = await fetch(`${API_URL}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Group-Code": code || ""
    },
    credentials: "include"
  });


  if (!response.ok) {
    console.error(`Fehler beim Laden der Gruppe ${code}`);
    return await response.json();
  }

  const result: GroupDto = await response.json();
  return result;
}

export async function fetchGroup(name: string): Promise<GroupDto> {

  const targetGroup = findByNameInLocalStorage(name);

  if (targetGroup === undefined) {
    throw new Error(`Gruppe mit dem Namen ${name} nicht gefunden`);
  }

  return await fetchFromBackend(targetGroup);
}

export async function addMember(groupName: string, group: GroupDto): Promise<GroupDto | ApiErrorResponse> {
  const response = await fetch(`${API_URL}/members/${encodeURIComponent(groupName)}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(group)
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  return await response.json();
}