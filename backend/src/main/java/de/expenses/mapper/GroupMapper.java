package de.expenses.mapper;

import de.expenses.dto.GroupDto;
import de.expenses.model.Group;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses ={ExpenseMapper.class, UserMapper.class})
public interface GroupMapper {

	public List<GroupDto> toDtoList(List<Group> groupList);

	public GroupDto toDto(Group group);

	public Group toEntity(GroupDto groupDto);
}
