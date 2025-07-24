package de.expenses.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class GroupDto {

	private String code;

	@NotBlank(message = "{group.name.notBlank}")
	private String name;

	private List<UserDto> members;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate createdAt;

	private BigDecimal totalExpenses;
	private int countExpenses;
}
