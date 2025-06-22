package de.expenses;

import de.expenses.dto.UserDto;
import de.expenses.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

	public UserDto toUserDto(User user);

	public User toUser(UserDto userDto);
}
