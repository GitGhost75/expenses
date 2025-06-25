package de.expenses.mapper;

import de.expenses.dto.UserDto;
import de.expenses.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

	public UserDto toUserDto(User user);

	public User toUser(UserDto userDto);
}
