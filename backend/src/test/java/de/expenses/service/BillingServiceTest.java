package de.expenses.service;

import de.expenses.dto.BillingDto;
import de.expenses.mapper.BillingMapper;
import de.expenses.model.Billing;
import de.expenses.model.Expense;
import de.expenses.model.Group;
import de.expenses.model.User;
import de.expenses.repository.ExpenseRepository;
import de.expenses.repository.GroupRepository;
import de.expenses.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BillingServiceTest {

	private ExpenseRepository expenseRepository;
	private UserRepository userRepository;
	private GroupRepository groupRepository;
	private BillingService billingService;
	@Autowired
	private BillingMapper billingMapper;

	@BeforeEach
	void setUp() {
		expenseRepository = mock(ExpenseRepository.class);
		groupRepository = mock(GroupRepository.class);
		billingMapper = mock(BillingMapper.class);

		billingService = new BillingService(expenseRepository, groupRepository, billingMapper);
	}

	@Test
	public void testGetBillings() {

		User alex = new User(UUID.randomUUID(), "Alex", null);
		User franka = new User(UUID.randomUUID(), "Franka", null);
		User sebastian = new User(UUID.randomUUID(), "Sebastian", null);

		Expense expenseA = new Expense(
				UUID.randomUUID(),
				null,
				BigDecimal.TEN,
				"Test-Expense",
				LocalDateTime.now(),
				List.of(alex, franka, sebastian),
				List.of(alex, franka)
		);

		Expense expenseB = new Expense(
				UUID.randomUUID(),
				null,
				BigDecimal.TEN,
				"Test-Expense",
				LocalDateTime.now(),
				List.of(alex, franka),
				List.of(alex, sebastian)
		);

		Expense expenseC = new Expense(
				UUID.randomUUID(),
				null,
				BigDecimal.TEN,
				"Test-Expense",
				LocalDateTime.now(),
				List.of(alex),
				List.of(alex, franka)
		);

		Expense expenseD = new Expense(
				UUID.randomUUID(),
				null,
				BigDecimal.TEN,
				"Test-Expense",
				LocalDateTime.now(),
				List.of(franka),
				List.of(alex)
		);

		Expense expenseE = new Expense(
				UUID.randomUUID(),
				null,
				BigDecimal.TEN,
				"Test-Expense",
				LocalDateTime.now(),
				List.of(franka),
				List.of(alex, sebastian)
		);

		Expense expenseF = new Expense(
				UUID.randomUUID(),
				null,
				BigDecimal.TEN,
				"Test-Expense",
				LocalDateTime.now(),
				List.of(alex, franka),
				List.of(sebastian)
		);

		Group mockGroup = new Group(
				"Testgruppe",
				"ABC123DEF",
				List.of(alex, franka, sebastian),
				List.of(expenseA, expenseB),// expenseC, expenseD, expenseE, expenseF),
				LocalDate.now());

		when(groupRepository.findByCode(mockGroup.getCode())).thenReturn(Optional.of(mockGroup));
		when(expenseRepository.findByGroup_Code(mockGroup.getCode())).thenReturn(mockGroup.getExpenses());

		List<Billing> billings = billingService.getBillingsInternal(mockGroup.getCode());

		Assertions.assertNotNull(billings);
	}

}