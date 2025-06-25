package de.expenses.service;

import de.expenses.mapper.UserMapper;
import de.expenses.dto.UserDto;
import de.expenses.model.User;
import de.expenses.repository.UserRepository;
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
public class UserServiceImpl implements UserService{
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserMapper userMapper;

	@Override
	public List<UserDto> getUsers() {
		return userRepo.findAll(Sort.by(Sort.Direction.ASC, "name")).stream()
				.map(user -> userMapper.toUserDto(user)).collect(Collectors.toList());
	}

	@Override
	public void deleteUser(UUID id) {
		userRepo.deleteById(id);
	}

	@Override
	public UserDto createUser(UserDto userDto) {
		User savedUser = userRepo.save(userMapper.toUser(userDto));
		return userMapper.toUserDto(savedUser);
	}
}
