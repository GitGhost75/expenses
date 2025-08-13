package de.expenses.controller;

import de.expenses.dto.BillingDto;
import de.expenses.model.Billing;
import de.expenses.dto.ExpenseDto;
import de.expenses.service.BillingService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@OpenAPIDefinition(info = @Info(summary = "Summary", title = "Title", description = "Description"))
@RestController
@RequestMapping("/api/v1/billings")
public class BillingController {

	private static final Logger logger = LoggerFactory.getLogger(BillingController.class);

	private final BillingService billingService;

	public BillingController(BillingService billingService) {
		this.billingService = billingService;
	}

	@Operation(
			description = "Retrieve all billings of the group.",
			summary = "The summary"
	)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Billings found", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ExpenseDto.class))}),
	})
	@GetMapping("/group/{groupCode}")
	public ResponseEntity<List<BillingDto>> getExpensesForGroup(@PathVariable String groupCode) {
		logger.info("get expenses for group code {}", groupCode);
		return ResponseEntity.ok(billingService.getBillings(groupCode));
	}


}