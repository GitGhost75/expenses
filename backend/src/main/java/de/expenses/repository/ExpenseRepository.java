package de.expenses.repository;


import de.expenses.model.Expense;
import de.expenses.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

	List<Expense> findByGroup_Code(String code);

	List<Expense> findByUser_Id(UUID userId);
}