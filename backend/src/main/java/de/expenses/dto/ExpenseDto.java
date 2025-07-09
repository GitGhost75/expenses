package de.expenses.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ExpenseDto {

	private UUID id;

	private BigDecimal amount;

	private String description;

	private LocalDateTime date;

	@NotNull
	private String groupCode;

}
