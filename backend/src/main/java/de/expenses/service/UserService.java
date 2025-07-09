package de.expenses.service;

import de.expenses.dto.UserDto;
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
import org.springframework.stereotype.Service;

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
	private UserMapper userMapper;

	public UserDto createUser(UserDto userDto) {

		Group g = groupRepo.findById(userDto.getGroupCode()).orElseThrow(()->new EntityNotFoundException("group not found"));

		User toBeSaved = userMapper.toEntity(userDto);
		toBeSaved.setGroup(g);
		User savedUser = userRepo.save(toBeSaved);
		return userMapper.toDto(savedUser);
	}

	public UserDto getUser(UUID userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new EntityNotFoundException("user not found"));
		return userMapper.toDto(user);
	}

	public List<UserDto> getGroupMembers(String groupCode) {
		Group g = groupRepo.findById(groupCode).orElseThrow(()->new EntityNotFoundException("group not found"));
		List<User> members = userRepo.findByGroup_Code(g.getCode());
		return userMapper.toDtoList(members);
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
