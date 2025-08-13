package de.expenses.controller;

import de.expenses.dto.UserDto;
import de.expenses.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
		return ResponseEntity.ok(userService.createUser(userDto));
	}

	@PostMapping("/{name}")
	public ResponseEntity<UserDto> createUser(@PathVariable String name, @RequestParam String groupCode) {
		return ResponseEntity.ok(userService.createUser(name, groupCode));
	}

	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getUser(@PathVariable UUID userId) {
		return ResponseEntity.ok(userService.getUser(userId));
	}

	@GetMapping("/group/{groupCode}")
	public ResponseEntity<List<UserDto>> getMembers(@PathVariable String groupCode) {
		return ResponseEntity.ok(userService.getGroupMembers(groupCode));
	}

	@PatchMapping
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto) {
		return ResponseEntity.ok(userService.updateUser(userDto));
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity deleteUser(@PathVariable UUID userId) {
		userService.deleteUser(userId);
		return ResponseEntity.noContent().build();
	}
}