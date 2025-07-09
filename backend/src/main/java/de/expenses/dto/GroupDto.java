package de.expenses.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class GroupDto {

	private String code;

	@NotBlank(message = "{group.name.notBlank}")
	private String name;

	private List<UserDto> members;
}
