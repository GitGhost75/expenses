import { GroupInfo } from "../types";

export function loadLocalStorage(): GroupInfo[] {
    const storedGroups = localStorage.getItem("groups");
    const groups: GroupInfo[] = storedGroups ? JSON.parse(storedGroups) : [];
    return groups;
}

export function saveLocalStorage(groups: GroupInfo[]) {
    localStorage.setItem('groups', JSON.stringify(groups));
}

export function addToLocalStorage(code: string) {
    const groupInfo : GroupInfo = {
        code : code,
    }
    const storedGroups = loadLocalStorage();
    storedGroups.push(groupInfo);
    saveLocalStorage(storedGroups);
}

export function findByCodeInLocalStorage(code: string): GroupInfo | undefined {
    return loadLocalStorage().find(group => group.code === code);
}

export function removeFromLocalStorage(code: string): GroupInfo[] {
    const updatedGroups: GroupInfo[] = loadLocalStorage().filter(group => group.code !== code);
    saveLocalStorage(updatedGroups);
    return updatedGroups;
}
