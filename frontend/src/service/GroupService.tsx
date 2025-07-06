import { GroupDto } from "../types/GroupDto";
import { ApiErrorResponse } from "../types/ApiErrorResponse";

const API_URL = process.env.REACT_APP_API_URL_GROUPS;

export async function createGroup(name: string) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
    method: "POST",
    credentials: "include",
  });

    if (!response) {
        console.error(`Group with name ${name} already exists`);
        return;
    }

  const storedGroups = localStorage.getItem("groups");
  const groups = storedGroups ? JSON.parse(storedGroups) : [];
  const newGroup = await response.json();
  groups.push(newGroup);
  localStorage.setItem('groups', JSON.stringify(groups));

  return newGroup;
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

    const updatedGroups = await Promise.all(
        groups.map(group => fetchFromBackend(group))
    );

    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    updatedGroups.sort((a,b)=>a.name.localeCompare(b.name));
    return updatedGroups;
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

export async function renameGroup(code: string, name: string) : Promise<GroupDto | ApiErrorResponse> {
    const group : GroupDto = await fetchGroupByCode(code);

    if (!group) {
        throw new Error(`Group with code ${code} not found.`);
    }

    group.name = name;

    const response = await fetch(`${API_URL}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(group)
    });
    if (!response.ok) {
        const error = await response.json();
        return error;
//         throw new Error(`Fehler beim Laden der Gruppe ${error.error}`);
    }

    const result: GroupDto = await response.json();
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

export async function addMember(groupName: string, group: GroupDto) : Promise<GroupDto>{
      const response = await fetch(`${API_URL}/members/${encodeURIComponent(groupName)}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(group)
      });

      return await response.json();
}