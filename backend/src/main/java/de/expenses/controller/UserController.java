package de.expenses.controller;

import de.expenses.model.User;
import de.expenses.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<List<User>> getAllUsers() {
		logger.info("get all users");
		return ResponseEntity.ok(userRepo.findAll());
	}

	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user) {
		logger.info("create a new user");
		return ResponseEntity.ok(userRepo.save(user));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		logger.info("delete user with id {}", id);
		userRepo.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}