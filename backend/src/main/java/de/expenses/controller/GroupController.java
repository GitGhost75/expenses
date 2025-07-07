package de.expenses.controller;

import de.expenses.annotation.GroupCode;
import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;
import de.expenses.service.GroupService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@OpenAPIDefinition(info = @Info(summary = "Summary", title = "Title", description = "Description"))
@RestController
@RequestMapping("/api/groups")
public class GroupController {

	private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

	private final GroupService groupService;

	public GroupController(GroupService groupService) {
		this.groupService = groupService;
	}

	@Operation(
			description = "Retrieve all groups of the current user.",
			summary = "The summary"
	)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Groups found", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = GroupDto.class))}),
	})
	@GetMapping
	public ResponseEntity<GroupDto> getGroup(@GroupCode String groupCode) {
		logger.info("get group with and code {}", groupCode);
		return ResponseEntity.ok(groupService.getGroup(groupCode));
	}

	@Operation(
			description = "Create a group",
			summary = "The summary"
	)
	@PostMapping
	public ResponseEntity<GroupDto> createGroup(@Valid @RequestBody GroupDto groupDto) {
		logger.info("create a new group");
		return ResponseEntity.status(HttpStatus.CREATED).body(groupService.createGroup(groupDto));
	}

	@PatchMapping
	public ResponseEntity<GroupDto> patchGroup(@Valid @RequestBody GroupDto groupDto) {
		logger.info("patch group");
		return ResponseEntity.status(HttpStatus.OK).body(groupService.updateGroup(groupDto));
	}

	@Operation(
			description = "Create a group",
			summary = "The summary"
	)
	@PostMapping("/{name}")
	public ResponseEntity<GroupDto> createGroup(@PathVariable String name) {
		logger.info("create group");
		return ResponseEntity.status(HttpStatus.CREATED).body(groupService.createNewGroup(name));
	}


	@Operation(
			description = "Delete a group",
			summary = "The summary"
	)
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteGroup(@PathVariable String code) {
		logger.info("delete group with id {}", code);
		groupService.deleteGroup(code);
		return ResponseEntity.noContent().build();
	}

	@Operation(
			description = "Create a user and add to a group",
			summary = "The summary"
	)
	@PostMapping("/{groupId}/members")
	public ResponseEntity<GroupDto> createUser(@PathVariable String code, @Valid @RequestBody UserDto userDto) {
		logger.info("create a new user");
		return ResponseEntity.status(HttpStatus.CREATED).body(groupService.createMember(code, userDto));
	}

	@Operation(
			description = "Add a user to a group",
			summary = "The summary"
	)
	@PostMapping("/members/{memberName}")
	public ResponseEntity<GroupDto> addMember(@RequestBody GroupDto group, @PathVariable String memberName) {
		logger.info("add member to group");
		return ResponseEntity.status(HttpStatus.CREATED).body(groupService.addMember(group, memberName));
	}

}