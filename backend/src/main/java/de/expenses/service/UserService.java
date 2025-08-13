package de.expenses.service;

import de.expenses.dto.UserDto;
import de.expenses.mapper.GroupMapper;
import de.expenses.mapper.UserMapper;
import de.expenses.model.Expense;
import de.expenses.model.Group;
import de.expenses.model.User;
import de.expenses.repository.ExpenseRepository;
import de.expenses.repository.GroupRepository;
import de.expenses.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@Data
public class UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private GroupRepository groupRepo;
	@Autowired
	private ExpenseRepository expenseRepo;

	@Autowired
	private UserMapper userMapper;
	@Autowired
	private GroupMapper groupMapper;

	@Autowired
	private BillingService billingService;

	public UserDto createUser(UserDto userDto) {

		Group g = groupRepo.findById(userDto.getGroupCode()).orElseThrow(()->new EntityNotFoundException(String.format("group %s not found", userDto.getGroupCode())));

		User toBeSaved = userMapper.toEntity(userDto);
		toBeSaved.setGroup(g);
		User savedUser = userRepo.save(toBeSaved);
		return userMapper.toDto(savedUser);
	}

	public UserDto createUser(final String name, final String groupCode) {
		Group g = groupRepo.findById(groupCode).orElseThrow(()->new EntityNotFoundException("group not found"));
		if (userRepo.existsByName(name)) {
			throw new IllegalArgumentException(String.format("User with name %s already exists in group %s", name, groupCode));
		}
		User toBeSaved = userMapper.createEntity(name);
		User x = userMapper.addGroup(toBeSaved, groupMapper.toDto(g));
		User savedUser = userRepo.save(x);
		return userMapper.toDto(savedUser);
	}

	public UserDto getUser(final UUID userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new EntityNotFoundException("user not found"));
		List<Expense> expenses = expenseRepo.findByPayer(userId);
		return userMapper.toDto(user, expenses);
	}

	public List<UserDto> getGroupMembers(String groupCode) {
		Group g = groupRepo.findById(groupCode).orElseThrow(()->new EntityNotFoundException("group not found"));
		List<User> members = userRepo.findByGroup_Code(g.getCode());
		List<UserDto> dtoList = userMapper.toDtoList(members);

		dtoList.forEach(user -> {
			List<Expense> expenses = expenseRepo.findByPayer(user.getId());
			userMapper.addBalance(user, expenses);
		});

		return dtoList;

	}

	public UserDto updateUser(UserDto userDto) {
		userRepo.findById(userDto.getId()).orElseThrow(() -> new EntityNotFoundException("user not found"));
		Group g = groupRepo.findById(userDto.getGroupCode()).orElseThrow(()->new EntityNotFoundException("group not found"));

		User u = userMapper.toEntity(userDto);
		u.setGroup(g);

		User saved = userRepo.save(u);
		return userMapper.toDto(saved);
	}

	public void deleteUser(UUID userId) {
		userRepo.deleteById(userId);
	}
}
