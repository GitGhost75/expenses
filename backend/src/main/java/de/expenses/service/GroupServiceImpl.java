package de.expenses.service;

import de.expenses.dto.GroupDto;
import de.expenses.mapper.GroupMapper;
import de.expenses.model.Group;
import de.expenses.repository.GroupRepository;
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
public class GroupServiceImpl implements GroupService{
	private static final Logger logger = LoggerFactory.getLogger(GroupServiceImpl.class);

	@Autowired
	private GroupRepository groupRepo;

	@Autowired
	private GroupMapper groupMapper;

	@Override
	public List<GroupDto> getGroups() {
		return groupRepo.findAll(Sort.by(Sort.Direction.ASC, "name")).stream()
		                .map(group -> groupMapper.toGroupDto(group)).collect(Collectors.toList());
	}

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
}
