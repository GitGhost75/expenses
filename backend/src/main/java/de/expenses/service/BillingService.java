package de.expenses.service;

import de.expenses.dto.BillingDto;
import de.expenses.mapper.BillingMapper;
import de.expenses.model.*;
import de.expenses.repository.ExpenseRepository;
import de.expenses.repository.GroupRepository;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BillingService {

	private final GroupRepository groupRepository;
	private final ExpenseRepository expenseRepository;
	private final BillingMapper billingMapper;

	@Autowired
	public BillingService(ExpenseRepository expenseRepository,
	                      GroupRepository groupRepository,
	                      BillingMapper billingMapper) {
		this.groupRepository = groupRepository;
		this.expenseRepository = expenseRepository;
		this.billingMapper = billingMapper;
	}

	public List<BillingDto> getBillings(String groupCode) {
		return billingMapper.toDtoList(getBillingsInternal(groupCode));
	}

	public List<Billing> getBillingsInternal(String groupCode) {
		Pair<List<Balance>, List<Balance>> balances = createBalances(groupCode);
		return createBillings(balances);
	}

	private Pair<List<Balance>, List<Balance>> createBalances(String groupCode) {
		List<User> members = groupRepository.findByCode(groupCode)
		                                    .map(Group::getMembers)
		                                    .orElse(new ArrayList<>());

		if (members.isEmpty()) {
			return Pair.of(new ArrayList<>(), new ArrayList<>());
		}

		List<Expense> expenseList = expenseRepository.findByGroup_Code(groupCode);
		Map<User, BigDecimal> balanceMap = new HashMap<>();

		for (Expense expense : expenseList) {
			List<User> payers = expense.getPayers();
			List<User> receivers = expense.getReceivers();

			BigDecimal amountPerPayer = expense.getAmount().divide(BigDecimal.valueOf(payers.size()), 2, RoundingMode.HALF_DOWN);
			BigDecimal amountPerReceiver = expense.getAmount().divide(BigDecimal.valueOf(receivers.size()), 2, RoundingMode.HALF_DOWN);

			for (User payer : payers) {
				balanceMap.merge(payer, amountPerPayer, BigDecimal::add);
			}

			for (User receiver : receivers) {
				balanceMap.merge(receiver, amountPerReceiver.negate(), BigDecimal::add);
			}
		}

		List<Balance> willPay = new ArrayList<>();
		List<Balance> willReceive = new ArrayList<>();

		for (Map.Entry<User, BigDecimal> entry : balanceMap.entrySet()) {
			BigDecimal balance = entry.getValue();
			if (balance.compareTo(BigDecimal.ZERO) > 0) {
				willReceive.add(new Balance(entry.getKey(), balance));
			} else if (balance.compareTo(BigDecimal.ZERO) < 0) {
				willPay.add(new Balance(entry.getKey(), balance.abs()));
			}
		}

		return Pair.of(willPay, willReceive);
	}

	private List<Billing> createBillings(Pair<List<Balance>, List<Balance>> balances) {
		List<Billing> billings = new ArrayList<>();
		List<Balance> payers = balances.getLeft();
		List<Balance> receivers = balances.getRight();

		int payerIndex = 0;
		int receiverIndex = 0;

		while (payerIndex < payers.size() && receiverIndex < receivers.size()) {
			Balance payer = payers.get(payerIndex);
			Balance receiver = receivers.get(receiverIndex);

			BigDecimal transferAmount = payer.getAmount().min(receiver.getAmount());

			billings.add(new Billing(payer.getUser(), receiver.getUser(), transferAmount));

			payer.setAmount(payer.getAmount().subtract(transferAmount));
			receiver.setAmount(receiver.getAmount().subtract(transferAmount));

			if (payer.getAmount().compareTo(BigDecimal.ZERO) == 0) {
				payerIndex++;
			}

			if (receiver.getAmount().compareTo(BigDecimal.ZERO) == 0) {
				receiverIndex++;
			}
		}
		return billings;
	}
}

