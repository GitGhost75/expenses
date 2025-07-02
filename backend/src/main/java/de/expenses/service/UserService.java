package de.expenses.service;

import de.expenses.dto.UserDto;

import java.util.List;
import java.util.UUID;

public interface UserService {

	public List<UserDto> getUsers();

	public void deleteUser(UUID id);


}
