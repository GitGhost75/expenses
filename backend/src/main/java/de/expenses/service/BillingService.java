package de.expenses.service;

import de.expenses.dto.BillingDto;
import de.expenses.mapper.BillingMapper;
import de.expenses.model.*;
import de.expenses.repository.ExpenseRepository;
import de.expenses.repository.GroupRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.commons.lang3.tuple.Pair;
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
	private GroupRepository groupRepo;
	@Autowired
	private BillingMapper billingMapper;
	@Autowired
	private ExpenseRepository expenseRepo;

	public List<BillingDto> getBillings(String groupCode) {
		Group group = getGroup(groupCode);

		// User-Differenzen berechnen
		Pair<List<Balance>, List<Balance>> balances = createBalances(group);

		// Transfers matchen
		List<Billing> billings = createBillings(balances);
		return billingMapper.toDtoList(billings);
	}

	public BigDecimal getBalance(User user) {
		return BigDecimal.ZERO;
//		BigDecimal fairShare = getFairShare(user.getGroup());
//		BigDecimal userExpenses = user.getExpenses().stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
//		return userExpenses.subtract(fairShare);
	}

	private Group getGroup(String groupCode) {
		return groupRepo.findById(groupCode).orElseThrow(
				() -> new EntityNotFoundException("Group with code " + groupCode + " not found"));
	}

	public BigDecimal getTotalExpenses(Group group) {
		return group.getExpenses().stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
	}

	public Map<User, BigDecimal> getExpensesPerUser(Group group) {
		List<Expense> expenses = group.getExpenses();

		Map<User, List<Expense>> expensesPerUser = expenses.stream()
		                                                   .flatMap(ex -> ex.getPayers().stream().
		                                                                    map(payer -> Map.entry(payer, ex)))
		                                                   .collect(Collectors.groupingBy(Map.Entry::getKey, Collectors.mapping(Map.Entry::getValue, Collectors.toList())));

		Map<User, BigDecimal> result = expensesPerUser.entrySet().stream()
		                                              .collect(Collectors.toMap(
				                                              Map.Entry::getKey,
				                                              e -> e.getValue().stream()
				                                                    .map(ex-> ex.getAmount().divide(new BigDecimal(ex.getPayers().size()), RoundingMode.HALF_DOWN))
				                                                    .reduce(BigDecimal.ZERO, BigDecimal::add)));

		List<User> usersWithExpenses = expensesPerUser.keySet().stream().toList();
		List<User> usersWithoutExpenses = group.getMembers().stream().filter(m -> !usersWithExpenses.contains(m)).toList();

		// add empty expense for users without expenses
		usersWithoutExpenses.forEach(u -> result.put(u, BigDecimal.ZERO));

		return result;
	}

	private int getUserCount(Group group) {
		return group.getMembers().size();
	}

	private BigDecimal getFairShare(Group group) {
		BigDecimal total = getTotalExpenses(group);
		return total.divide(BigDecimal.valueOf(getUserCount(group)), 2, RoundingMode.HALF_UP);
	}


	private Pair<List<Balance>, List<Balance>> createBalances(Group group) {
		Map<User, BigDecimal> totalAmountPerUser = getExpensesPerUser(group);
		BigDecimal fairShare = getFairShare(group);

		// 2. User-Differenzen berechnen
		Pair<List<Balance>, List<Balance>> balances = Pair.of(new ArrayList<Balance>(), new ArrayList<Balance>());

		for (Map.Entry<User, BigDecimal> entry : totalAmountPerUser.entrySet()) {
			User user = entry.getKey();
			BigDecimal diff = entry.getValue().subtract(fairShare);

			if (diff.compareTo(BigDecimal.ZERO) < 0) {
				balances.getLeft().add(new Balance(user, diff.abs())); // muss zahlen
			} else if (diff.compareTo(BigDecimal.ZERO) > 0) {
				balances.getRight().add(new Balance(user, diff)); // bekommt zurück
			}
		}
		return balances;
	}

	private List<Billing> createBillings(Pair<List<Balance>, List<Balance>> balances) {

		List<Billing> billings = new ArrayList<>();
		int i = 0;
		int j = 0;
		while (i < balances.getLeft().size() && j < balances.getRight().size()) {
			Balance payer = balances.getLeft().get(i);
			Balance receiver = balances.getRight().get(j);

			BigDecimal transferAmount = payer.getDiff().min(receiver.getDiff());

			billings.add(new Billing(payer.getUser(), receiver.getUser(), transferAmount));

			payer.setDiff(payer.getDiff().subtract(transferAmount));
			receiver.setDiff(receiver.getDiff().subtract(transferAmount));

			if (payer.getDiff().compareTo(BigDecimal.ZERO) == 0)
				i++;
			if (receiver.getDiff().compareTo(BigDecimal.ZERO) == 0)
				j++;
		}
		return billings;
	}
}

