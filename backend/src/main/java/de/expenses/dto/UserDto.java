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

	@NotBlank(message = "Name darf nicht leer sein")
	private String name;


	@NotBlank(message = "E-Mail darf nicht leer sein")
	@Email(message = "Ungültige E-Mail-Adresse")
	private String email;
}
