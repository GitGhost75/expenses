package de.expenses.controller;

import de.expenses.model.User;
import de.expenses.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserRepository userRepo;

	public UserController(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	@GetMapping
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@PostMapping
	public User createUser(@RequestBody User user) {
		return userRepo.save(user);
	}
}