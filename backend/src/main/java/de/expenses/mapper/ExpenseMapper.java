package de.expenses.mapper;

import de.expenses.dto.ExpenseDto;
import de.expenses.dto.GroupDto;
import de.expenses.model.Expense;
import de.expenses.model.Group;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

	public List<Expense> toEntityList(List<ExpenseDto> list);

	public List<ExpenseDto> toDtoList(List<Expense> entities);

	@Mapping(source = "group.code", target = "groupCode")
	@Mapping(source = "user.id", target = "userId")
	public ExpenseDto toDto(Expense entity);

	public Expense toEntity(ExpenseDto dto);


}
