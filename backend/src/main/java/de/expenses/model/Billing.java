package de.expenses.model;

import de.expenses.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class Billing {

	private User payer;
	private User receiver;
	private BigDecimal amount;
}
