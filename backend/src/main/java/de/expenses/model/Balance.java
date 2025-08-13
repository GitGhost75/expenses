package de.expenses.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class Balance {
	User user;
	BigDecimal amount;
}