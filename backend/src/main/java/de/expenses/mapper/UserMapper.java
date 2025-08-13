package de.expenses.mapper;

import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;
import de.expenses.model.Expense;
import de.expenses.model.Group;
import de.expenses.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Mapper(componentModel = "spring", uses = {ExpenseMapper.class, GroupMapper.class})
public interface UserMapper {

	@Mapping(source = "user.group.code", target = "groupCode")
	UserDto toDto(User user);

	@Mapping(source = "user.group.code", target = "groupCode")
	@Mapping(source = "balance", target = "balance")
	UserDto toDto(User user, BigDecimal balance);

	default UserDto toDto(User user, List<Expense> expenses) {
		return toDto(user, calculateBalance(expenses));
	}

	User createEntity(final String name);

	User toEntity(UserDto userDto);

	List<UserDto> toDtoList(List<User> members);

	default UserDto addBalance(@MappingTarget UserDto dto, List<Expense> expenses) {

		dto.setBalance(calculateBalance(expenses));
		return dto;
	}

	@Mapping(source = "group", target="group")
	@Mapping(target = "name", ignore = true)
	User addGroup(@MappingTarget User toBeSaved, GroupDto group);

	default BigDecimal calculateBalance(List<Expense> expenses) {
		BigDecimal amount = expenses.stream().map(b -> {
			BigDecimal result = b.getAmount().divide(new BigDecimal(b.getPayers().size()), 2, RoundingMode.HALF_DOWN);
			return result;
		}).reduce(BigDecimal.ZERO, BigDecimal::add);
		//		BigDecimal amount = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
		return amount;
	}
}
