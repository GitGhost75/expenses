package de.expenses.service;

import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;
import de.expenses.mapper.GroupMapper;
import de.expenses.mapper.UserMapper;
import de.expenses.model.Group;
import de.expenses.model.User;
import de.expenses.repository.GroupRepository;
import de.expenses.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Data
public class GroupServiceImpl implements GroupService {
	private static final Logger logger = LoggerFactory.getLogger(GroupServiceImpl.class);

	@Autowired
	private GroupRepository groupRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private GroupMapper groupMapper;

	@Autowired
	private UserMapper userMapper;

	@Override
	public GroupDto getGroup(UUID id) {
		Group group = groupRepo.findById(id)
		                       .orElseThrow(() -> new EntityNotFoundException("Group not found with id: " + id));
		return groupMapper.toGroupDto(group);
	}

	@Override
	public void deleteGroup(UUID id) {
		groupRepo.deleteById(id);
	}

	@Override
	public GroupDto createGroup(GroupDto groupDto) {
		Group savedGroup = groupRepo.save(groupMapper.toGroup(groupDto));
		return groupMapper.toGroupDto(savedGroup);
	}

	@Override
	public GroupDto createMember(UUID groupId, UserDto userDto) {
		Group group = groupRepo.findById(groupId).orElseThrow(
				() -> new EntityNotFoundException("Group " + groupId + " not found."));

		User user = userMapper.toUser(userDto);
		group.addMember(user);
		Group savedGroup = groupRepo.save(group);
		return groupMapper.toGroupDto(savedGroup);
	}

	@Override
	public GroupDto addMember(UUID groupId, UUID userId) {
		Group group = groupRepo.findById(groupId).orElseThrow(
				() -> new EntityNotFoundException("Group " + groupId + " not found."));
		User user = userRepo.findById(userId).orElseThrow(
				() -> new EntityNotFoundException("user not found"));

		group.addMember(user);
		groupRepo.save(group);
		return groupMapper.toGroupDto(group);
	}

	@Override
	public List<GroupDto> getGroupsOfUser(String userId) {
		List<Group> groups = groupRepo.findByMembers_Id(UUID.fromString(userId));
		return groupMapper.toGroupList(groups);
	}
}
