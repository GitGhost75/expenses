package de.expenses.repository;


import de.expenses.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, UUID> {

	List<Group> findByMembers_Id(UUID userId);

	Optional<Group> findByIdAndCode(UUID id, String code);
}