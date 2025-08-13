package de.expenses.repository;


import de.expenses.model.Expense;
import de.expenses.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

	List<User> findByGroup_Code(String code);

	Boolean existsByName(final String name);
}