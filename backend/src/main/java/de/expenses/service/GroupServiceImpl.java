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
		                       .orElseThrow(() -> new EntityNotFoundException("GroupCode not found with id: " + id));
		return groupMapper.toGroupDto(group);
	}

	@Override
	public GroupDto getGroup(UUID id, String code) {
		Group group = groupRepo.findByIdAndCode(id, code)
		                       .orElseThrow(() -> new EntityNotFoundException("GroupCode not found with id: " + id));
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
				() -> new EntityNotFoundException("GroupCode " + groupId + " not found."));

		User user = userMapper.toUser(userDto);
		group.addMember(user);
		Group savedGroup = groupRepo.save(group);
		return groupMapper.toGroupDto(savedGroup);
	}

	@Override
	public GroupDto addMember(GroupDto group, String memberName) {
		Group groupToSave = groupRepo.findById(group.getId()).orElseThrow(
				() -> new EntityNotFoundException("GroupCode " + group.getId() + " not found."));

		User userToSave = new User();
		userToSave.setName(memberName);
		User savedUser = userRepo.save(userToSave);

		groupToSave.addMember(savedUser);
		Group savedGroup = groupRepo.save(groupToSave);
		return groupMapper.toGroupDto(savedGroup);
	}

	@Override
	public GroupDto addMember(UUID groupId, UUID userId) {
		Group group = groupRepo.findById(groupId).orElseThrow(
				() -> new EntityNotFoundException("GroupCode " + groupId + " not found."));
		User user = userRepo.findById(userId).orElseThrow(
				() -> new EntityNotFoundException("user not found"));

		group.addMember(user);
		groupRepo.save(group);
		return groupMapper.toGroupDto(group);
	}

	@Override
	public List<GroupDto> getGroupsOfUser(String userId) {
		if (userId == null || userId.isBlank() || userRepo.findById(UUID.fromString(userId)).isEmpty()) {
			throw new EntityNotFoundException("User " + userId + " not available");
		}
		List<Group> groups = groupRepo.findByMembers_Id(UUID.fromString(userId));
		return groupMapper.toGroupList(groups);
	}


	public GroupDto createNewGroup(String name) {
		Group group = new Group();
		group.setName(name);
		group.setCode(generateGroupCode());
		Group saved = groupRepo.save(group);
		return groupMapper.toGroupDto(saved);
	}

	public boolean isCodeValid(UUID groupId, String submittedCode) {
		return groupRepo.findById(groupId)
		                      .map(g -> g.getCode().equals(submittedCode))
		                      .orElse(false);
	}

	private String generateGroupCode() {
		// 9-stelliger alphanumerischer Code, z. B. "X9F2D3"
		return UUID.randomUUID().toString()
		           .replace("-", "")
		           .substring(0, 9)
		           .toUpperCase();
	}
}
