package de.expenses.controller;

import de.expenses.dto.GroupDto;
import de.expenses.service.GroupService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

	private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

	private final GroupService groupService;

	public GroupController(GroupService groupService) {
		this.groupService = groupService;
	}

	@GetMapping
	public ResponseEntity<List<GroupDto>> getAllGroups() {
		logger.info("get all groups");
		return ResponseEntity.ok(groupService.getGroups());
	}

	@GetMapping("/{id}")
	public ResponseEntity<GroupDto> getGroup(@PathVariable UUID id) {
		logger.info("get group with id {}", id);
		return  ResponseEntity.ok(groupService.getGroup(id));
	}

	@PostMapping
	public ResponseEntity<GroupDto> createGroup(@Valid @RequestBody GroupDto groupDto) {
		logger.info("create a new group");
		return ResponseEntity.ok(groupService.createGroup(groupDto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteGroup(@PathVariable UUID id) {
		logger.info("delete group with id {}", id);
		groupService.deleteGroup(id);
		return ResponseEntity.noContent().build();
	}
}