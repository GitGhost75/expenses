package de.expenses.controller;

import de.expenses.annotation.GroupCode;
import de.expenses.dto.GroupDto;
import de.expenses.service.GroupService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/groups")
public class GroupController {

	private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

	private final GroupService groupService;


	public GroupController(GroupService groupService) {
		this.groupService = groupService;
	}

	@Operation(
			description = "Retrieve group with code",
			summary = "The summary"
	)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Groups found", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = GroupDto.class))}),
	})
	@GetMapping
	public ResponseEntity<GroupDto> getGroup(@GroupCode @Parameter(hidden = true) String groupCode) {
		logger.info("get group with code {}", groupCode);
		return ResponseEntity.ok(groupService.getGroup(groupCode));
	}

	@Operation(
			description = "Retrieve group with code",
			summary = "The summary"
	)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Groups found", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = GroupDto.class))}),
	})
	@GetMapping("/{groupCode}")
	public ResponseEntity<GroupDto> getGroupWithCode(@PathVariable String groupCode) {
		logger.info("get group with code {}", groupCode);
		return ResponseEntity.ok(groupService.getGroup(groupCode));
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
	@DeleteMapping("/{groupCode}")
	public ResponseEntity<Void> deleteGroup(@PathVariable String groupCode) {
		logger.info("delete group with id {}", groupCode);
		groupService.deleteGroup(groupCode);
		return ResponseEntity.noContent().build();
	}
}