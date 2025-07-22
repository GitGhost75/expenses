package de.expenses.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class BillingDto {

	private UserDto payer;
	private UserDto receiver;
	private BigDecimal amount;
}
