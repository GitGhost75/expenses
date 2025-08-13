package de.expenses.service;

import de.expenses.dto.GroupDto;
import de.expenses.mapper.GroupMapper;
import de.expenses.mapper.UserMapper;
import de.expenses.model.Expense;
import de.expenses.model.Group;
import de.expenses.repository.GroupRepository;
import de.expenses.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@Data
public class GroupService {
	private static final Logger logger = LoggerFactory.getLogger(GroupService.class);

	@Autowired
	private GroupRepository groupRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserService userService;

	@Autowired
	private GroupMapper groupMapper;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private BillingService billingService;

	public GroupDto getGroup(final String code) {
		Group group = groupRepo.findById(code)
		                       .orElseThrow(() -> new EntityNotFoundException("GroupCode not found with id: " + code));

		GroupDto result = groupMapper.toDto(group);

		BigDecimal totalExpenses = group.getExpenses().stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
		result.setTotalExpenses(totalExpenses);
		result.setCountExpenses(group.getExpenses().size());

		long count = userRepo.findByGroup_Code(code).stream().count();
		result.setMemberCount(count);

		return result;

	}


	public void deleteGroup(String code) {
		groupRepo.deleteById(code);
	}

	public GroupDto createNewGroup(String name) {
		Group saved = groupRepo.save(groupMapper.createEntity(name, generateGroupCode()));
		return groupMapper.toDto(saved);
	}

	public boolean isCodeValid(String code) {
		return groupRepo.findById(code).isPresent();
	}


	public GroupDto updateGroup(GroupDto dto) {
		Group group = groupRepo.findById(dto.getCode()).orElseThrow(
				() -> new EntityNotFoundException("GroupCode " + dto.getCode() + " not found."));

		Group toBeSaved = groupMapper.updateEntity(group, dto);

		return groupMapper.toDto(groupRepo.save(toBeSaved));
	}

	private String generateGroupCode() {
		// 9-stelliger alphanumerischer Code, z. B. "X9F2D3"
		return UUID.randomUUID().toString()
		           .replace("-", "")
		           .substring(0, 9)
		           .toUpperCase();
	}
}
