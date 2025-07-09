package de.expenses.service;

import de.expenses.dto.ExpenseDto;
import de.expenses.mapper.ExpenseMapper;
import de.expenses.model.Expense;
import de.expenses.model.Group;
import de.expenses.repository.ExpenseRepository;
import de.expenses.repository.GroupRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class ExpenseService {
	private static final Logger logger = LoggerFactory.getLogger(ExpenseService.class);

	@Autowired
	private ExpenseRepository expenseRepo;

	@Autowired
	private GroupRepository groupRepo;

	@Autowired
	private ExpenseMapper expenseMapper;

	public List<ExpenseDto> getExpenses(String groupCode) {
		List<Expense> expenses = expenseRepo.findByGroup_Code(groupCode);
		return expenseMapper.toDtoList(expenses);
	}

	public ExpenseDto createExpense(ExpenseDto dto) {

		Group g = groupRepo.findById(dto.getGroupCode()).orElseThrow(
				() -> new EntityNotFoundException("Group not found"));
		Expense ex = expenseMapper.toEntity(dto);
		ex.setGroup(g);
		Expense savedExpense = expenseRepo.save(ex);

		return expenseMapper.toDto(savedExpense);
	}
}
