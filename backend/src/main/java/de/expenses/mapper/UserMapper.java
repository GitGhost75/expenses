package de.expenses.mapper;

import de.expenses.dto.UserDto;
import de.expenses.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;
import java.util.List;

@Mapper(componentModel = "spring", uses = {ExpenseMapper.class})
public interface UserMapper {

	@Mapping(source = "user.group.code", target = "groupCode")
	UserDto toDto(User user);

	@Mapping(source = "user.group.code", target = "groupCode")
	@Mapping(source = "balance", target = "balance")
	UserDto toDto(User user, BigDecimal balance);

	User toEntity(UserDto userDto);

	List<UserDto> toDtoList(List<User> members);
}
