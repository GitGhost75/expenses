package de.expenses.service;

import de.expenses.dto.GroupDto;

import java.util.List;
import java.util.UUID;

public interface GroupService {

	public List<GroupDto> getGroups();

	public GroupDto getGroup(UUID id);

	public void deleteGroup(UUID id);

	public GroupDto createGroup(GroupDto groupDto);
}
