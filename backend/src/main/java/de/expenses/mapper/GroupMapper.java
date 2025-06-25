package de.expenses.mapper;

import de.expenses.dto.GroupDto;
import de.expenses.model.Group;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupMapper {

	public GroupDto toGroupDto(Group group);

	public Group toGroup(GroupDto groupDto);
}
