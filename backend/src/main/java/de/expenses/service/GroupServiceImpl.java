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
	public GroupDto getGroup(String code) {
		Group group = groupRepo.findById(code)
		                       .orElseThrow(() -> new EntityNotFoundException("GroupCode not found with id: " + code));
		return groupMapper.toGroupDto(group);
	}

	@Override
	public void deleteGroup(String code) {
		groupRepo.deleteById(code);
	}

	@Override
	public GroupDto createGroup(GroupDto groupDto) {
		try {
			Group savedGroup = groupRepo.save(groupMapper.toGroup(groupDto));
			return groupMapper.toGroupDto(savedGroup);
		} catch (Exception e) {
			throw new IllegalArgumentException("failed", e);
		}
	}

	@Override
	public GroupDto createMember(String code, UserDto userDto) {
		Group group = groupRepo.findById(code).orElseThrow(
				() -> new EntityNotFoundException("GroupCode " + code + " not found."));

		User user = userMapper.toUser(userDto, groupMapper.toGroupDto(group));
		userRepo.save(user);
		group.addMember(user);
		return groupMapper.toGroupDto(group);
	}

	@Override
	public GroupDto addMember(GroupDto group, String memberName) {
		Group groupToSave = groupRepo.findById(group.getCode()).orElseThrow(
				() -> new EntityNotFoundException("GroupCode " + group.getCode() + " not found."));

		User userToSave = new User();
		userToSave.setName(memberName);
		userToSave.setGroup(groupToSave);
		User savedUser = userRepo.save(userToSave);

		groupToSave.addMember(savedUser);
		return groupMapper.toGroupDto(groupToSave);
	}

	@Override
	public GroupDto addMember(String code, UUID userId) {
		Group group = groupRepo.findById(code).orElseThrow(
				() -> new EntityNotFoundException("GroupCode " + code + " not found."));
		User user = userRepo.findById(userId).orElseThrow(
				() -> new EntityNotFoundException("user not found"));

		user.setGroup(group);
		userRepo.save(user);
		group.addMember(user);
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

	public boolean isCodeValid(String code) {
		return groupRepo.findById(code).isPresent();
	}

	@Override
	public GroupDto updateGroup(GroupDto dto) {
		groupRepo.findById(dto.getCode()).orElseThrow(
				() -> new EntityNotFoundException("GroupCode " + dto.getCode() + " not found."));

		Group toSave = groupMapper.toGroup(dto);
		toSave.getMembers().forEach(member -> member.setGroup(toSave));

		Group savedGroup = groupRepo.save(toSave);

		return groupMapper.toGroupDto(savedGroup);
	}

	private String generateGroupCode() {
		// 9-stelliger alphanumerischer Code, z. B. "X9F2D3"
		return UUID.randomUUID().toString()
		           .replace("-", "")
		           .substring(0, 9)
		           .toUpperCase();
	}
}
