package de.expenses.service;

import de.expenses.dto.UserDto;
import de.expenses.model.User;

import java.util.List;

public interface UserService {

	public List<UserDto> getUsers();

	public void deleteUser(Long id);

	public UserDto createUser(UserDto user);
}
