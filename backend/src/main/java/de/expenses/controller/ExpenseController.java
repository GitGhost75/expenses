package de.expenses.controller;

import de.expenses.annotation.GroupCode;
import de.expenses.dto.ExpenseDto;
import de.expenses.dto.GroupDto;
import de.expenses.dto.UserDto;
import de.expenses.service.ExpenseService;
import de.expenses.service.GroupService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
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

import java.util.List;
import java.util.UUID;

@OpenAPIDefinition(info = @Info(summary = "Summary", title = "Title", description = "Description"))
@RestController
@RequestMapping("/api/v1/expenses")
public class ExpenseController {

	private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);

	private final ExpenseService expenseService;

	public ExpenseController(ExpenseService expenseService) {
		this.expenseService = expenseService;
	}

	@Operation(
			description = "Retrieve all expenses of the group.",
			summary = "The summary"
	)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Expenses found", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ExpenseDto.class))}),
	})
	@GetMapping("/group/{groupCode}")
	public ResponseEntity<List<ExpenseDto>> getExpensesForGroup(@PathVariable String groupCode) {
		logger.info("get expenses for group code {}", groupCode);
		return ResponseEntity.ok(expenseService.getExpenses(groupCode));
	}

	@Operation(
			description = "Retrieve all expenses of the user.",
			summary = "The summary"
	)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Expenses found", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ExpenseDto.class))}),
	})
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<ExpenseDto>> getExpensesForUser(@PathVariable UUID userId) {
		logger.info("get expenses for user id {}", userId);
		return ResponseEntity.ok(expenseService.getExpenses(userId));
	}

	@Operation(
			description = "Create an expense",
			summary = "The summary"
	)
	@PostMapping
	public ResponseEntity<ExpenseDto> createExpense(@RequestBody ExpenseDto dto) {
		logger.info("create expense");
		return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.createExpense(dto));
	}

	@PatchMapping
	public ResponseEntity<ExpenseDto> updateExpense(@RequestBody ExpenseDto dto) {
		logger.info("patch expense");
		return ResponseEntity.status(HttpStatus.OK).body(expenseService.updateExpense(dto));
	}

}