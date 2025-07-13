import { GroupDto } from "../types/GroupDto";

export function loadLocalStorage(): GroupDto[] {
    const storedGroups = localStorage.getItem("groups");
    const groups: GroupDto[] = storedGroups ? JSON.parse(storedGroups) : [];
    groups.sort((a, b) => a.name.localeCompare(b.name));
    return groups;
}

export function saveLocalStorage(groups: GroupDto[]) {
    localStorage.setItem('groups', JSON.stringify(groups));
}

export function addToLocalStorage(group: GroupDto) {
    const storedGroups = loadLocalStorage();
    storedGroups.push(group);
    saveLocalStorage(storedGroups);
}

export function findByCodeInLocalStorage(code: string): GroupDto | undefined {
    return loadLocalStorage().find(group => group.code === code);
}

export function findByNameInLocalStorage(name: string): GroupDto | undefined {
    return loadLocalStorage().find(group => group.name === name);
}

export function updateInLocalStorage(group: GroupDto) {
    const updatedGroups = loadLocalStorage().map(g => g.code === group.code ? group : g);
    saveLocalStorage(updatedGroups);
}

export function removeFromLocalStorage(code: string): GroupDto[] {
    const updatedGroups: GroupDto[] = loadLocalStorage().filter(group => group.code !== code);
    saveLocalStorage(updatedGroups);
    return updatedGroups;
}
