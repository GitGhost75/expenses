package de.expenses.service;

import de.expenses.model.User;

import java.util.List;

public interface UserService {

	public List<User> getUsers();

	public void deleteUser(Long id);

	public User createUser(User user);
}
