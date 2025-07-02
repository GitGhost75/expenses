package de.expenses.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserDto {

	private UUID id;

	@NotBlank(message = "{user.name.notBlank}")
	private String name;

}
