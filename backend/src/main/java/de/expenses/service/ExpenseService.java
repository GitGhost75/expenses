package de.expenses.service;

import de.expenses.dto.ExpenseDto;
import de.expenses.mapper.ExpenseMapper;
import de.expenses.model.Expense;
import de.expenses.model.Group;
import de.expenses.model.User;
import de.expenses.repository.ExpenseRepository;
import de.expenses.repository.GroupRepository;
import de.expenses.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Data
public class ExpenseService {
	private static final Logger logger = LoggerFactory.getLogger(ExpenseService.class);

	@Autowired
	private ExpenseRepository expenseRepo;

	@Autowired
	private GroupRepository groupRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ExpenseMapper expenseMapper;

	public List<ExpenseDto> getExpenses(String groupCode) {
		List<Expense> expenses = expenseRepo.findByGroup_Code(groupCode);
		return expenseMapper.toDtoList(expenses);
	}

	public List<ExpenseDto> getExpenses(UUID userId) {
		List<Expense> expenses = expenseRepo.findByPayer(userId);
		return expenseMapper.toDtoList(expenses);
	}

	public ExpenseDto updateExpense(ExpenseDto dto) {

		Expense e = expenseRepo.findById(dto.getId()).orElseThrow(
				() -> new EntityNotFoundException("Expense not found"));

		Group g = groupRepo.findById(dto.getGroupCode()).orElseThrow(
				() -> new EntityNotFoundException("Group not found"));

		Expense saved = expenseRepo.save(expenseMapper.toEntity(dto));
		return expenseMapper.toDto(saved);
	}

	public ExpenseDto createExpense(ExpenseDto dto) {

		Group g = groupRepo.findById(dto.getGroupCode()).orElseThrow(
				() -> new EntityNotFoundException("Group not found"));

		Expense ex = expenseMapper.toEntity(dto);
		ex.setGroup(g);

		Expense savedExpense = expenseRepo.save(ex);

		return expenseMapper.toDto(savedExpense);
	}

	public void deleteExpense(UUID id) {
		expenseRepo.deleteById(id);
	}
}
