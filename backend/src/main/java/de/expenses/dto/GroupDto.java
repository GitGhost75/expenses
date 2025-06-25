package de.expenses.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class GroupDto {

	private UUID id;

	@NotBlank(message = "{group.name.notBlank}")
	private String name;

	private List<UserDto> members;
}
