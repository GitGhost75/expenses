package de.expenses.mapper;

import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;
import de.expenses.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

	public UserDto toUserDto(User user);

	@Mapping(source = "userDto.name", target = "name")
	@Mapping(source = "groupDto", target = "group")
	public User toUser(UserDto userDto, GroupDto groupDto);
}
