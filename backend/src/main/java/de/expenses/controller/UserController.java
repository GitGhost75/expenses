package de.expenses.controller;

import de.expenses.model.User;
import de.expenses.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	private final UserRepository userRepo;

	public UserController(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	@GetMapping
	public List<User> getAllUsers() {
		logger.info("get all users");
		return userRepo.findAll();
	}

	@PostMapping
	public User createUser(@RequestBody User user) {
		logger.info("create a new user");
		return userRepo.save(user);
	}
}