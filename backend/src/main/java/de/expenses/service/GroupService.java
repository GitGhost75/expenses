package de.expenses.service;

import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;

import java.util.List;
import java.util.UUID;

public interface GroupService {

	public GroupDto addMember(GroupDto group, String memberName);

	public GroupDto addMember(String code, UUID userId);

	public GroupDto createGroup(GroupDto groupDto);

	public GroupDto createMember(String code, UserDto userDto);

	public void deleteGroup(String code);

	public GroupDto getGroup(String code);

	public List<GroupDto> getGroupsOfUser(String userId);

	public GroupDto createNewGroup(String name);

	public boolean isCodeValid(String code);

	public GroupDto updateGroup(GroupDto dto);
}
