package de.expenses.service;

import de.expenses.dto.GroupDto;
import de.expenses.mapper.GroupMapper;
import de.expenses.mapper.UserMapper;
import de.expenses.model.Group;
import de.expenses.repository.GroupRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Data
public class GroupService {
	private static final Logger logger = LoggerFactory.getLogger(GroupService.class);

	@Autowired
	private GroupRepository groupRepo;

	@Autowired
	private UserService userService;

	@Autowired
	private GroupMapper groupMapper;

	@Autowired
	private UserMapper userMapper;



	public GroupDto getGroup(String code) {
		Group group = groupRepo.findById(code)
		                       .orElseThrow(() -> new EntityNotFoundException("GroupCode not found with id: " + code));
		return groupMapper.toDto(group);
	}


	public void deleteGroup(String code) {
		groupRepo.deleteById(code);
	}

	public GroupDto createNewGroup(String name) {
		Group group = new Group();
		group.setName(name);
		group.setCode(generateGroupCode());
		Group saved = groupRepo.save(group);
		return groupMapper.toDto(saved);
	}

	public boolean isCodeValid(String code) {
		return groupRepo.findById(code).isPresent();
	}


	public GroupDto updateGroup(GroupDto dto) {
		groupRepo.findById(dto.getCode()).orElseThrow(
				() -> new EntityNotFoundException("GroupCode " + dto.getCode() + " not found."));

		Group toSave = groupMapper.toEntity(dto);
		toSave.getMembers().forEach(member -> member.setGroup(toSave));

		Group savedGroup = groupRepo.save(toSave);

		return groupMapper.toDto(savedGroup);
	}

	private String generateGroupCode() {
		// 9-stelliger alphanumerischer Code, z. B. "X9F2D3"
		return UUID.randomUUID().toString()
		           .replace("-", "")
		           .substring(0, 9)
		           .toUpperCase();
	}
}
