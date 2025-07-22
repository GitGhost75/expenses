package de.expenses.service;

import de.expenses.dto.BillingDto;
import de.expenses.dto.ExpenseDto;
import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BillingService {

	@Autowired
	private ExpenseService expenseService;

	public List<BillingDto> getBillings(String groupCode) {

		List<BillingDto> billings = new ArrayList<>();

		Map<UserDto, List<ExpenseDto>> expensesPerUser = expenseService.getExpenses(groupCode).stream()
		                                                               .collect(Collectors.groupingBy(ExpenseDto::getUser));

		Map<UserDto, BigDecimal> totalAmountPerUser = expensesPerUser.entrySet().stream()
		                                                             .collect(Collectors.toMap(
				                                                             Map.Entry::getKey,
				                                                             e -> e.getValue().stream()
				                                                                   .map(ExpenseDto::getAmount)
				                                                                   .reduce(BigDecimal.ZERO, BigDecimal::add)
		                                                                                      ));

		// 1. Gesamtsumme & Durchschnitt
		BigDecimal total = totalAmountPerUser.values().stream()
		                                     .reduce(BigDecimal.ZERO, BigDecimal::add);

		int userCount = totalAmountPerUser.size();
		BigDecimal fairShare = total.divide(BigDecimal.valueOf(userCount), 2, RoundingMode.HALF_UP);

		// 2. User-Differenzen berechnen
		List<Balance> payers = new ArrayList<>();
		List<Balance> receivers = new ArrayList<>();

		for (Map.Entry<UserDto, BigDecimal> entry : totalAmountPerUser.entrySet()) {
			UserDto user = entry.getKey();
			BigDecimal diff = entry.getValue().subtract(fairShare);

			if (diff.compareTo(BigDecimal.ZERO) < 0) {
				payers.add(new Balance(user, diff.abs())); // muss zahlen
			} else if (diff.compareTo(BigDecimal.ZERO) > 0) {
				receivers.add(new Balance(user, diff)); // bekommt zurück
			}
		}

		// 3. Transfers matchen
		int i = 0, j = 0;
		while (i < payers.size() && j < receivers.size()) {
			Balance payer = payers.get(i);
			Balance receiver = receivers.get(j);

			BigDecimal transferAmount = payer.diff.min(receiver.diff);

			billings.add(new BillingDto(payer.user, receiver.user, transferAmount));

			payer.diff = payer.diff.subtract(transferAmount);
			receiver.diff = receiver.diff.subtract(transferAmount);

			if (payer.diff.compareTo(BigDecimal.ZERO) == 0)
				i++;
			if (receiver.diff.compareTo(BigDecimal.ZERO) == 0)
				j++;
		}

		return billings;
	}
}

// 2. User-Differenzen berechnen
class Balance {
	UserDto user;
	BigDecimal diff;

	Balance(UserDto user, BigDecimal diff) {
		this.user = user;
		this.diff = diff;
	}
}
