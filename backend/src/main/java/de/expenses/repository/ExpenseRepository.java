package de.expenses.repository;


import de.expenses.model.Expense;
import de.expenses.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

	List<Expense> findByGroup_Code(String code);

	@Query("SELECT exp FROM Expense exp JOIN exp.payers p WHERE p.id = :userId")
	List<Expense> findByPayer(@Param("userId") UUID userId);
}