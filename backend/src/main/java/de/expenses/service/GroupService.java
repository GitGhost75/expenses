package de.expenses.service;

import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;
import de.expenses.model.Group;

import java.util.List;
import java.util.UUID;

public interface GroupService {

	public GroupDto addMember(GroupDto group, String memberName);

	public GroupDto addMember(UUID groupId, UUID userId);

	public GroupDto createGroup(GroupDto groupDto);

	public GroupDto createMember(UUID groupId, UserDto userDto);

	public void deleteGroup(UUID id);

	public GroupDto getGroup(UUID id);

	public GroupDto getGroup(UUID id, String code);

	public List<GroupDto> getGroupsOfUser(String userId);

	public GroupDto createNewGroup(String name);

	public boolean isCodeValid(UUID groupId, String submittedCode);
}
