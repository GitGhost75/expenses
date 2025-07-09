package de.expenses.mapper;

import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;
import de.expenses.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

	@Mapping(source = "group.code", target = "groupCode")
	public UserDto toDto(User user);

	public User toEntity(UserDto userDto);

	List<UserDto> toDtoList(List<User> members);
}
