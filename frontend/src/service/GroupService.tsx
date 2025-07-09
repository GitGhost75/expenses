import { GroupDto } from "../types/GroupDto";
import { ApiErrorResponse } from "../types/ApiErrorResponse";

const API_URL = process.env.REACT_APP_API_URL_GROUPS;

export async function createGroup(name: string) : Promise<GroupDto | ApiErrorResponse> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
    method: "POST",
    credentials: "include",
  });

    if (!response.ok) {
        const error = await response.json();
        return error;
    }

    const result: GroupDto = await response.json();

  const storedGroups = localStorage.getItem("groups");
  const groups = storedGroups ? JSON.parse(storedGroups) : [];
  groups.push(result);
  localStorage.setItem('groups', JSON.stringify(groups));

  return result;
}

export function leaveGroup(code: string) : GroupDto[] {
    const storedGroups = localStorage.getItem("groups");
    const groups: GroupDto[] = storedGroups ? JSON.parse(storedGroups) : [];
    const updatedGroups : GroupDto[] = groups.filter(group => group.code !== code);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    return updatedGroups;
}

export async function fetchGroups() : Promise<GroupDto[]> {
    const storedGroups = localStorage.getItem("groups");
    const groups: GroupDto[] = storedGroups ? JSON.parse(storedGroups) : [];
    groups.sort((a,b)=>a.name.localeCompare(b.name));
    return groups;
}

async function fetchFromBackend(group: GroupDto) : Promise<GroupDto> {
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

export async function fetchGroupByCode(code: string) : Promise<GroupDto> {

    const storedGroups = localStorage.getItem("groups");
    const groups: GroupDto[] = storedGroups ? JSON.parse(storedGroups) : [];
    const targetGroup = groups.find(group => group.code === code);

    if (!targetGroup) {
      throw new Error(`Gruppe mit dem code ${code} nicht gefunden`);
    }

      return await fetchFromBackend(targetGroup);
}

export async function renameGroup(group: GroupDto) : Promise<GroupDto | ApiErrorResponse> {

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

    const storedGroups = localStorage.getItem("groups");
    const groups: GroupDto[] = storedGroups ? JSON.parse(storedGroups) : [];

    const updatedGroups = groups.map(g => g.code === group.code ? group : g);

    localStorage.setItem('groups', JSON.stringify(updatedGroups));


    return result;
}

export async function assignToGroup(code: string) : Promise<GroupDto> {
        const storedGroups = localStorage.getItem("groups");
        const groups: GroupDto[] = storedGroups ? JSON.parse(storedGroups) : [];
        const targetGroup = groups.find(group => group.code === code);
        if (targetGroup) {
            // already assigned
            return targetGroup;
        }
        // check backend for group
        const response = await fetch(`${API_URL}`, {
                    headers: {
                      "Content-Type": "application/json",
                      "X-Group-Code": code || ""
                    },
                    credentials: "include"
                });
        if (!response.ok) {
            throw new Error(`Fehler beim Laden der Gruppe ${code}`);
        }

        const result: GroupDto = await response.json();
        groups.push(result);
        localStorage.setItem('groups', JSON.stringify(groups));
        return result;
}

export async function fetchGroup(name: string) : Promise<GroupDto> {

    const storedGroups = localStorage.getItem("groups");
    const groups: GroupDto[] = storedGroups ? JSON.parse(storedGroups) : [];
    const targetGroup = groups.find(group => group.name === name);

    if (!targetGroup) {
      throw new Error(`Gruppe mit dem Namen ${name} nicht gefunden`);
    }

      return await fetchFromBackend(targetGroup);
}

export async function addMember(groupName: string, group: GroupDto) : Promise<GroupDto | ApiErrorResponse> {
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