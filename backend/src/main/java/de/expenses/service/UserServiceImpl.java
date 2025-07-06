package de.expenses.service;

import de.expenses.dto.UserDto;
import de.expenses.mapper.GroupMapper;
import de.expenses.mapper.UserMapper;
import de.expenses.repository.GroupRepository;
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
public class UserServiceImpl implements UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private GroupRepository groupRepo;

	@Autowired
	private UserMapper userMapper;
	@Autowired
	private GroupMapper groupMapper;


	@Override
	public void renameUser(UserDto user) {

	}
}
