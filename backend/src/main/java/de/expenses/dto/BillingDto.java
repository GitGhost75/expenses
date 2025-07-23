package de.expenses.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BillingDto {
	private String payer;
	private String receiver;
	private BigDecimal amount;
}
