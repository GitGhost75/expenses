package de.expenses.dto;

import de.expenses.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ExpenseDto {

	private UUID id;

	@NotNull
	private BigDecimal amount;

	private String description;

	@NotNull
	private LocalDateTime date;

	@NotNull
	private String groupCode;

	private List<UserDto> payers;

	private List<UserDto> receivers;

}
