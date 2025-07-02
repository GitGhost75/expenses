package de.expenses.service;

import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;

import java.util.List;
import java.util.UUID;

public interface GroupService {

	public GroupDto addMember(UUID groupId, UUID userId);

	public GroupDto createGroup(GroupDto groupDto);

	public GroupDto createMember(UUID groupId, UserDto userDto);

	public void deleteGroup(UUID id);

	public GroupDto getGroup(UUID id);

	public List<GroupDto> getGroupsOfUser(String userId);

}
