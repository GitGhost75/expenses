package de.expenses.controller;

import de.expenses.dto.UserDto;
import de.expenses.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/group/users")
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

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
		logger.info("delete user with id {}", id);
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
}