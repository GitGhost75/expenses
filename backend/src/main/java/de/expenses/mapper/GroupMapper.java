package de.expenses.mapper;

import de.expenses.dto.GroupDto;
import de.expenses.model.Group;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupMapper {

	public List<GroupDto> toGroupList(List<Group> groupList);

	public GroupDto toGroupDto(Group group);

	public Group toGroup(GroupDto groupDto);
}
