package de.expenses.controller;

import de.expenses.dto.UserDto;
import de.expenses.model.User;
import de.expenses.repository.UserRepository;
import de.expenses.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping
	public ResponseEntity<List<UserDto>> getAllUsers() {
		logger.info("get all users");
		return ResponseEntity.ok(userService.getUsers());
	}

	@PostMapping
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
		logger.info("create a new user");
		return ResponseEntity.ok(userService.createUser(userDto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		logger.info("delete user with id {}", id);
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
}