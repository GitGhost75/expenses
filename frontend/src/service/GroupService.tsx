import { ApiErrorResponse, GroupDto } from "../types";
import { isApiErrorResponse } from "../utils/ErrorHandling";
import { loadLocalStorage, addToLocalStorage, findByCodeInLocalStorage, removeFromLocalStorage } from "./LocalStorageService";

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

  addToLocalStorage(result.code);

  return result;
}

export async function removeGroup(code: string) {
  removeFromLocalStorage(code);
  const groupInfos = loadLocalStorage();
  const codes = groupInfos.map((g) => g.code);
  const promises = codes.map((code) => fetchFromBackendByCode(code));
  const results = await Promise.all(promises);
  return results;
}

export async function fetchGroups(): Promise<GroupDto[] | ApiErrorResponse> {
  const groupInfos = loadLocalStorage();
  const codes = groupInfos.map((g) => g.code);
  const result: GroupDto[] = [];

  for (const code of codes) {
    try {
      const x = await fetchFromBackendByCode(code);

      // Wenn ein Fehlerobjekt zurückkommt, brich ab
      if (isApiErrorResponse(x)) {
        const error = x as ApiErrorResponse;
        if (error.message.endsWith("is invalid")) {
          console.warn(`Gruppe mit Code ${code} nicht gefunden, entferne aus LocalStorage.`);
          removeFromLocalStorage(code);
        } else {
          console.error(`Fehler beim Laden der Gruppe ${code}:`, error);
          return error;
        }
      } else {
        result.push(x);
      }
    } catch (error) {
      console.error("Netzwerkfehler:", error);
      return {
        timestamp: new Date().toISOString(),
        status: 0,
        error: "Network Error",
        message: "Backend ist nicht erreichbar.",
        path: "/groups",
        validationErrors: [],
      };
    }
  }

  return result;
}

async function fetchFromBackendByCode(code: string): Promise<GroupDto | ApiErrorResponse> {
  const response = await fetch(`${API_URL}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Group-Code": code || ""
    },
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    console.error(`Fehler beim Laden der Gruppe ${code}`);
    return data as ApiErrorResponse;
  }

  return data as GroupDto;
}

export async function fetchGroupByCode(code: string): Promise<GroupDto | ApiErrorResponse> {

  const result = await fetchFromBackendByCode(code);
  if (isApiErrorResponse(result)) {
    return result as ApiErrorResponse;
  }
  let localGroup = findByCodeInLocalStorage(code);

  if (localGroup === undefined) {
    addToLocalStorage(result.code);
  }
  return result;
}

export async function updateGroup(group: GroupDto): Promise<GroupDto | ApiErrorResponse> {

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

  const localGroup = findByCodeInLocalStorage(code);
  if (!localGroup) {
    addToLocalStorage(result.code);
  }
  return result;
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