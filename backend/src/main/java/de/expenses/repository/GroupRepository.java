package de.expenses.repository;


import de.expenses.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, String> {

	Optional<Group> findByCode(String code);
	List<Group> findByMembers_Id(UUID userId);

}